import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

export default function CaseStudies() {
  const { t } = useLanguage();

  const scrollToConsultation = () => {
    window.location.href = "/#consultation-form";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-inter font-bold text-4xl lg:text-5xl mb-6">
            {t("caseStudiesTitle")}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t("caseStudiesSubtitle")}
          </p>
        </div>
      </section>

      {/* Detailed Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          
          {/* Case Study 1: E-commerce Retailer */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
                alt="E-commerce warehouse operations" 
                className="w-full h-64 object-cover" 
              />
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fas fa-shopping-cart text-blue-600 text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="font-inter font-bold text-3xl text-dark">E-commerce Retailer</h2>
                    <p className="text-gray-600">Montreal-based online store • Fashion & Accessories</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-xl text-red-600 mb-4">The Challenge</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Manual order processing consuming 60+ hours/week</li>
                      <li>• Customer service inquiries overwhelming small team</li>
                      <li>• Inventory management errors causing stockouts</li>
                      <li>• Unable to scale beyond current capacity</li>
                      <li>• Founder working 80+ hours/week on operations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl text-secondary mb-4">Our Solution</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Automated order processing workflow</li>
                      <li>• AI chatbot for 24/7 customer support</li>
                      <li>• Smart inventory management system</li>
                      <li>• Automated email marketing sequences</li>
                      <li>• Real-time analytics dashboard</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
                  <h3 className="font-semibold text-xl text-green-800 mb-4">Results Achieved</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">70%</div>
                      <div className="text-sm text-gray-600">Processing Time Reduced</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">60%</div>
                      <div className="text-sm text-gray-600">Revenue Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">45%</div>
                      <div className="text-sm text-gray-600">Customer Satisfaction ↑</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">40hrs</div>
                      <div className="text-sm text-gray-600">Weekly Time Saved</div>
                    </div>
                  </div>
                </div>

                <blockquote className="bg-light-bg p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-lg text-gray-700 italic mb-4">
                    "Minecore transformed our business completely. I went from working 80 hours a week 
                    to focusing on strategy and growth. Our revenue doubled while I work half the hours."
                  </p>
                  <footer className="text-gray-600">
                    <strong>Sarah Chen</strong> • Founder, StyleHub Montreal
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Case Study 2: Professional Services */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
                alt="Professional services office" 
                className="w-full h-64 object-cover" 
              />
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fas fa-briefcase text-purple-600 text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="font-inter font-bold text-3xl text-dark">Professional Services Firm</h2>
                    <p className="text-gray-600">Management Consulting • Laval, QC</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-xl text-red-600 mb-4">The Challenge</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Lead qualification bottleneck preventing scale</li>
                      <li>• Manual follow-up processes losing prospects</li>
                      <li>• Inconsistent proposal generation</li>
                      <li>• Time-consuming client onboarding</li>
                      <li>• No systematic approach to nurturing leads</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl text-secondary mb-4">Our Solution</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• AI-powered lead scoring system</li>
                      <li>• Automated nurturing email sequences</li>
                      <li>• Smart proposal generation tool</li>
                      <li>• Streamlined client onboarding workflow</li>
                      <li>• Automated CRM data enrichment</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
                  <h3 className="font-semibold text-xl text-green-800 mb-4">Results Achieved</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">3x</div>
                      <div className="text-sm text-gray-600">Qualified Leads</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">50%</div>
                      <div className="text-sm text-gray-600">Better Conversion</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">35%</div>
                      <div className="text-sm text-gray-600">Revenue Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">25hrs</div>
                      <div className="text-sm text-gray-600">Weekly Time Saved</div>
                    </div>
                  </div>
                </div>

                <blockquote className="bg-light-bg p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-lg text-gray-700 italic mb-4">
                    "The lead qualification system alone tripled our pipeline quality. 
                    We're closing bigger deals with less effort. ROI was evident within 6 weeks."
                  </p>
                  <footer className="text-gray-600">
                    <strong>Marc Dubois</strong> • Managing Partner, Stratégie Plus
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Case Study 3: Healthcare Practice */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
                alt="Modern healthcare clinic" 
                className="w-full h-64 object-cover" 
              />
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fas fa-user-md text-green-600 text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="font-inter font-bold text-3xl text-dark">Healthcare Practice</h2>
                    <p className="text-gray-600">Multi-specialty Clinic • Montreal, QC</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-xl text-red-600 mb-4">The Challenge</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Appointment scheduling chaos during peak hours</li>
                      <li>• Patient communication delays causing frustration</li>
                      <li>• Manual insurance verification process</li>
                      <li>• No-show rates impacting revenue</li>
                      <li>• Staff overwhelmed with administrative tasks</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl text-secondary mb-4">Our Solution</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Smart appointment scheduling system</li>
                      <li>• Automated patient communication workflows</li>
                      <li>• Insurance verification automation</li>
                      <li>• Intelligent reminder system</li>
                      <li>• Patient portal integration</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
                  <h3 className="font-semibold text-xl text-green-800 mb-4">Results Achieved</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">90%</div>
                      <div className="text-sm text-gray-600">Fewer Phone Calls</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">25%</div>
                      <div className="text-sm text-gray-600">More Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">95%</div>
                      <div className="text-sm text-gray-600">Patient Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-secondary">15hrs</div>
                      <div className="text-sm text-gray-600">Weekly Time Saved</div>
                    </div>
                  </div>
                </div>

                <blockquote className="bg-light-bg p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-lg text-gray-700 italic mb-4">
                    "Our patients love the new booking system, and our staff can focus on patient care 
                    instead of phone calls. The automated reminders reduced no-shows by 60%."
                  </p>
                  <footer className="text-gray-600">
                    <strong>Dr. Elena Rodriguez</strong> • Medical Director, Clinique Santé Plus
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-blue-800 rounded-2xl shadow-xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="font-inter font-bold text-3xl mb-4">
                Ready to Be Our Next Success Story?
              </h3>
              <p className="text-xl text-blue-100 mb-6">
                Join these successful Montreal businesses and transform your operations with proven AI automation.
              </p>
              <Button
                onClick={scrollToConsultation}
                className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
              >
                <i className="fas fa-rocket mr-2"></i>
                Start Your Transformation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
