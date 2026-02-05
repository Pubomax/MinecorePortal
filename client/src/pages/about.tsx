import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/consultation-modal";
import { Link } from "wouter";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-8">
              {t('aboutTitle')}<br />
              <span className="text-gray-300">{t('aboutSubtitle')}</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {t('aboutDescription')}
            </p>
            
            <ConsultationModal 
              triggerText={t('workWithUs')}
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="font-display text-4xl mb-6">{t('fromBurnoutBreakthrough')}</h2>
                
                <p className="text-lg text-gray-600 mb-6">
                  {t('foundedIn2024')}
                </p>
                
                <p className="text-lg text-gray-600 mb-8">
                  {t('despiteGrowingRevenue')}
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">{t('turningPoint')}</h3>
                  <p className="text-gray-600">
                    "{t('turningPointQuote')}"
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                    alt="Company founder - Entrepreneur and AI automation specialist"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border">
                  <div className="text-center">
                    <div className="font-display text-xl">Montreal</div>
                    <div className="text-sm text-gray-600">{t('foundedMontreal')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transformation Stats */}
            <div className="bg-black text-white p-12 rounded-2xl mb-20">
              <h3 className="font-display text-3xl mb-8 text-center">{t('ourPersonalTransformation')}</h3>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="font-display text-4xl mb-2">70%</div>
                  <div className="text-gray-300">{t('weeklyWorkloadReduction')}</div>
                  <p className="text-sm text-gray-400 mt-2">{t('from80HoursTo25')}</p>
                </div>
                <div>
                  <div className="font-display text-4xl mb-2">40%</div>
                  <div className="text-gray-300">{t('revenueIncrease')}</div>
                  <p className="text-sm text-gray-400 mt-2">{t('workingLessEarningMore')}</p>
                </div>
                <div>
                  <div className="font-display text-4xl mb-2">2-3</div>
                  <div className="text-gray-300">{t('weeksToImplement')}</div>
                  <p className="text-sm text-gray-400 mt-2">{t('quickWinsCompound')}</p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl mb-8">{t('ourMission')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t('helpFellowEntrepreneurs')}
              </p>
              
              <div className="bg-gray-50 p-8 rounded-xl max-w-2xl mx-auto">
                <h3 className="font-semibold text-xl mb-4">{t('whyWereDifferent')}</h3>
                <ul className="text-left space-y-3 text-gray-600">
                  <li>• {t('entrepreneurToEntrepreneur')}</li>
                  <li>• {t('provenResults')}</li>
                  <li>• {t('noCorporateBs')}</li>
                  <li>• {t('fastImplementation')}</li>
                </ul>
              </div>
            </div>

            {/* Our Approach */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-2xl"></i>
                </div>
                <h3 className="font-display text-xl mb-4">{t('identify')}</h3>
                <p className="text-gray-600">
                  {t('identifyDescription')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-cogs text-2xl"></i>
                </div>
                <h3 className="font-display text-xl mb-4">{t('implement')}</h3>
                <p className="text-gray-600">
                  {t('implementDescription')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-chart-line text-2xl"></i>
                </div>
                <h3 className="font-display text-xl mb-4">{t('optimize')}</h3>
                <p className="text-gray-600">
                  {t('optimizeDescription')}
                </p>
              </div>
            </div>

            {/* Location & Values */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-3xl mb-6">{t('proudlyMontrealBased')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('locatedInLaval')}
                </p>
                
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-black mr-3"></i>
                    <span>3580 Blvd Saint-Elzear Ouest, Laval, QC H7P 0A2</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-globe text-black mr-3"></i>
                    <span>{t('servingClientsNorthAmerica')}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-comments text-black mr-3"></i>
                    <span>{t('bilingualService')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black text-white p-8 rounded-2xl">
                <h4 className="font-display text-2xl mb-6">{t('ourValues')}</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2">{t('authenticity')}</h5>
                    <p className="text-gray-300 text-sm">{t('authenticityDescription')}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">{t('speed')}</h5>
                    <p className="text-gray-300 text-sm">{t('speedDescription')}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">{t('partnership')}</h5>
                    <p className="text-gray-300 text-sm">{t('partnershipDescription')}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">{t('results')}</h5>
                    <p className="text-gray-300 text-sm">{t('resultsDescription')}</p>
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              {t('readyForBreakthrough')}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {t('entrepreneurToEntrepreneurTalk')}
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