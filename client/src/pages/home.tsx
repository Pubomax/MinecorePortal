import { useLanguage } from "@/hooks/use-language";
import { MultiStepConsultationForm } from "@/components/multi-step-consultation-form";
import { ConsultationModal } from "@/components/consultation-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                {t('lavalMontrealLocalExpert')}
              </span>
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl leading-tight mb-6">
              {t('newHeroTitle')}<br />
              <span className="text-gray-300">{t('newHeroSubtitle')}</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {t('newHeroDescription')}
            </p>
            
            {/* Pricing Model Highlight */}
            <div className="bg-white/10 rounded-xl p-6 mb-12 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <div className="text-sm text-gray-400 mb-2">{t('setupFees')}</div>
                  <div className="font-display text-3xl">990$ - 1 900$</div>
                  <div className="text-sm text-gray-400 mt-1">{t('oneTimeInstallation')}</div>
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-400 mb-2">{t('monthlyPlans')}</div>
                  <div className="font-display text-3xl">{t('from500PerMonth')}</div>
                  <div className="text-sm text-gray-400 mt-1">{t('starterProGrowth')}</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationModal 
                triggerText={t('bookFreeConsultation')}
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                data-testid="button-book-consultation-hero"
              />
              <Link href="/pricing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold"
                  data-testid="button-view-pricing-hero"
                >
                  {t('viewPricingPlans')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Problem Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl mb-6">
                {t('threeProblemsKilling')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('problemNarrative')}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Problem 1 */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-[#FACC15] rounded-lg flex items-center justify-center mb-6">
                    <i className="fas fa-phone text-black text-xl"></i>
                  </div>
                  <h3 className="font-display text-xl mb-4">{t('customerSupportTrap')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('customerSupportProblem')}
                  </p>
                  <div className="bg-black text-white p-4 rounded-lg">
                    <div className="font-semibold mb-2">{t('ourSolution')}</div>
                    <ul className="text-sm space-y-1">
                      <li>{t('aiChatbotsHandle')}</li>
                      <li>{t('smartEmailAutomation')}</li>
                      <li>{t('intelligentCallRouting')}</li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <span className="font-bold">{t('resultSave25Hours')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problem 2 */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-[#FACC15] rounded-lg flex items-center justify-center mb-6">
                    <i className="fas fa-dollar-sign text-black text-xl"></i>
                  </div>
                  <h3 className="font-display text-xl mb-4">{t('revenueCeiling')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('revenueCeilingProblem')}
                  </p>
                  <div className="bg-black text-white p-4 rounded-lg">
                    <div className="font-semibold mb-2">{t('ourSolution')}</div>
                    <ul className="text-sm space-y-1">
                      <li>{t('automatedLeadResearchSol')}</li>
                      <li>{t('smartFollowUpSequences')}</li>
                      <li>{t('crmThatWorks')}</li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <span className="font-bold">{t('resultRevenueIncrease')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problem 3 */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-[#FACC15] rounded-lg flex items-center justify-center mb-6">
                    <i className="fas fa-sync text-black text-xl"></i>
                  </div>
                  <h3 className="font-display text-xl mb-4">{t('operationalChaos')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('operationalChaosProblem')}
                  </p>
                  <div className="bg-black text-white p-4 rounded-lg">
                    <div className="font-semibold mb-2">{t('ourSolution')}</div>
                    <ul className="text-sm space-y-1">
                      <li>{t('automatedReportingSol')}</li>
                      <li>{t('intelligentTaskMgmt')}</li>
                      <li>{t('resourceOptimizationSol')}</li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <span className="font-bold">{t('result50PercentEfficiency')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Modules Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl mb-6">{t('ourModules')}</h2>
              <p className="text-xl text-gray-600">{t('standardizedModulesDescription')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Module 1: Chatbot */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-module-chatbot">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#1E293B] rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <i className="fas fa-comments text-[#FACC15] text-2xl"></i>
                  </div>
                  <h3 className="font-display text-xl mb-3">{t('chatbotModule')}</h3>
                  <p className="text-gray-600 text-sm">{t('chatbotModuleDescription')}</p>
                </CardContent>
              </Card>

              {/* Module 2: Voicebot */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-module-voicebot">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#1E293B] rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <i className="fas fa-phone text-[#FACC15] text-2xl"></i>
                  </div>
                  <h3 className="font-display text-xl mb-3">{t('voicebotModule')}</h3>
                  <p className="text-gray-600 text-sm">{t('voicebotModuleDescription')}</p>
                </CardContent>
              </Card>

              {/* Module 3: CRM */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-module-crm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#1E293B] rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <i className="fas fa-users text-[#FACC15] text-2xl"></i>
                  </div>
                  <h3 className="font-display text-xl mb-3">{t('crmModule')}</h3>
                  <p className="text-gray-600 text-sm">{t('crmModuleDescription')}</p>
                </CardContent>
              </Card>

              {/* Module 4: Automations */}
              <Card className="border-2 border-gray-200 hover:border-black transition-colors" data-testid="card-module-automations">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#1E293B] rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <i className="fas fa-cogs text-[#FACC15] text-2xl"></i>
                  </div>
                  <h3 className="font-display text-xl mb-3">{t('automationsModule')}</h3>
                  <p className="text-gray-600 text-sm">{t('automationsModuleDescription')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-gray-50">
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
                  <p className="text-gray-600">{t('n8nDescription')}</p>
                </CardContent>
              </Card>

              {/* Tech 2: Kommo CRM */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-[#0B132B] border border-[#FACC15] rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-database text-[#FACC15] text-3xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">Kommo CRM</h3>
                  <p className="text-gray-600">{t('komomCrmDescription')}</p>
                </CardContent>
              </Card>

              {/* Tech 3: OpenAI */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-[#0B132B] border border-[#FACC15] rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-brain text-[#FACC15] text-3xl"></i>
                  </div>
                  <h3 className="font-display text-2xl mb-4">OpenAI</h3>
                  <p className="text-gray-600">{t('openAiDescription')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {t('founderStoryBadge')}
                  </span>
                </div>
                
                <h2 className="font-display text-4xl mb-6">
                  {t('from80HourWeeks')}
                </h2>
                
                <p className="text-lg text-gray-600 mb-8">
                  {t('founderStoryText')}
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold text-lg mb-4">{t('myTransformation')}</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="font-display text-3xl text-black">70%</div>
                      <div className="text-gray-600">{t('weeklyWorkloadCut')}</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl text-black">40%</div>
                      <div className="text-gray-600">{t('revenueBoost')}</div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600">
                  {t('nowIHelp')} <strong>{t('entrepreneurToEntrepreneurText')}</strong> {t('solvingProblemsLived')}
                </p>
              </div>
              
              <div className="relative">
                {/* TODO: Replace with real photo of Thierry — add /public/thierry.jpg */}
                <div className="bg-gradient-to-br from-[#0D1F3C] to-[#0B132B] rounded-2xl aspect-square flex items-center justify-center overflow-hidden border border-[#1E293B]">
                  <div className="flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 bg-[#1E293B] rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-user text-[#FACC15] text-4xl"></i>
                    </div>
                    <span className="text-gray-400 text-sm">Photo — Thierry Bijou</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border">
                  <div className="text-center">
                    <div className="font-display text-xl">2024</div>
                    <div className="text-sm text-gray-600">{t('foundedBadge')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-4xl lg:text-5xl mb-6">
                  {t('readyToCutWorkload')}
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  {t('freeConsultationText')}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center mr-4">
                      <i className="fas fa-check text-sm"></i>
                    </div>
                    <span className="text-gray-300">{t('identifyTimeWasters')}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center mr-4">
                      <i className="fas fa-check text-sm"></i>
                    </div>
                    <span className="text-gray-300">{t('getCustomRoadmap')}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center mr-4">
                      <i className="fas fa-check text-sm"></i>
                    </div>
                    <span className="text-gray-300">{t('noCommitmentRequired')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-[#000000]">
                <MultiStepConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}