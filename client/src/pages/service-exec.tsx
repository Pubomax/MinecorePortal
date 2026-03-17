import { Link } from "wouter";
import { BrainCircuit, FileText, Shield, Sparkles } from "lucide-react";
import { ConsultationModal } from "@/components/consultation-modal";
import { useLanguage } from "@/hooks/use-language";
import {
  FeatureItem,
  MarketingContainer,
  MarketingHero,
  Reveal,
  SectionHeader,
  SurfaceCard,
} from "@/components/marketing";

export default function ServiceExec() {
  const { t } = useLanguage();

  const features = [
    { icon: BrainCircuit, title: t("execLandingFeature1Title"), desc: t("execLandingFeature1Desc") },
    { icon: FileText, title: t("execLandingFeature2Title"), desc: t("execLandingFeature2Desc") },
    { icon: Shield, title: t("execLandingFeature3Title"), desc: t("execLandingFeature3Desc") },
    { icon: Sparkles, title: t("execLandingFeature4Title"), desc: t("execLandingFeature4Desc") },
  ];

  return (
    <div className="pb-12">
      <MarketingHero
        eyebrow={t("productExecBadge")}
        title={
          <>
            {t("productExecName")}
            <br />
            <span className="text-slate-500">{t("productExecTagline")}</span>
          </>
        }
        description={t("productExecDescription")}
        primaryAction={
          <ConsultationModal
            triggerText={t("productExecCta")}
            className="marketing-button-primary h-12 px-6 text-sm font-semibold"
          />
        }
        secondaryAction={
          <Link
            href="/pricing"
            className="marketing-button-secondary inline-flex h-12 items-center justify-center px-6 text-sm font-semibold"
          >
            {t("pricing")}
          </Link>
        }
        stats={[
          { label: t("execLandingStatType"), value: t("execLandingStatTypeValue") },
          { label: t("servicesStatDeployment"), value: "1-2 " + t("weeksSuffix") },
          { label: t("commitmentLabel"), value: t("commitmentValue") },
        ]}
      />

      {/* Features */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("execLandingFeaturesEyebrow")}
            title={t("execLandingFeaturesTitle")}
            description={t("execLandingFeaturesDesc")}
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 0.08}>
                  <SurfaceCard className="h-full rounded-[30px] p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-slate-950 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{feature.desc}</p>
                  </SurfaceCard>
                </Reveal>
              );
            })}
          </div>
        </MarketingContainer>
      </section>

      {/* Who it's for */}
      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <div className="grid gap-10 lg:grid-cols-[1fr_.95fr] lg:items-center">
            <Reveal className="space-y-6">
              <SectionHeader
                eyebrow={t("execLandingWhoEyebrow")}
                title={t("execLandingWhoTitle")}
                description={t("execLandingWhoDesc")}
              />
              <div className="grid gap-3">
                {[t("execLandingWho1"), t("execLandingWho2"), t("execLandingWho3")].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[22px] border border-[rgba(16,24,40,0.08)] bg-white/70 px-4 py-3 text-sm font-medium text-slate-700">
                    <Sparkles className="h-4 w-4 text-[var(--brand-coral)]" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <SurfaceCard className="rounded-[34px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-6 text-white">
                <div className="marketing-chip border-white/10 bg-white/8 text-white/72">
                  {t("execLandingPricingBadge")}
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-[22px] border border-white/10 bg-white/8 p-5">
                    <div className="font-display text-3xl tracking-[-0.04em]">{t("productExecPricing")}</div>
                    <div className="mt-2 text-sm text-white/70">{t("execLandingMonthlyLabel")}</div>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/8 p-5">
                    <div className="font-display text-3xl tracking-[-0.04em]">{t("productExecSetup")}</div>
                    <div className="mt-2 text-sm text-white/70">{t("execLandingSetupLabel")}</div>
                  </div>
                </div>
                <ConsultationModal
                  triggerText={t("productExecCta")}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition-all hover:bg-white/90"
                />
              </SurfaceCard>
            </Reveal>
          </div>
        </MarketingContainer>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] p-8 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="marketing-chip">{t("eyebrowServiceFit")}</div>
              <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] text-slate-950 sm:text-5xl">
                {t("execLandingCtaTitle")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t("execLandingCtaDesc")}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationModal
                  triggerText={t("productExecCta")}
                  className="marketing-button-primary h-12 px-6 text-sm font-semibold"
                />
              </div>
              <p className="mt-4 text-sm text-slate-500">{t("noSalesPressure")}</p>
            </div>
          </SurfaceCard>
        </MarketingContainer>
      </section>
    </div>
  );
}
