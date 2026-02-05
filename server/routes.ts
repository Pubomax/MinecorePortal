import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { insertConsultationSchema, insertBlogPostSchema, insertChatbotLeadSchema, insertChatbotConversationSchema } from "@shared/schema";
import { z } from "zod";
import { sendConversationSummary } from "./sendgrid";
import { sendSimpleLeadNotification, sendBasicLeadNotification } from "./email-notification";
import { sendWebhookNotification, sendDetailedConsoleNotification, sendSimpleEmailLog } from "./webhook-notification";
import { testGmailConnection, sendTestLeadEmail } from "./gmail-test";

export async function registerRoutes(app: Express): Promise<Server> {
  // Gmail test endpoint
  app.get('/api/test-gmail', async (req, res) => {
    try {
      const result = await testGmailConnection();
      res.json({ success: result, message: result ? 'Gmail connection successful' : 'Gmail connection failed' });
    } catch (error: any) {
      res.status(500).json({ error: 'Gmail test failed', details: error.message });
    }
  });

  // Send test lead email
  app.post('/api/test-lead-email', async (req, res) => {
    try {
      const result = await sendTestLeadEmail();
      res.json({ success: result, message: result ? 'Test email sent successfully' : 'Test email failed' });
    } catch (error: any) {
      res.status(500).json({ error: 'Test email failed', details: error.message });
    }
  });

  // Twilio domain verification
  app.get("/a458a084bd1b4b20be10de164c2ba47b.html", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('twilio-domain-verification=a458a084bd1b4b20be10de164c2ba47b');
  });

  // Direct PDF download - must be before other routes
  app.get("/kb.pdf", (req, res) => {
    const knowledgeBaseContent = `MINECORE GROUP - AI & Automation Implementation Agency
Make More Money, Work Less

Transforming businesses through intelligent automation solutions that increase revenue, reduce overhead, and free up time for strategic growth.

EXECUTIVE SUMMARY
Minecore Group is a cutting-edge AI and automation implementation agency founded in 2024, specializing in delivering rapid business transformation through intelligent automation solutions.

Our mission: help businesses make more money while working less by implementing strategic automation that eliminates manual tasks, reduces operational overhead, and accelerates revenue growth.

KEY METRICS:
- Founded: 2024
- Time Savings: 30-90%  
- Implementation: 2-4 weeks
- ROI: Guaranteed

COMPANY PROFILE

Our Story:
Born from entrepreneurial challenges, Minecore was founded by an entrepreneur who reduced weekly workload by 70% while increasing revenue by 40% through intelligent automation. Today we help other business owners achieve similar breakthroughs.

Core Values:
- Agility: Move fast and adapt quickly
- Focus: High-impact solutions with measurable outcomes  
- ROI-Oriented: Every solution must demonstrate clear ROI
- Listen & Solve: Understand challenges before proposing solutions

MARKET POSITION
Geographic Focus: Montreal, QC → North America
Service Delivery: Hybrid (Local + Remote)
Target: $100K-$10M revenue SMEs

Competitive Advantages:
- Entrepreneur-to-entrepreneur understanding
- Rapid implementation (weeks, not months)
- Cost-effective solutions for growing businesses
- Ongoing partnership approach

CORE SERVICE PORTFOLIO

1. AI-POWERED SALES AUTOMATION
- Automated lead research & qualification
- Smart follow-up email sequences  
- Sales pipeline management
Impact: 200-400% lead increase, 25-30 hours/week saved

2. SMART MARKETING AUTOMATION
- AI content creation (social, blogs, emails)
- Automated audience segmentation
- Real-time campaign optimization
Impact: 150-300% engagement boost, 15-20 hours/week saved

3. INTELLIGENT MANAGEMENT SYSTEMS
- Automated reporting & analytics
- Task & project management
- Resource optimization
Impact: 40-60% efficiency gain, 10-15 hours/week saved

4. OPERATIONAL EXCELLENCE AUTOMATION
- AI chatbots & customer service
- Inventory & supply chain automation
- Financial process automation
Impact: 50-80% cost reduction, 20-25 hours/week saved

PRICING PACKAGES

VELOCITY - $500/month
- 1-2 core automations
- Basic AI integration
- Email/calendar automation
- Monthly review, Email support
Best for: Solo founders, small teams

ACCELERATE - $1,500/month (MOST POPULAR)
- 3-5 automations
- Advanced AI/ML capabilities
- CRM & sales automation
- Marketing automation suite
- Bi-weekly strategy sessions, Priority support
Best for: Growing SMEs

DOMINATE - $3,500/month
- Unlimited automation workflows
- Custom AI solutions
- Enterprise-level integrations
- Advanced analytics & reporting
- Weekly strategy calls, Dedicated manager, 24/7 support
Best for: Scale-ups and enterprises

ROI EXAMPLE:
Time Saved: $2,000 (40 hours @ $50/hr)
Efficiency Gains: $1,500 (Process optimization)
Revenue Increase: $3,000 (New opportunities)
Total Monthly ROI: $6,500 | Investment: $1,500 | Net ROI: 433%

GUARANTEES & TERMS
- ROI Guarantee: Positive ROI in 90 days or we work free
- Performance Guarantee: 99.5% uptime or service credits
- Satisfaction Guarantee: 30-day money-back
- Month-to-month subscriptions, No long-term contracts

IMPLEMENTATION METHODOLOGY

5-Phase Process:
1. Discovery & Assessment (3-5 days)
2. Solution Design & Planning (2-3 days)
3. Development & Configuration (1-3 weeks)
4. Testing & Optimization (3-5 days)
5. Deployment & Training (2-3 days)

TECHNOLOGY STACK
- Automation: n8n (visual workflow automation)
- Cloud: Google Cloud Platform (99.9% uptime)
- Database: Supabase (real-time, API-driven)
- AI/ML: GPT-4, Claude, Gemini, Computer Vision
- Security: End-to-end encryption, SOC2 & GDPR compliance

INDUSTRIES SERVED
E-commerce, Professional Services, Healthcare, Real Estate, Manufacturing, Hospitality, Technology, Logistics - All industries with business processes

CONTACT INFORMATION
Website: minecoregroup.com
Address: 3580 Blvd Saint-Elzear Ouest, Laval, QC H7P 0A2
Services: English & French
Service Area: Montreal (Primary) | North America (Remote)

NEXT STEPS
1. Book Free Consultation: minecoregroup.com/contact
2. Get Custom Automation Roadmap
3. Start 90-Day Transformation

Most clients save 15-25 hours per week within first 90 days.

© 2024 Minecore Group | Montreal AI Automation Specialists`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Minecore_Knowledge_Base.pdf"');
    res.send(knowledgeBaseContent);
  });

  // Consultation routes
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);

      // Envoyer les notifications (multiple fallbacks)
      console.log(`New consultation request from ${consultation.name} at ${consultation.company}`);

      // Essayer l'email Gmail d'abord, puis SendGrid en fallback
      const emailSent = await sendSimpleLeadNotification(consultation).catch(err => {
        console.error('Failed to send email notification:', err);
        return false;
      });

      // Si l'email n'a pas fonctionné, utiliser les notifications console détaillées
      if (!emailSent) {
        await sendDetailedConsoleNotification(consultation);
        await sendSimpleEmailLog(consultation);
      }

      res.json({ success: true, id: consultation.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create consultation request" });
      }
    }
  });

  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json(consultations);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      res.status(500).json({ error: "Failed to fetch consultations", details: (error as Error).message });
    }
  });

  app.put("/api/consultations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const consultation = await storage.updateConsultation(id, updates);
      if (!consultation) {
        return res.status(404).json({ error: "Consultation not found" });
      }

      res.json(consultation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update consultation" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const posts = await storage.getBlogPosts(published);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create blog post" });
      }
    }
  });

  // Chatbot API routes
  app.post("/api/chatbot/leads", async (req, res) => {
    try {
      const validatedData = insertChatbotLeadSchema.parse(req.body);
      const lead = await storage.createChatbotLead(validatedData);

      // AUTOMATION: If we have captured Name and Email, create a real CRM Lead
      if (lead.name && lead.email) {
        console.log(`[Chatbot Automation] Attempting to promote chatbot lead ${lead.email} to CRM`);

        // Check if lead already exists to avoid duplicates
        const existingLead = await storage.getConsultationByEmail(lead.email);

        if (!existingLead) {
          const newCrmLead = await storage.createConsultation({
            name: lead.name,
            email: lead.email,
            phone: lead.phone || null,
            company: lead.company || "Unknown Company",
            source: "Chatbot",
            status: "New",
            serviceType: "Chatbot Interaction",
            // Required dummy fields for schema
            jobTitle: "Contact",
            companySize: "Unknown",
            industry: "Unknown",
            revenue: "Unknown",
            growth: "Unknown",
            currentTools: "Unknown",
            teamSize: "Unknown",
            biggestChallenge: "Unknown",
            timeSpentManualTasks: "Unknown",
            automationGoals: "Unknown",
            budget: "Unknown",
            timeline: "Unknown",
            decisionMaker: "Unknown",
            previousAutomation: "Unknown",
            urgency: "Normal",
          });
          console.log(`[Chatbot Automation] Success! Created CRM lead #${newCrmLead.id}`);
        } else {
          console.log(`[Chatbot Automation] Lead already exists in CRM. Skipping.`);
        }
      }

      res.json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid lead data", details: error.errors });
        console.error("Chatbot lead validation error:", error);
      } else {
        res.status(500).json({ error: "Failed to create lead" });
        console.error("Chatbot lead creation error:", error);
      }
    }
  });

  app.get("/api/chatbot/leads", async (req, res) => {
    try {
      const leads = await storage.getChatbotLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/chatbot/leads/:sessionId", async (req, res) => {
    try {
      const lead = await storage.getChatbotLead(req.params.sessionId);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  app.patch("/api/chatbot/leads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const lead = await storage.updateChatbotLead(id, updates);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/chatbot/leads", async (req, res) => {
    try {
      const { ids, deleteAll } = req.body;

      if (deleteAll) {
        const success = await storage.deleteAllChatbotLeads();
        if (success) {
          return res.json({ message: "All chatbot leads deleted successfully" });
        }
      } else if (ids && Array.isArray(ids)) {
        const success = await storage.deleteChatbotLeads(ids);
        if (success) {
          return res.json({ message: `${ids.length} chatbot leads deleted successfully` });
        }
      } else {
        return res.status(400).json({ error: "Invalid request: provide 'ids' array or 'deleteAll' flag" });
      }

      res.status(500).json({ error: "Failed to delete leads" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete leads" });
    }
  });

  app.post("/api/chatbot/conversations", async (req, res) => {
    try {
      const validatedData = insertChatbotConversationSchema.parse(req.body);
      const conversation = await storage.createChatbotConversation(validatedData);

      // Envoyer une notification Gmail pour la nouvelle conversation chatbot
      console.log(`New chatbot conversation: ${conversation.sessionId}`);

      // Préparer les données pour la notification
      const conversationNotificationData = {
        sessionId: conversation.sessionId,
        messages: conversation.messages,
        leadInfo: conversation.leadInfo,
        createdAt: conversation.createdAt
      };

      // Envoyer la notification de manière asynchrone
      sendConversationSummary(
        (conversationNotificationData.leadInfo as any)?.email || "admin@minecore.com",
        (conversationNotificationData.leadInfo as any)?.name || "Lead",
        "New Chatbot Conversation",
        conversationNotificationData.messages
      ).catch(err => {
        console.error('Failed to send chatbot conversation notification:', err);
      });

      res.json(conversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid conversation data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create conversation", details: (error as Error).message });
      }
    }
  });

  app.get("/api/chatbot/conversations", async (req, res) => {
    try {
      const conversations = await storage.getChatbotConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/chatbot/conversations/:sessionId", async (req, res) => {
    try {
      const conversation = await storage.getChatbotConversation(req.params.sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  app.patch("/api/chatbot/conversations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const conversation = await storage.updateChatbotConversation(id, updates);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update conversation" });
    }
  });

  // Email API endpoint
  app.post("/api/chatbot/send-summary", async (req, res) => {
    try {
      const { leadEmail, leadName, conversationSummary, messages } = req.body;

      if (!leadEmail || !conversationSummary || !messages) {
        return res.status(400).json({ error: "Missing required fields: leadEmail, conversationSummary, messages" });
      }

      const emailSent = await sendConversationSummary(leadEmail, leadName, conversationSummary, messages);

      if (emailSent) {
        res.json({ success: true, message: "Email sent successfully" });
      } else {
        res.status(500).json({ error: "Failed to send email" });
      }
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // File download routes
  app.get("/api/download/knowledge-base", (req, res) => {
    const filePath = path.join(process.cwd(), "public", "knowledge-base.txt");
    console.log("Attempting to download file from:", filePath);
    res.download(filePath, "Minecore_Knowledge_Base.txt", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(404).json({ error: "File not found" });
      }
    });
  });

  // Direct file access - text version
  app.get("/download/knowledge-base", (req, res) => {
    const filePath = path.join(process.cwd(), "public", "knowledge-base.txt");
    console.log("Attempting to download file from:", filePath);
    res.download(filePath, "Minecore_Knowledge_Base.txt", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(404).json({ error: "File not found" });
      }
    });
  });

  // Google Ads API Routes
  app.get("/api/google-ads/campaigns", async (req, res) => {
    try {
      const { GoogleAdsManager } = await import("./google-ads");
      const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID || "8156005600";
      const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

      if (!refreshToken) {
        return res.status(400).json({
          error: "Google Ads not configured. Please generate refresh token first."
        });
      }

      const manager = new GoogleAdsManager(customerId, refreshToken);
      const campaigns = await manager.getCampaigns();
      res.json(campaigns);
    } catch (error: any) {
      console.error("Error fetching Google Ads campaigns:", error);
      res.status(500).json({ error: "Failed to fetch campaigns", details: error.message });
    }
  });

  app.post("/api/google-ads/campaigns", async (req, res) => {
    try {
      const { GoogleAdsManager } = await import("./google-ads");
      const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID || "8156005600";
      const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

      if (!refreshToken) {
        return res.status(400).json({ error: "Google Ads not configured" });
      }

      const manager = new GoogleAdsManager(customerId, refreshToken);
      const campaignId = await manager.createCampaignFromBrief(req.body);

      res.json({ success: true, campaignId, message: "Campaign created successfully" });
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ error: "Failed to create campaign", details: error.message });
    }
  });

  app.post("/api/google-ads/campaigns/:id/optimize", async (req, res) => {
    try {
      const { GoogleAdsManager } = await import("./google-ads");
      const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID || "8156005600";
      const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

      if (!refreshToken) {
        return res.status(400).json({ error: "Google Ads not configured" });
      }

      const manager = new GoogleAdsManager(customerId, refreshToken);
      await manager.optimizeCampaignBids(req.params.id);

      res.json({ success: true, message: "Campaign optimized successfully" });
    } catch (error: any) {
      console.error("Error optimizing campaign:", error);
      res.status(500).json({ error: "Failed to optimize campaign", details: error.message });
    }
  });


  const httpServer = createServer(app);
  return httpServer;
}
