import { Link } from "wouter";
import { Bot, Cable, MessageSquareText, Phone, Users, Workflow } from "lucide-react";
import { ConsultationModal } from "@/components/consultation-modal";
import { useLanguage } from "@/hooks/use-language";
import {
  ChatMockup,
  FeatureItem,
  MarketingContainer,
  MarketingHero,
  Reveal,
  SectionHeader,
  SurfaceCard,
} from "@/components/marketing";

export default function ServiceOperator() {
  const { t } = useLanguage();

  const features = [
    { icon: Phone, title: t("operatorLandingFeature1Title"), desc: t("operatorLandingFeature1Desc") },
    { icon: MessageSquareText, title: t("operatorLandingFeature2Title"), desc: t("operatorLandingFeature2Desc") },
    { icon: Users, title: t("operatorLandingFeature3Title"), desc: t("operatorLandingFeature3Desc") },
    { icon: Workflow, title: t("operatorLandingFeature4Title"), desc: t("operatorLandingFeature4Desc") },
  ];

  return (
    <div className="pb-12">
      <MarketingHero
        eyebrow={t("productOperatorBadge")}
        title={
          <>
            {t("productOperatorName")}
            <br />
            <span className="text-slate-500">{t("productOperatorTagline")}</span>
          </>
        }
        description={t("productOperatorDescription")}
        primaryAction={
          <ConsultationModal
            triggerText={t("productOperatorCta")}
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
          { label: t("operatorLandingStatChannels"), value: t("operatorLandingStatChannelsValue") },
          { label: t("servicesStatDeployment"), value: "2-3 " + t("weeksSuffix") },
          { label: t("commitmentLabel"), value: t("commitmentValue") },
        ]}
        aside={<ChatMockup />}
      />

      {/* Features */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("operatorLandingFeaturesEyebrow")}
            title={t("operatorLandingFeaturesTitle")}
            description={t("operatorLandingFeaturesDesc")}
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

      {/* What's included */}
      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-8 text-white">
            <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <div className="marketing-chip border-white/10 bg-white/8 text-white/72">
                  {t("operatorLandingIncludedBadge")}
                </div>
                <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] sm:text-5xl">
                  {t("operatorLandingIncludedTitle")}
                </h2>
                <div className="mt-6 space-y-3">
                  {[t("productOperatorFeature1"), t("productOperatorFeature2"), t("productOperatorFeature3"), t("productOperatorFeature4")].map((f) => (
                    <div key={f} className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/82">
                      <Bot className="h-4 w-4 text-[var(--brand-lime)]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [t("productOperatorPricing"), t("operatorLandingMonthlyLabel")],
                  [t("productOperatorSetup"), t("operatorLandingSetupLabel")],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[24px] border border-white/10 bg-white/8 p-5 text-center">
                    <div className="font-display text-2xl tracking-[-0.04em]">{value}</div>
                    <div className="mt-2 text-sm text-white/70">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>
        </MarketingContainer>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] p-8 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="marketing-chip">{t("eyebrowServiceFit")}</div>
              <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] text-slate-950 sm:text-5xl">
                {t("operatorLandingCtaTitle")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t("operatorLandingCtaDesc")}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationModal
                  triggerText={t("productOperatorCta")}
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
