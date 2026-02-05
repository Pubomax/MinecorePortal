import { useLanguage } from "@/hooks/use-language";
import { MultiStepConsultationForm } from "@/components/multi-step-consultation-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-8">
              {t('contactTitle')}<br />
              <span className="text-gray-300">{t('contactSubtitle')}</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {t('contactDescription')}
            </p>

            <div className="bg-white/10 rounded-lg p-6 max-w-md mx-auto">
              <div className="font-display text-2xl mb-2">{t('within24Hours')}</div>
              <div className="text-gray-300">{t('scheduleConsultation')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Information */}
            <div>
              <h2 className="font-inter font-bold text-3xl text-dark mb-8">{t('getInTouch')}</h2>

              <div className="space-y-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-lg mr-3">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                      </div>
                      {t("address")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      3580 Blvd Saint-Elzear Ouest<br />
                      Laval, QC H7P 0A2<br />
                      Canada
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="bg-secondary/10 p-2 rounded-lg mr-3">
                        <i className="fas fa-envelope text-secondary"></i>
                      </div>
                      {t("email")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      <a href="mailto:hello@minecoregroup.com" className="hover:text-primary transition-colors">
                        hello@minecoregroup.com
                      </a>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="bg-accent/10 p-2 rounded-lg mr-3">
                        <i className="fas fa-clock text-accent"></i>
                      </div>
                      {t('businessHours')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {t('mondayToFriday')}<br />
                      {t('saturday')}<br />
                      {t('sunday')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose Us */}
              <div className="bg-light-bg rounded-xl p-6">
                <h3 className="font-inter font-bold text-xl text-dark mb-4">{t('whyWorkWithUs')}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <i className="fas fa-check text-secondary mr-3 mt-1"></i>
                    <span className="text-gray-600">{t('roiGuarantee90Days')}</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check text-secondary mr-3 mt-1"></i>
                    <span className="text-gray-600">{t('entrepreneurToEntrepreneurContact')}</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check text-secondary mr-3 mt-1"></i>
                    <span className="text-gray-600">{t('implementationTimeline')}</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check text-secondary mr-3 mt-1"></i>
                    <span className="text-gray-600">{t('monthToMonthFlexibility')}</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check text-secondary mr-3 mt-1"></i>
                    <span className="text-gray-600">{t('bilingualSupport')}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg text-dark mb-4">{t('followUs')}</h3>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/company/minecore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-all">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://x.com/minecore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-all">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://facebook.com/minecore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-all">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gradient-to-br from-primary to-blue-800 text-white p-8 rounded-t-2xl">
                <h3 className="font-inter font-bold text-2xl mb-4">
                  {t('readyToTransformBusiness')}
                </h3>
                <p className="text-blue-100">
                  {t('bookFreeConsultationDiscover')}
                </p>
              </div>

              <div className="bg-white p-8 rounded-b-2xl shadow-xl max-w-4xl mx-auto">
                <MultiStepConsultationForm />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg inline-block mb-4">
                  <i className="fas fa-handshake text-primary text-2xl"></i>
                </div>
                <CardTitle>{t('freeConsultationTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('freeConsultationDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-secondary/10 p-3 rounded-lg inline-block mb-4">
                  <i className="fas fa-rocket text-secondary text-2xl"></i>
                </div>
                <CardTitle>{t('customStrategyTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('customStrategyDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-accent/10 p-3 rounded-lg inline-block mb-4">
                  <i className="fas fa-shield-alt text-accent text-2xl"></i>
                </div>
                <CardTitle>{t('ongoingSupportTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('ongoingSupportDesc')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Service Area Map */}
          <div className="mt-20 bg-light-bg rounded-2xl p-8">
            <h3 className="font-inter font-bold text-2xl text-dark mb-8 text-center">{t('ourServiceArea')}</h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="font-semibold text-xl mb-4">{t('primaryMarkets')}</h4>
                <ul className="space-y-2 text-gray-600">
                  <li dangerouslySetInnerHTML={{ __html: t('montrealOurHomeBase') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('lavalWhereLocated') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('quebecCityGrowing') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('ottawaExpanding') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('torontoSelectClients') }} />
                </ul>

                <h4 className="font-semibold text-xl mb-4 mt-6">{t('remoteServices')}</h4>
                <p className="text-gray-600">
                  {t('serveClientsNorthAmerica')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-center">
                  <i className="fas fa-map-marked-alt text-4xl text-primary mb-4"></i>
                  <h3 className="font-semibold mb-2">{t('servingEasternCanada')}</h3>
                  <p className="text-gray-600">
                    {t('basedInLaval')}
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500">
                    <span>🇨🇦 {t("proudlyCanadian")}</span>
                    <span>🗣️ {t("englishFrench")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}