import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Download() {
  const [isDownloading, setIsDownloading] = useState(false);

  const knowledgeBaseContent = `Minecore Group - AI & Automation Implementation Agency
Make More Money, Work Less

Montreal-based AI automation agency delivering rapid business transformation through practical, strategic automation that cuts manual work, reduces overhead, and accelerates revenue.

EXECUTIVE SUMMARY
Minecore Group is a Montreal-based AI & automation implementation agency, founded in 2024 by an entrepreneur who experienced firsthand the costly inefficiencies that drain time and profit from modern businesses.

KEY METRICS:
- 70-90% Reduction in repetitive work
- 40%+ Increases in sales/revenue  
- 90 Days ROI typically visible

COMPANY STORY & VALUES

Origin Story:
Born from the struggles of solo entrepreneurship, Minecore was founded after discovering that intelligent automation could reduce the founder's own weekly workload by 70% and boost revenue by 40%. This breakthrough led to our mission: make business easier, faster, and more profitable for other founders and growth-minded leaders.

Core Values:
- Agility: Move fast, adapt, deliver what matters
- Focus: Prioritize highest-impact solutions
- ROI-Orientation: Every automation must prove value
- Listen & Solve: Understand unique challenges first
- Partnership: Grow together, optimize continuously

MARKET POSITION & COMPETITIVE EDGE

Market Presence:
- Location: Montreal, Quebec
- Service Area: North America
- Target: All business types and industries
- Sweet Spot: SMEs ready to scale

Key Differentiators:
- Entrepreneur-to-entrepreneur mindset
- Rapid implementation: weeks, not months
- No enterprise-level complexity
- Ongoing partnership approach

SERVICE PORTFOLIO & CAPABILITIES

1. AI-Powered Sales Automation
Services Include:
- Automated lead research & qualification
- Smart follow-up email sequences
- Automated CRM management & forecasting

Impact:
- 2-4x more leads
- 25-30 hours/week saved
- Go-live in 2-3 weeks

2. Smart Marketing Automation
Services Include:
- AI content creation (social, blogs, emails)
- Automated audience segmentation
- Real-time campaign optimization

Impact:
- 150-300% boost in engagement
- 15-20 hours/week saved

3. Intelligent Management Systems
Services Include:
- Automated reporting & dashboards
- Intelligent task management
- Resource optimization via AI insights

Impact:
- 40-60% efficiency gain
- 10-15 hours/week saved

4. Operational Excellence Automation
Services Include:
- AI chatbots (chat & voice, RAG-integrated)
- Inventory & supply chain automation
- Financial process automation

Impact:
- 50-80% cost reduction
- 20-25 hours/week saved

TECHNOLOGY STACK & INTEGRATION

Core Technologies:
- Automation: n8n (visual workflow automation)
- Cloud: Google Cloud Platform (99.9% uptime)
- Database: Supabase (real-time, API-driven)
- AI/ML: GPT, Claude, Gemini, computer vision

Security & Compliance:
- End-to-end encryption
- Multi-factor authentication
- SOC2 & GDPR compliance
- Data never shared without consent

IMPLEMENTATION PROCESS & METHODOLOGY

1. Discovery & Assessment (3-5 days)
   Deep-dive into current processes, pain points, and success metrics
   Deliverable: Automation roadmap & ROI projection

2. Solution Design & Planning (2-3 days)
   Technical specs, workflow mapping, timeline creation
   Deliverable: Full technical design

3. Development & Configuration (1-3 weeks)
   Building, connecting, and configuring all workflows
   Deliverable: Fully functional automation system

4. Testing & Optimization (3-5 days)
   QA, security review, UAT, performance benchmarking
   Deliverable: Tested, optimized system

5. Deployment & Training (2-3 days)
   Go-live, team training, documentation, onboarding
   Deliverable: Live systems, user guides

PRICING

Every business is different. We build custom solutions tailored to your specific needs, processes, and goals.

Book a free consultation to receive a personalized quote:
- No cookie-cutter packages
- Pricing based on your actual requirements
- Month-to-month, no long-term contracts
- ROI-focused: every dollar must prove its value

GUARANTEES & TERMS

Our Guarantees:
- ROI Guarantee: Positive ROI in 90 days, or we work for free an extra month
- Performance Guarantee: 99.5% uptime, or service credits apply
- Satisfaction Guarantee: 30-day money-back if not satisfied

Flexible Terms:
- Month-to-month subscriptions
- No long-term contracts
- Scale up or down anytime

IDEAL CLIENT PROFILE & READINESS

Best Fit:
- Growing revenue
- 5-100 employees
- Growth/scaling phase
- Ready for change
- Budget for automation
- Clear growth goals

Needs Education:
- Skeptical about ROI
- Unclear processes
- New to technology
- Need guidance

Not Ready:
- No budget
- Complex legacy systems
- Strong resistance to change
- Unrealistic expectations

INDUSTRIES & GEOGRAPHIC FOCUS

Industry Focus:
- E-commerce
- Professional Services
- Hospitality
- Manufacturing
- Healthcare
- Real Estate
- Logistics
- SaaS/Tech

Geographic Reach:
- Primary: Montreal, Quebec
- Expanding: Eastern Canada
- Remote: North America
- Languages: English & French

Open to all industries - if you have business processes, we can automate them.

FREQUENTLY ASKED QUESTIONS

How fast can I see results?
Basic automations go live in 2-3 weeks. More complex projects are delivered on agreed timelines with rapid milestones.

What if I'm not sure what to automate?
We run a fast audit to identify the best opportunities and deliver an automation roadmap tailored to your business.

What's your guarantee?
ROI guarantee: If you don't see clear value in 90 days, we work for free until you do.

Do you integrate with my current systems?
Yes, we support integrations with nearly any business platform. If it's unique, we'll find a way to connect it.

Is there a minimum contract?
No long-term contracts—subscriptions are month-to-month with flexible scaling options.

FUTURE VISION & STRATEGIC ROADMAP

2024 - Foundation:
- Launch core services
- Establish local presence
- Build initial portfolio
- Refine delivery process

2025 - Expansion:
- Expand across Quebec
- Advanced AI solutions
- Strategic partnerships
- Industry-specific packages

2026 - Innovation:
- Data marketplace launch
- Robotics integration
- Proprietary AI models
- Thought leadership

Upcoming: Data Marketplace`;

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      const blob = new Blob([knowledgeBaseContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Minecore_Knowledge_Base.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Minecore Group Knowledge Base</CardTitle>
              <p className="text-gray-600">
                Download our comprehensive company information, services, and methodology guide.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">What's included:</h3>
                  <ul className="text-left space-y-2 text-gray-700">
                    <li>• Executive summary and key metrics</li>
                    <li>• Service portfolio and capabilities</li>
                    <li>• Custom pricing approach</li>
                    <li>• Implementation methodology</li>
                    <li>• Technology stack details</li>
                    <li>• FAQs and client profiles</li>
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={handleDownload}
                disabled={isDownloading}
                size="lg"
                className="px-8 py-3"
              >
                {isDownloading ? 'Downloading...' : 'Download Knowledge Base'}
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                File format: Text document (.txt) • Size: ~7KB
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}