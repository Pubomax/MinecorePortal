import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white text-black p-2 rounded-lg">
                  <i className="fas fa-bolt text-lg"></i>
                </div>
                <div>
                  <div className="font-display text-xl">Minecore</div>
                  <div className="text-sm text-gray-400 -mt-1">Group</div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 max-w-md">
                {t('aiAutomationFooter')}
              </p>

              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  3580 Blvd Saint-Elzear Ouest, Laval, QC H7P 0A2
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  <a href="mailto:hello@minecoregroup.com" className="hover:text-white transition-colors">
                    hello@minecoregroup.com
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-6">
                  <a href="https://linkedin.com/company/minecore" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                    <i className="fab fa-linkedin-in text-sm"></i>
                  </a>
                  <a href="https://x.com/minecore" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                    <i className="fab fa-twitter text-sm"></i>
                  </a>
                  <a href="https://facebook.com/minecore" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                    <i className="fab fa-facebook-f text-sm"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('quickLinks')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                    {t('services2')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                    {t('pricing')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact CTA */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('getStarted')}</h3>
              <p className="text-gray-300 text-sm mb-4">
                {t('readyToAutomate')}
              </p>
              <Link
                href="/contact"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                {t('bookConsultation')}
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div>
                © 2026 Minecore Group. {t('allRightsReserved')}
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span>{t('privacyPolicy')}</span>
                <span>{t('termsOfService')}</span>
                <span>{t('proudlyCanadian')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}