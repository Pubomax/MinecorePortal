import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/consultation-modal";
import { Link } from "wouter";

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-8">
              {t('servicesModularTitle')}<br />
              <span className="text-gray-300">{t('servicesModularSubtitle')}</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {t('servicesModularDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationModal 
                triggerText={t('bookFreeConsultation')}
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                data-testid="button-book-consultation-services"
              />
              <Link href="/pricing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold"
                  data-testid="button-view-pricing-services"
                >
                  {t('viewPricingPlans')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl mb-6">{t('ourCoreModules')}</h2>
              <p className="text-xl text-gray-600">{t('productizedSolutionsDescription')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Module 1: Chatbot */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-service-chatbot">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <i className="fas fa-comments text-blue-600 text-2xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">{t('chatbotModule')}</h3>
                  <p className="text-gray-600 mb-6">{t('chatbotDetailedDescription')}</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('chatbotFeature1')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('chatbotFeature2')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('chatbotFeature3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Module 2: Voicebot */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-service-voicebot">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <i className="fas fa-phone text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">{t('voicebotModule')}</h3>
                  <p className="text-gray-600 mb-6">{t('voicebotDetailedDescription')}</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('voicebotFeature1')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('voicebotFeature2')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('voicebotFeature3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Module 3: CRM Kommo */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-service-crm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <i className="fas fa-users text-purple-600 text-2xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">{t('crmModule')}</h3>
                  <p className="text-gray-600 mb-6">{t('crmDetailedDescription')}</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('crmFeature1')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('crmFeature2')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('crmFeature3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Module 4: Custom Automations */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-service-automations">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <i className="fas fa-cogs text-orange-600 text-2xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">{t('automationsModule')}</h3>
                  <p className="text-gray-600 mb-6">{t('automationsDetailedDescription')}</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('automationsFeature1')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('automationsFeature2')}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-black mr-2 mt-1"></i>
                      <span>{t('automationsFeature3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl mb-6">{t('ourTechStack')}</h2>
              <p className="text-xl text-gray-600">{t('techStackDescription')}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Tech 1: n8n */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-project-diagram text-white text-3xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">n8n</h3>
                  <p className="text-gray-600 mb-4">{t('n8nDescription')}</p>
                  <p className="text-sm text-gray-500">{t('n8nBenefit')}</p>
                </CardContent>
              </Card>

              {/* Tech 2: Kommo CRM */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-database text-white text-3xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">Kommo CRM</h3>
                  <p className="text-gray-600 mb-4">{t('komomCrmDescription')}</p>
                  <p className="text-sm text-gray-500">{t('komomBenefit')}</p>
                </CardContent>
              </Card>

              {/* Tech 3: OpenAI */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-brain text-white text-3xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">OpenAI</h3>
                  <p className="text-gray-600 mb-4">{t('openAiDescription')}</p>
                  <p className="text-sm text-gray-500">{t('openAiBenefit')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl mb-6">{t('howWeWork')}</h2>
              <p className="text-xl text-gray-600">{t('simpleProcessDescription')}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="font-display text-2xl mb-4">{t('step1Title')}</h3>
                <p className="text-gray-600">{t('step1Description')}</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="font-display text-2xl mb-4">{t('step2Title')}</h3>
                <p className="text-gray-600">{t('step2Description')}</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="font-display text-2xl mb-4">{t('step3Title')}</h3>
                <p className="text-gray-600">{t('step3Description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              {t('readyToEliminateBottlenecks')}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {t('readyToEliminateBottlenecksDesc')}
            </p>
            
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                {t('bookFreeConsultation')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}