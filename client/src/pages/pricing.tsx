import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsultationModal } from "@/components/consultation-modal";
import { Link } from "wouter";

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-8">
              {t('newPricingTitle')}<br />
              <span className="text-gray-300">{t('newPricingSubtitle')}</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {t('newPricingDescription')}
            </p>

            {/* Setup + Recurring Model */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-2">{t('setupFees')}</div>
                <div className="font-display text-4xl mb-2">990$ - 1 900$</div>
                <div className="text-gray-300">{t('setupIncludes')}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-2">{t('monthlyPlans')}</div>
                <div className="font-display text-4xl mb-2">500$ - 1 500$+</div>
                <div className="text-gray-300">{t('recurringIncludes')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="font-display text-4xl mb-6">{t('chooseGrowthLevel')}</h2>
              <p className="text-xl text-gray-600">
                {t('allPlansInclude')}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">

              {/* Starter Package */}
              <Card className="border-2 border-gray-200 relative" data-testid="card-plan-starter">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="font-display text-2xl mb-2">{t('starterPackage')}</h3>
                    <p className="text-gray-600 mb-4">{t('starterPackageDescription')}</p>
                    <p className="text-sm text-gray-500 mb-6">{t('starterTarget')}</p>

                    <div className="mb-6">
                      <div className="font-display text-4xl">500$</div>
                      <div className="text-gray-600">{t('month')}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('starterModule1')}</div>
                        <div className="text-sm text-gray-600">{t('starterModule1Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('starterModule2')}</div>
                        <div className="text-sm text-gray-600">{t('starterModule2Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('starterSupport')}</div>
                        <div className="text-sm text-gray-600">{t('starterSupportDesc')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{t('starterSetup')}</div>
                      <div className="text-sm text-gray-600">{t('starterSetupCost')}</div>
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 py-3" data-testid="button-choose-starter">
                      {t('chooseStarter')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Pro Package - Most Popular */}
              <Card className="border-2 border-black relative" data-testid="card-plan-pro">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold">
                    {t('mostPopular')}
                  </span>
                </div>

                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="font-display text-2xl mb-2">{t('proPackage')}</h3>
                    <p className="text-gray-600 mb-4">{t('proPackageDescription')}</p>
                    <p className="text-sm text-gray-500 mb-6">{t('proTarget')}</p>

                    <div className="mb-6">
                      <div className="font-display text-4xl">1 000$</div>
                      <div className="text-gray-600">{t('month')}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('proModule1')}</div>
                        <div className="text-sm text-gray-600">{t('proModule1Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('proModule2')}</div>
                        <div className="text-sm text-gray-600">{t('proModule2Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('proModule3')}</div>
                        <div className="text-sm text-gray-600">{t('proModule3Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('proSupport')}</div>
                        <div className="text-sm text-gray-600">{t('proSupportDesc')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black text-white p-4 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{t('proSetup')}</div>
                      <div className="text-gray-300 text-sm">{t('proSetupCost')}</div>
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 py-3" data-testid="button-choose-pro">
                      {t('choosePro')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Growth Package */}
              <Card className="border-2 border-gray-200 relative" data-testid="card-plan-growth">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="font-display text-2xl mb-2">{t('growthPackage')}</h3>
                    <p className="text-gray-600 mb-4">{t('growthPackageDescription')}</p>
                    <p className="text-sm text-gray-500 mb-6">{t('growthTarget')}</p>

                    <div className="mb-6">
                      <div className="font-display text-4xl">1 500$+</div>
                      <div className="text-gray-600">{t('month')}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('growthModule1')}</div>
                        <div className="text-sm text-gray-600">{t('growthModule1Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('growthModule2')}</div>
                        <div className="text-sm text-gray-600">{t('growthModule2Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('growthModule3')}</div>
                        <div className="text-sm text-gray-600">{t('growthModule3Desc')}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <i className="fas fa-check text-black mr-3 mt-1"></i>
                      <div>
                        <div className="font-semibold">{t('growthSupport')}</div>
                        <div className="text-sm text-gray-600">{t('growthSupportDesc')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{t('growthSetup')}</div>
                      <div className="text-sm text-gray-600">{t('growthSetupCost')}</div>
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button className="w-full bg-black text-white hover:bg-gray-800 py-3" data-testid="button-choose-growth">
                      {t('chooseGrowth')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* ROI Guarantee */}
            <div className="bg-black text-white rounded-2xl p-12 mb-16">
              <div className="text-center mb-8">
                <h3 className="font-display text-3xl mb-4">{t('roiGuarantee90Day')}</h3>
                <p className="text-xl text-gray-300">
                  {t('continueWorkingFree')}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="font-display text-4xl mb-2">400%</div>
                  <div className="text-gray-300">{t('averageClientRoi')}</div>
                </div>
                <div>
                  <div className="font-display text-4xl mb-2">99.5%</div>
                  <div className="text-gray-300">{t('uptimeGuarantee')}</div>
                </div>
                <div>
                  <div className="font-display text-4xl mb-2">30-day</div>
                  <div className="text-gray-300">{t('moneyBackGuarantee')}</div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
              <h3 className="font-display text-3xl mb-8 text-center">{t('frequentlyAskedQuestions')}</h3>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-lg mb-3">{t('howQuicklyResults')}</h4>
                  <p className="text-gray-600">
                    {t('resultsAnswer')}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-lg mb-3">{t('replaceToolsQuestion')}</h4>
                  <p className="text-gray-600">
                    {t('replaceToolsAnswer')}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-lg mb-3">{t('businessUniqueQuestion')}</h4>
                  <p className="text-gray-600">
                    {t('businessUniqueAnswer')}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-lg mb-3">{t('cancelAnytimeQuestion')}</h4>
                  <p className="text-gray-600">
                    {t('cancelAnytimeAnswer')}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">{t('dataSecurityQuestion')}</h4>
                  <p className="text-gray-600">
                    {t('dataSecurityAnswer')}
                  </p>
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
              {t('readyToWorkLessTitle')}
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              {t('readyToWorkLessSubtitle')}
            </p>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                {t('bookFreeConsultation')}
              </Button>
            </Link>

            <p className="text-gray-400 mt-4">
              {t('noSalesPressure')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}