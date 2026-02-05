import { consultations, blogPosts, chatbotLeads, chatbotConversations, googleAdsAccounts, type Consultation, type InsertConsultation, type BlogPost, type InsertBlogPost, type ChatbotLead, type ChatbotConversation, type InsertChatbotLead, type InsertChatbotConversation, type GoogleAdsAccount, type InsertGoogleAdsAccount } from "@shared/schema";

export interface IStorage {
  // Consultation methods
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(): Promise<Consultation[]>;
  getConsultation(id: number): Promise<Consultation | undefined>;
  getConsultationByEmail(email: string): Promise<Consultation | undefined>;
  updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined>;

  // Blog methods
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Chatbot methods
  createChatbotLead(lead: InsertChatbotLead): Promise<ChatbotLead>;
  getChatbotLeads(): Promise<ChatbotLead[]>;
  getChatbotLead(sessionId: string): Promise<ChatbotLead | undefined>;
  updateChatbotLead(id: number, lead: Partial<InsertChatbotLead>): Promise<ChatbotLead | undefined>;
  deleteChatbotLeads(ids: number[]): Promise<boolean>;
  deleteAllChatbotLeads(): Promise<boolean>;

  createChatbotConversation(conversation: InsertChatbotConversation): Promise<ChatbotConversation>;
  getChatbotConversations(): Promise<ChatbotConversation[]>;
  getChatbotConversation(sessionId: string): Promise<ChatbotConversation | undefined>;
  updateChatbotConversation(id: number, conversation: Partial<InsertChatbotConversation>): Promise<ChatbotConversation | undefined>;

  // Google Ads accounts methods
  createGoogleAdsAccount(account: InsertGoogleAdsAccount): Promise<GoogleAdsAccount>;
  getGoogleAdsAccounts(): Promise<GoogleAdsAccount[]>;
  getGoogleAdsAccount(id: number): Promise<GoogleAdsAccount | undefined>;
  updateGoogleAdsAccount(id: number, updates: Partial<InsertGoogleAdsAccount>): Promise<GoogleAdsAccount | undefined>;
  deleteGoogleAdsAccount(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private consultations: Map<number, Consultation>;
  private blogPosts: Map<number, BlogPost>;
  private currentConsultationId: number;
  private currentBlogPostId: number;

  constructor() {
    this.consultations = new Map();
    this.blogPosts = new Map();
    this.currentConsultationId = 1;
    this.currentBlogPostId = 1;

    // Add some sample blog posts
    this.addSampleBlogPosts();
  }

  private addSampleBlogPosts() {
    const samplePosts = [
      {
        title: "10 Signs Your Business Needs Automation in 2025",
        slug: "10-signs-business-needs-automation-2025",
        excerpt: "Discover the key indicators that your business is ready for automation and how it can transform your operations in 2025.",
        content: `# 10 Signs Your Business Needs Automation in 2025

Business automation isn't just a luxury anymore—it's becoming essential for staying competitive. Here are the top 10 signs your business is ready for automation:

## 1. You're Spending Hours on Repetitive Tasks

If you or your team are doing the same tasks over and over, that's prime automation territory. Things like data entry, invoice processing, or sending follow-up emails can all be automated.

## 2. Human Errors Are Costing You Money

Manual processes are prone to mistakes. If errors in data entry, calculations, or communications are impacting your bottom line, automation can eliminate these costly mistakes.

## 3. Customer Response Times Are Too Slow

In today's fast-paced world, customers expect immediate responses. If you're struggling to keep up with inquiries, automated customer service tools can help.

## 4. You Can't Scale Without Hiring More Staff

When growth means you need more people for routine tasks, automation can help you scale without proportionally increasing your workforce.

## 5. Important Tasks Fall Through the Cracks

If follow-ups are missed, deadlines are forgotten, or important communications don't happen, automated workflows can ensure nothing gets overlooked.

## 6. Your Team Is Burned Out on Manual Work

When talented employees spend their time on mundane tasks instead of strategic work, it's time to automate the routine stuff.

## 7. Data Is Scattered Across Multiple Systems

If information lives in different places and needs manual consolidation, automated data integration can save hours and improve accuracy.

## 8. You're Working Evenings and Weekends

If you're constantly working to keep up with operational tasks, automation can give you your time back.

## 9. Customer Satisfaction Is Declining

Delays, errors, and inconsistent service often stem from manual processes. Automation can improve reliability and customer experience.

## 10. Competitors Are Moving Faster

If competitors are launching products faster, serving customers better, or operating more efficiently, they might already be using automation.

## Ready to Get Started?

If you recognized your business in 3 or more of these signs, it's time to explore automation. The good news? You don't have to figure it out alone.

**Book a free consultation** to discover which processes in your business could benefit most from automation. Our team will analyze your operations and show you exactly how automation can save time, reduce errors, and boost your bottom line.`,
        metaDescription: "Discover 10 clear signs your business needs automation in 2025. Learn how automation can save time, reduce errors, and boost efficiency for growing companies.",
        keywords: "business automation, process automation, small business efficiency, automation signs, digital transformation",
        author: "Minecore Team",
        readTime: "8 min read",
        category: "Business Strategy",
        featured: true,
        published: true,
      },
      {
        title: "Business Automation ROI: How Much Can You Really Save?",
        slug: "business-automation-roi-calculator-2025",
        excerpt: "Calculate the real return on investment for business automation with our comprehensive guide and real case studies from Montreal businesses.",
        content: `# Business Automation ROI: How Much Can You Really Save?

When considering automation, the first question most business owners ask is: "What's the ROI?" Let's break down exactly how to calculate automation returns and see real examples.

## The Hidden Costs of Manual Processes

Before calculating automation ROI, you need to understand what manual processes are really costing you:

### Time Costs
- **Employee wages**: Calculate hourly rates for time spent on repetitive tasks
- **Opportunity cost**: What could employees do with that time instead?
- **Overtime expenses**: Manual processes often require extra hours

### Error Costs
- **Correction time**: Hours spent fixing mistakes
- **Lost customers**: Revenue lost due to errors
- **Reputation damage**: Long-term impact on your brand

### Scaling Costs
- **Additional hires**: New employees needed as you grow
- **Training time**: Getting new staff up to speed
- **Management overhead**: Supervising larger teams

## ROI Calculation Formula

**ROI = (Annual Savings - Automation Investment) / Automation Investment × 100**

### Example: Customer Service Automation

**Before Automation:**
- 2 employees answering basic questions: $60,000/year
- Average response time: 4 hours
- Customer satisfaction: 70%

**After Automation:**
- Chatbot handles 80% of inquiries
- 1 employee for complex issues: $30,000/year
- Average response time: Instant
- Customer satisfaction: 90%

**Annual Savings:** $30,000 in wages + $50,000 in improved customer retention = $80,000
**Investment:** $20,000 for chatbot setup and training
**ROI:** (80,000 - 20,000) / 20,000 × 100 = **300%**

## Real Montreal Business Case Studies

### Case Study 1: E-commerce Company
- **Industry**: Online retail
- **Process**: Order fulfillment
- **Investment**: $15,000
- **Annual Savings**: $65,000
- **ROI**: 333%

### Case Study 2: Professional Services
- **Industry**: Accounting firm
- **Process**: Invoice processing
- **Investment**: $8,000
- **Annual Savings**: $45,000
- **ROI**: 463%

### Case Study 3: Manufacturing
- **Industry**: Small manufacturer
- **Process**: Inventory management
- **Investment**: $25,000
- **Annual Savings**: $120,000
- **ROI**: 380%

## Quick ROI Assessment

Ask yourself these questions:

1. How many hours per week does your team spend on repetitive tasks?
2. What's the average hourly cost of those employees?
3. How often do manual errors occur, and what do they cost?
4. How much faster could you grow with automated processes?

## Getting Started

Ready to calculate your potential ROI? **Book a free consultation** where we'll:

- Analyze your current processes
- Identify automation opportunities
- Calculate your potential savings
- Show you exactly what ROI to expect

Most businesses see 200-400% ROI within the first year. What could that mean for your bottom line?`,
        metaDescription: "Calculate business automation ROI with real examples. See how Montreal companies achieve 200-400% returns on automation investments.",
        keywords: "automation ROI, business automation investment, process automation savings, automation calculator",
        author: "Minecore Team",
        readTime: "10 min read",
        category: "ROI & Finance",
        featured: true,
        published: true,
      },
      {
        title: "Small Business Automation: Complete Beginner's Guide 2025",
        slug: "small-business-automation-complete-guide",
        excerpt: "The ultimate guide for small businesses starting their automation journey. Learn where to start, what to automate first, and common mistakes to avoid.",
        content: `# Small Business Automation: Complete Beginner's Guide 2025

Starting your automation journey can feel overwhelming, but it doesn't have to be. This guide will walk you through everything you need to know.

## What Is Business Automation?

Business automation uses technology to perform repetitive tasks without human intervention. Think of it as having a digital assistant that never sleeps, never makes mistakes, and works at lightning speed.

## Why Small Businesses Need Automation

### 1. Level the Playing Field
Automation gives small businesses the same capabilities as larger companies, allowing you to compete on efficiency rather than just size.

### 2. Focus on Growth
When routine tasks are automated, you can focus on strategy, customer relationships, and business development.

### 3. Improve Customer Experience
Automated responses, faster processing, and consistent service quality keep customers happy.

## Where to Start: The Automation Hierarchy

### Level 1: Communication Automation
- **Email templates** for common inquiries
- **Auto-responders** for contact forms
- **Appointment scheduling** tools
- **Social media posting** automation

**Investment:** $50-500/month
**Time Saved:** 5-10 hours/week

### Level 2: Sales & Marketing Automation
- **Lead capture** and nurturing
- **Customer relationship management** (CRM)
- **Automated follow-ups**
- **Payment processing**

**Investment:** $200-1,000/month
**Time Saved:** 10-20 hours/week

### Level 3: Operations Automation
- **Inventory management**
- **Invoice generation**
- **Report creation**
- **Data synchronization**

**Investment:** $500-2,000/month
**Time Saved:** 15-30 hours/week

### Level 4: Advanced Integration
- **Custom workflows**
- **API integrations**
- **AI-powered analytics**
- **Predictive automation**

**Investment:** $1,000-5,000/month
**Time Saved:** 20-40 hours/week

## Quick Start Checklist

### Week 1: Assessment
- List all repetitive tasks your team does
- Calculate time spent on each task
- Identify your biggest pain points
- Research tools for your top 3 issues

### Week 2: Planning
- Choose your first automation project
- Set a budget and timeline
- Get team buy-in
- Select tools and vendors

### Week 3: Implementation
- Set up your chosen tool
- Create automated workflows
- Test everything thoroughly
- Train your team

### Week 4: Optimization
- Monitor performance
- Gather feedback
- Make adjustments
- Plan your next automation project

## Common Mistakes to Avoid

### 1. Trying to Automate Everything at Once
Start small and build gradually. Master one process before moving to the next.

### 2. Not Involving Your Team
Your employees know the processes best. Include them in planning and implementation.

### 3. Choosing Complex Tools First
Begin with simple, user-friendly solutions. You can always upgrade later.

### 4. Forgetting About Maintenance
Automated systems need regular updates and monitoring to stay effective.

### 5. Not Measuring Results
Track metrics to ensure your automation is delivering the expected benefits.

## Tools for Different Business Types

### E-commerce
- Shopify Flow
- Klaviyo (email marketing)
- ShipStation (fulfillment)

### Professional Services
- Calendly (scheduling)
- HubSpot (CRM)
- FreshBooks (invoicing)

### Restaurants
- Toast (POS automation)
- OpenTable (reservations)
- Mailchimp (customer marketing)

### Manufacturing
- TradeGecko (inventory)
- Zapier (workflow automation)
- Monday.com (project management)

## Success Metrics to Track

### Efficiency Metrics
- Time saved per week
- Tasks completed per hour
- Error reduction percentage

### Financial Metrics
- Cost savings
- Revenue increase
- ROI percentage

### Quality Metrics
- Customer satisfaction scores
- Employee satisfaction
- Process consistency

## Next Steps

Ready to start your automation journey? Here's what successful businesses do:

1. **Start with a free assessment** to identify your best opportunities
2. **Create a 90-day automation plan** with clear milestones
3. **Implement one process at a time** to ensure success
4. **Measure results** and iterate

**Book your free automation consultation** today. We'll analyze your business, identify the best starting points, and create a customized automation roadmap that fits your budget and goals.

Most small businesses save 15-25 hours per week within their first 90 days. Imagine what you could do with that extra time.`,
        metaDescription: "Complete beginner's guide to small business automation. Learn where to start, what tools to use, and how to avoid common mistakes in 2025.",
        keywords: "small business automation, automation for beginners, business process automation, workflow automation guide",
        author: "Minecore Team",
        readTime: "12 min read",
        category: "Getting Started",
        featured: true,
        published: true,
      },
    ];

    samplePosts.forEach((post, index) => {
      const blogPost: BlogPost = {
        id: index + 1,
        ...post,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.blogPosts.set(blogPost.id, blogPost);
    });
  }

  private addSampleBlogPostsOld() {
    const samplePosts: InsertBlogPost[] = [
      {
        title: "5 Signs Your Business Needs AI Automation",
        content: "Discover the key indicators that your business is ready for AI automation transformation...",
        excerpt: "Learn when it's time to automate your business processes for maximum efficiency and growth.",
        slug: "5-signs-business-needs-ai-automation",
        metaDescription: "Learn the key signs that indicate your business is ready for AI automation transformation.",
        keywords: "AI automation, business automation, productivity",
        published: true,
        author: "AI Expert",
        readTime: "5 min read",
        category: "Automation",
        featured: true,
      },
      {
        title: "Montreal's AI Revolution: Why Local Businesses Are Leading",
        content: "Montreal has become a hub for AI innovation, and local businesses are reaping the benefits...",
        excerpt: "Explore how Montreal businesses are leveraging AI to gain competitive advantages.",
        slug: "montreal-ai-revolution-local-businesses",
        metaDescription: "Discover how Montreal businesses are leading the AI revolution.",
        keywords: "Montreal AI, business innovation, competitive advantage",
        published: true,
        author: "Business Analyst",
        readTime: "7 min read",
        category: "Industry",
        featured: false,
      },
      {
        title: "ROI Calculator: What AI Automation Can Save Your Business",
        content: "Calculate the potential savings and revenue increases from implementing AI automation...",
        excerpt: "Use our framework to calculate your potential return on investment from AI automation.",
        slug: "roi-calculator-ai-automation-savings",
        metaDescription: "Calculate your ROI from AI automation implementation.",
        keywords: "ROI calculator, AI automation savings, business efficiency",
        published: true,
        author: "Financial Analyst",
        readTime: "10 min read",
        category: "Finance",
        featured: true,
      }
    ];


  }

  // Consultation methods
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "New",
      expectedRevenue: 0,
      actualRevenue: 0,
      source: insertConsultation.source ?? "Website Form",
      phone: insertConsultation.phone ?? null,
      additionalInfo: insertConsultation.additionalInfo ?? null,
      leadScore: insertConsultation.leadScore ?? null,
      serviceType: insertConsultation.serviceType ?? null,
      region: insertConsultation.region ?? null,
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  async getConsultationByEmail(email: string): Promise<Consultation | undefined> {
    return Array.from(this.consultations.values()).find(c => c.email === email);
  }

  async updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined> {
    const consultation = this.consultations.get(id);
    if (consultation) {
      Object.assign(consultation, updates, { updatedAt: new Date() });
      return consultation;
    }
    return undefined;
  }

  // Blog methods
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const post: BlogPost = {
      ...insertPost,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: insertPost.published ?? false,
      author: insertPost.author ?? "Anonymous",
      readTime: insertPost.readTime ?? "5 min read",
      category: insertPost.category ?? "General",
      featured: insertPost.featured ?? false,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());

    if (published !== undefined) {
      posts = posts.filter(post => post.published === published);
    }

    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (post) {
      Object.assign(post, updates, { updatedAt: new Date() });
      return post;
    }
    return undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Chatbot methods (stub implementations for MemStorage)
  async createChatbotLead(lead: InsertChatbotLead): Promise<ChatbotLead> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async getChatbotLeads(): Promise<ChatbotLead[]> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async getChatbotLead(sessionId: string): Promise<ChatbotLead | undefined> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async updateChatbotLead(id: number, lead: Partial<InsertChatbotLead>): Promise<ChatbotLead | undefined> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async deleteChatbotLeads(ids: number[]): Promise<boolean> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async deleteAllChatbotLeads(): Promise<boolean> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async createChatbotConversation(conversation: InsertChatbotConversation): Promise<ChatbotConversation> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async getChatbotConversations(): Promise<ChatbotConversation[]> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async getChatbotConversation(sessionId: string): Promise<ChatbotConversation | undefined> {
    throw new Error("Chatbot functionality requires database storage");
  }

  async updateChatbotConversation(id: number, conversation: Partial<InsertChatbotConversation>): Promise<ChatbotConversation | undefined> {
    throw new Error("Chatbot functionality requires database storage");
  }
}

import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    try {
      const [consultation] = await db
        .insert(consultations)
        .values(insertConsultation)
        .returning();
      return consultation;
    } catch (error) {
      console.error('Database insertion error:', error);
      throw new Error('Failed to create consultation');
    }
  }

  async getConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations).orderBy(desc(consultations.createdAt));
  }

  async getConsultation(id: number): Promise<Consultation | undefined> {
    const [consultation] = await db.select().from(consultations).where(eq(consultations.id, id));
    return consultation || undefined;
  }

  async getConsultationByEmail(email: string): Promise<Consultation | undefined> {
    const [consultation] = await db.select().from(consultations).where(eq(consultations.email, email));
    return consultation || undefined;
  }

  async updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined> {
    const [consultation] = await db
      .update(consultations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(consultations.id, id))
      .returning();
    return consultation || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const query = db.select().from(blogPosts);
    if (published !== undefined) {
      return await query.where(eq(blogPosts.published, published)).orderBy(desc(blogPosts.createdAt));
    }
    return await query.orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Chatbot methods
  async createChatbotLead(insertLead: InsertChatbotLead): Promise<ChatbotLead> {
    const [lead] = await db
      .insert(chatbotLeads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getChatbotLeads(): Promise<ChatbotLead[]> {
    return await db.select().from(chatbotLeads).orderBy(desc(chatbotLeads.createdAt));
  }

  async getChatbotLead(sessionId: string): Promise<ChatbotLead | undefined> {
    const [lead] = await db.select().from(chatbotLeads).where(eq(chatbotLeads.sessionId, sessionId));
    return lead || undefined;
  }

  async updateChatbotLead(id: number, updates: Partial<InsertChatbotLead>): Promise<ChatbotLead | undefined> {
    const [lead] = await db
      .update(chatbotLeads)
      .set(updates)
      .where(eq(chatbotLeads.id, id))
      .returning();
    return lead || undefined;
  }

  async deleteChatbotLeads(ids: number[]): Promise<boolean> {
    try {
      const { inArray } = await import("drizzle-orm");
      await db.delete(chatbotLeads).where(inArray(chatbotLeads.id, ids));
      return true;
    } catch (error) {
      console.error("Error deleting chatbot leads:", error);
      return false;
    }
  }

  async deleteAllChatbotLeads(): Promise<boolean> {
    try {
      await db.delete(chatbotLeads);
      return true;
    } catch (error) {
      console.error("Error deleting all chatbot leads:", error);
      return false;
    }
  }

  async createChatbotConversation(insertConversation: InsertChatbotConversation): Promise<ChatbotConversation> {
    const conversationData = {
      ...insertConversation,
      leadId: null, // Explicitly set to null to avoid foreign key constraint
      messages: insertConversation.messages as any, // Cast for JSON column
    };
    const [conversation] = await db
      .insert(chatbotConversations)
      .values(conversationData)
      .returning();
    return conversation;
  }

  async getChatbotConversations(): Promise<ChatbotConversation[]> {
    return await db.select().from(chatbotConversations).orderBy(desc(chatbotConversations.createdAt));
  }

  async getChatbotConversation(sessionId: string): Promise<ChatbotConversation | undefined> {
    const [conversation] = await db.select().from(chatbotConversations).where(eq(chatbotConversations.sessionId, sessionId));
    return conversation || undefined;
  }

  async updateChatbotConversation(id: number, updates: Partial<InsertChatbotConversation>): Promise<ChatbotConversation | undefined> {
    const updateData = {
      ...updates,
      messages: updates.messages ? updates.messages as any : undefined, // Cast for JSON column
    };
    const [conversation] = await db
      .update(chatbotConversations)
      .set(updateData)
      .where(eq(chatbotConversations.id, id))
      .returning();
    return conversation || undefined;
  }
}

export const storage = new DatabaseStorage();
