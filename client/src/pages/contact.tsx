import { Clock3, Globe2, Mail, MapPin, ShieldCheck } from "lucide-react";
import { MultiStepConsultationForm } from "@/components/multi-step-consultation-form";
import { useLanguage } from "@/hooks/use-language";
import {
  MarketingContainer,
  MarketingHero,
  Reveal,
  SectionHeader,
  SurfaceCard,
} from "@/components/marketing";

export default function Contact() {
  const { t } = useLanguage();

  const contactCards = [
    {
      icon: MapPin,
      title: t("address"),
      copy: "1655 Rue du Grand Pic\nLaval, QC H7P 0K8\nCanada",
    },
    {
      icon: Mail,
      title: t("email"),
      copy: "hello@minecoregroup.com",
      href: "mailto:hello@minecoregroup.com",
    },
    {
      icon: Clock3,
      title: t("businessHours"),
      copy: `${t("mondayToFriday")}\n${t("saturday")}\n${t("sunday")}`,
    },
  ];

  const reasons = [
    t("roiGuarantee90Days"),
    t("entrepreneurToEntrepreneurContact"),
    t("implementationTimeline"),
    t("monthToMonthFlexibility"),
    t("bilingualSupport"),
  ];

  return (
    <div className="pb-12">
      <MarketingHero
        eyebrow={t("eyebrowContactChannel")}
        title={
          <>
            {t("contactTitle")}
            <br />
            <span className="text-slate-500">{t("contactSubtitle")}</span>
          </>
        }
        description={t("contactDescription")}
        stats={[
          { label: t("contactStatResponseLabel"), value: t("within24Hours") },
          { label: t("contactStatCoverageLabel"), value: t("contactStatCoverageValue") },
          { label: t("contactStatLanguageLabel"), value: "EN / FR" },
        ]}
      />

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="space-y-8">
              <SectionHeader
                eyebrow={t("eyebrowReachUs")}
                title={t("getInTouch")}
                description={t("scheduleConsultation")}
              />

              <div className="grid gap-4">
                {contactCards.map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <SurfaceCard key={card.title} className="rounded-[28px] p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-slate-950 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">
                            {card.title}
                          </h3>
                          {card.href ? (
                            <a
                              href={card.href}
                              className="mt-3 block whitespace-pre-line text-sm leading-7 text-slate-600 transition-colors hover:text-slate-950"
                            >
                              {card.copy}
                            </a>
                          ) : (
                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                              {card.copy}
                            </p>
                          )}
                        </div>
                      </div>
                    </SurfaceCard>
                  );
                })}
              </div>

              <SurfaceCard className="rounded-[30px] p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {t("whyWorkWithUs")}
                </div>
                <div className="mt-5 grid gap-3">
                  {reasons.map((reason) => (
                    <div
                      key={reason}
                      className="flex items-center gap-3 rounded-[20px] border border-[rgba(16,24,40,0.08)] bg-white/70 px-4 py-3 text-sm leading-7 text-slate-700"
                    >
                      <ShieldCheck className="h-4 w-4 text-[var(--brand-coral)]" />
                      {reason}
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard className="rounded-[30px] p-6">
                <div className="flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-slate-950" />
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {t("serviceFootprint")}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{t("serveClientsNorthAmerica")}</p>
              </SurfaceCard>
            </Reveal>

            <Reveal delay={0.08}>
              <SurfaceCard className="rounded-[34px] p-3">
                <div className="rounded-[28px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-6 text-white">
                  <div className="marketing-chip border-white/10 bg-white/8 text-white/72">
                    {t("strategyForm")}
                  </div>
                  <h2 className="mt-6 font-display text-4xl tracking-[-0.05em]">
                    {t("readyToTransformBusiness")}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-white/72">
                    {t("bookFreeConsultationDiscover")}
                  </p>

                  <div className="mt-6 rounded-[26px] border border-white/12 bg-[#fffaf3] p-2 text-slate-950 shadow-[0_28px_60px_rgba(0,0,0,0.2)]">
                    <MultiStepConsultationForm />
                  </div>
                </div>
              </SurfaceCard>
            </Reveal>
          </div>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowWhatToExpect")}
            title={t("freeConsultationTitle")}
            description={t("freeConsultationDesc")}
            align="center"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              [t("freeConsultationTitle"), t("freeConsultationDesc")],
              [t("customStrategyTitle"), t("customStrategyDesc")],
              [t("ongoingSupportTitle"), t("ongoingSupportDesc")],
            ].map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.08}>
                <SurfaceCard className="h-full rounded-[30px] p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] bg-slate-950 text-white">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-slate-950">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        </MarketingContainer>
      </section>
    </div>
  );
}
