import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Share() {
  const [copied, setCopied] = useState(false);

  const shareableContent = `=== MINECORE GROUP KNOWLEDGE BASE ===

🏢 AI & Automation Implementation Agency
📍 Montreal-based • Serving North America
🎯 Make More Money, Work Less

KEY METRICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 70-90% Reduction in repetitive work
✓ 40%+ Increases in sales/revenue  
✓ 90 Days ROI typically visible

COMPANY OVERVIEW:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Founded in 2024 by an entrepreneur who reduced his weekly workload by 70% and boosted revenue by 40% through intelligent automation. Our mission: make business easier, faster, and more profitable for fellow entrepreneurs.

CORE VALUES:
• Agility: Move fast, adapt, deliver what matters
• Focus: Prioritize highest-impact solutions  
• ROI-Orientation: Every automation must prove value
• Listen & Solve: Understand unique challenges first
• Partnership: Grow together, optimize continuously

TARGET MARKET:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sweet Spot: SMEs ready to scale
Location: Montreal, Quebec
Service Area: North America
Industries: All sectors with business processes

KEY DIFFERENTIATORS:
• Entrepreneur-to-entrepreneur mindset
• Rapid implementation: weeks, not months
• No enterprise-level complexity
• Ongoing partnership approach

SERVICE PORTFOLIO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ AI-POWERED SALES AUTOMATION
   • Automated lead research & qualification
   • Smart follow-up email sequences
   • Automated CRM management & forecasting
   Impact: 2-4x more leads, 25-30 hours/week saved

2️⃣ SMART MARKETING AUTOMATION
   • AI content creation (social, blogs, emails)
   • Automated audience segmentation
   • Real-time campaign optimization
   Impact: 150-300% boost in engagement, 15-20 hours/week saved

3️⃣ INTELLIGENT MANAGEMENT SYSTEMS
   • Automated reporting & dashboards
   • Intelligent task management
   • Resource optimization via AI insights
   Impact: 40-60% efficiency gain, 10-15 hours/week saved

4️⃣ OPERATIONAL EXCELLENCE AUTOMATION
   • AI chatbots (chat & voice, RAG-integrated)
   • Inventory & supply chain automation
   • Financial process automation
   Impact: 50-80% cost reduction, 20-25 hours/week saved

PRICING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every business is different. We build custom solutions tailored to your specific needs.

Book a free consultation to receive a personalized quote:
• No cookie-cutter packages
• Pricing based on your actual requirements
• Month-to-month, no long-term contracts
• ROI-focused: every dollar must prove its value

IMPLEMENTATION PROCESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Discovery & Assessment (3-5 days)
2. Solution Design & Planning (2-3 days)  
3. Development & Configuration (1-3 weeks)
4. Testing & Optimization (3-5 days)
5. Deployment & Training (2-3 days)

GUARANTEES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ ROI Guarantee: Positive ROI in 90 days, or we work for free an extra month
✓ Performance Guarantee: 99.5% uptime, or service credits apply
✓ Satisfaction Guarantee: 30-day money-back if not satisfied

TERMS:
• Month-to-month subscriptions
• No long-term contracts  
• Scale up or down anytime

CONTACT & NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Website: minecoregroup.com
📧 Free Consultation: Book online at minecoregroup.com/contact
📍 Address: 1655 rue du grand pic, suite 301, Laval, QC H7P 0K8
🗣️ Languages: English & French

Ready to cut your workload by 70% and boost revenue by 40%?
Book your free consultation today.

═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
© 2024 Minecore Group • Montreal AI Automation Specialists
═══════════════════════════════════════════════════════════════════════════════════════════════════════════════`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadFile = () => {
    const blob = new Blob([shareableContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Minecore_Knowledge_Base_Shareable.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Shareable Knowledge Base</CardTitle>
              <p className="text-gray-600">
                Copy and paste this formatted content or download as a file to share with clients.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6 justify-center">
                <Button onClick={copyToClipboard} variant="default">
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
                <Button onClick={downloadFile} variant="outline">
                  Download File
                </Button>
              </div>
              
              <Card className="bg-gray-900 text-green-400 p-6 font-mono text-sm overflow-auto max-h-96">
                <pre className="whitespace-pre-wrap">{shareableContent}</pre>
              </Card>
              
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge className="mb-2">Easy Sharing</Badge>
                  <p className="text-sm text-gray-600">Copy and paste into emails, messages, or documents</p>
                </div>
                <div className="text-center">
                  <Badge className="mb-2">Professional Format</Badge>
                  <p className="text-sm text-gray-600">Clean, readable format with clear sections</p>
                </div>
                <div className="text-center">
                  <Badge className="mb-2">Complete Info</Badge>
                  <p className="text-sm text-gray-600">All services and contact details included</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}