import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { ConsultationModal } from "@/components/consultation-modal";
// Logo will be referenced directly from public folder

export function Header() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/files/logo.png" 
              alt="Minecore Group Logo" 
              className="w-24 h-24 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-black font-medium transition-colors">
              {t('services')}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-black font-medium transition-colors">
              {t('about')}
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-black font-medium transition-colors">
              {t('pricing')}
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-black font-medium transition-colors">
              {t('contact')}
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />

            <ConsultationModal 
              className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-white border-t border-gray-200`}>
          <div className="px-4 py-6 space-y-4">
            <Link href="/services" className="block text-gray-600 hover:text-black font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              {t('services')}
            </Link>
            <Link href="/about" className="block text-gray-600 hover:text-black font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              {t('about')}
            </Link>
            <Link href="/pricing" className="block text-gray-600 hover:text-black font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              {t('pricing')}
            </Link>
            <Link href="/contact" className="block text-gray-600 hover:text-black font-medium py-2" onClick={() => setIsMenuOpen(false)}>
              {t('contact')}
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              <LanguageToggle />
              <div className="mt-4" onClick={() => setIsMenuOpen(false)}>
                <ConsultationModal 
                  className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}