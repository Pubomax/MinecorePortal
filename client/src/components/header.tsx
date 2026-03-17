import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { ConsultationModal } from "@/components/consultation-modal";
import { MarketingContainer } from "@/components/marketing";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useLanguage();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/pricing", label: t("pricing") },
    { href: "/contact", label: t("contact") },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className="sticky top-0 z-50 pt-4">
      <MarketingContainer className="px-3 sm:px-5 lg:px-6">
        <div className="marketing-panel rounded-[28px] px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-[172px] shrink-0 items-center gap-2.5 pr-2 lg:pr-3 xl:min-w-[190px] xl:pr-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/90 shadow-[0_16px_30px_rgba(15,23,42,0.08)] xl:h-12 xl:w-12">
                <img src="/logo-mark.svg" alt="Minecore Group logo" className="h-7 w-7 object-contain xl:h-8 xl:w-8" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-[1.35rem] tracking-[-0.05em] text-slate-950 xl:text-xl">
                  Minecore
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 xl:text-xs xl:tracking-[0.28em]">
                  {t("automationStudio")}
                </div>
              </div>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-0.5 xl:gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold leading-none text-slate-500 transition-all hover:bg-white/70 hover:text-slate-950 xl:px-4",
                    isActive(item.href) &&
                      "bg-slate-950 text-white shadow-[0_14px_28px_rgba(15,23,42,0.16)]",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 xl:gap-3 lg:flex">
              <LanguageToggle />
              <ConsultationModal
                className="marketing-button-primary h-11 whitespace-nowrap px-4 text-[0.92rem] font-semibold xl:px-5"
                triggerText={t("bookConsultation")}
              />
            </div>

            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(16,24,40,0.08)] bg-white/70 text-slate-950 lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen ? (
            <div className="mt-4 rounded-[24px] border border-[rgba(16,24,40,0.08)] bg-white/88 p-4 shadow-[0_24px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden">
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-950 hover:text-white",
                      isActive(item.href) && "bg-slate-950 text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid gap-3 border-t border-[rgba(16,24,40,0.08)] pt-4">
                <LanguageToggle />
                <Link
                  href="/pricing"
                  className="flex items-center justify-between rounded-2xl border border-[rgba(16,24,40,0.08)] px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  {t("viewPricingPlans")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <ConsultationModal
                  className="marketing-button-primary h-12 justify-center px-5 text-sm font-semibold"
                  triggerText={t("bookConsultation")}
                />
              </div>
            </div>
          ) : null}
        </div>
      </MarketingContainer>
    </header>
  );
}
