import { Link } from "wouter";
import { ArrowRight, Globe2, Mail, MapPin, MoveRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { ConsultationModal } from "@/components/consultation-modal";
import { MarketingContainer, SurfaceCard } from "@/components/marketing";

export function Footer() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("services"),
      links: [
        { href: "/services", label: t("services") },
        { href: "/pricing", label: t("pricing") },
      ],
    },
    {
      title: t("about"),
      links: [
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
      ],
    },
  ];

  return (
    <footer className="pb-10 pt-20">
      <MarketingContainer className="space-y-6">
        <SurfaceCard className="overflow-hidden rounded-[36px] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div className="space-y-5">
              <div className="marketing-chip">{t("eyebrowNextStep")}</div>
              <h2 className="font-display text-4xl leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-5xl">
                {t("readyToCutWorkload")}
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {t("freeConsultationText")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="marketing-subpanel p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {t("footerDeliveryLabel")}
                </div>
                <div className="mt-4 font-display text-4xl tracking-[-0.05em] text-slate-950">
                  2-3 {t("weeksSuffix")}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t("footerDeliveryDesc")}
                </p>
              </div>
              <div className="marketing-subpanel p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {t("footerEngagementLabel")}
                </div>
                <div className="mt-4 font-display text-4xl tracking-[-0.05em] text-slate-950">
                  {t("footerEngagementValue")}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t("footerEngagementDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(16,24,40,0.08)] pt-8 sm:flex-row">
            <ConsultationModal
              triggerText={t("bookConsultation")}
              className="marketing-button-primary h-12 px-6 text-sm font-semibold"
            />
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[rgba(16,24,40,0.1)] bg-white/70 px-6 text-sm font-semibold text-slate-900 transition-colors hover:bg-white"
            >
              {t("getInTouch")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SurfaceCard>

        <SurfaceCard className="rounded-[36px] px-6 py-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr_.8fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 shadow-[0_18px_36px_rgba(15,23,42,0.2)]">
                  <img src="/logo-mark.svg" alt="Minecore logo" className="h-8 w-8 object-contain" />
                </div>
                <div>
                  <div className="font-display text-2xl tracking-[-0.05em] text-slate-950">
                    Minecore
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {t("automationStudio")}
                  </div>
                </div>
              </div>

              <p className="max-w-md text-sm leading-7 text-slate-600">{t("aiAutomationFooter")}</p>

              <div className="grid gap-3 text-sm text-slate-600">
                <div className="inline-flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-900" />
                  1655 Rue du Grand Pic, Laval, QC H7P 0K8
                </div>
                <a
                  href="mailto:hello@minecoregroup.com"
                  className="inline-flex items-center gap-3 transition-colors hover:text-slate-950"
                >
                  <Mail className="h-4 w-4 text-slate-900" />
                  hello@minecoregroup.com
                </a>
                <div className="inline-flex items-center gap-3">
                  <Globe2 className="h-4 w-4 text-slate-900" />
                  {t("footerCoverage")}
                </div>
              </div>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {section.title}
                </div>
                <div className="grid gap-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950"
                    >
                      <MoveRight className="h-4 w-4 text-[var(--brand-coral)]" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(16,24,40,0.08)] pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 Minecore Group. {t("allRightsReserved")}</div>
            <div className="flex flex-wrap items-center gap-4">
              <span>{t("privacyPolicy")}</span>
              <span>{t("termsOfService")}</span>
              <span>{t("proudlyCanadian")}</span>
            </div>
          </div>
        </SurfaceCard>
      </MarketingContainer>
    </footer>
  );
}
