import { Link } from "wouter";
import { ConsultationModal } from "@/components/consultation-modal";
import { useLanguage } from "@/hooks/use-language";
import {
  MarketingContainer,
  MarketingHero,
  Reveal,
  SectionHeader,
  SurfaceCard,
} from "@/components/marketing";

export default function Pricing() {
  const { t } = useLanguage();

  const faqs = [
    [t("howQuicklyResults"), t("resultsAnswer")],
    [t("replaceToolsQuestion"), t("replaceToolsAnswer")],
    [t("businessUniqueQuestion"), t("businessUniqueAnswer")],
    [t("cancelAnytimeQuestion"), t("cancelAnytimeAnswer")],
    [t("dataSecurityQuestion"), t("dataSecurityAnswer")],
  ];

  return (
    <div className="pb-12">
      <MarketingHero
        eyebrow={t("eyebrowPricingArchitecture")}
        title={
          <>
            {t("pricingCustomOnlyTitle")}
            <br />
            <span className="text-slate-500">{t("pricingCustomOnlySubtitle")}</span>
          </>
        }
        description={t("pricingCustomOnlyDesc")}
        primaryAction={
          <ConsultationModal
            triggerText={t("bookFreeConsultation")}
            className="marketing-button-primary h-12 px-6 text-sm font-semibold"
          />
        }
        secondaryAction={
          <Link
            href="/contact"
            className="marketing-button-secondary inline-flex h-12 items-center justify-center px-6 text-sm font-semibold"
          >
            {t("contact")}
          </Link>
        }
        stats={[
          { label: t("commitmentLabel"), value: t("commitmentValue") },
          { label: t("deploymentLabel"), value: "2-3 weeks" },
          { label: t("pricingModelLabel"), value: t("pricingModelValue") },
        ]}
      />

      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowHowItWorks")}
            title={t("pricingProcessTitle")}
            description={t("pricingProcessDesc")}
            align="center"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: t("pricingStep1Title"), desc: t("pricingStep1Desc") },
              { step: "02", title: t("pricingStep2Title"), desc: t("pricingStep2Desc") },
              { step: "03", title: t("pricingStep3Title"), desc: t("pricingStep3Desc") },
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 0.08}>
                <SurfaceCard className="h-full rounded-[30px] p-6">
                  <div className="inline-flex rounded-full bg-[var(--brand-lime)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950">
                    {item.step}
                  </div>
                  <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.desc}</p>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-8 text-white">
            <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <div className="marketing-chip border-white/10 bg-white/8 text-white/72">
                  {t("pricingCommitmentBadge")}
                </div>
                <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] sm:text-5xl">
                  {t("pricingCommitmentTitle")}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["2-3", t("weeksToLaunch")],
                  ["90", t("dayGuaranteeLabel")],
                  ["0", t("longTermContracts")],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[24px] border border-white/10 bg-white/8 p-5 text-center">
                    <div className="font-display text-4xl tracking-[-0.05em]">{value}</div>
                    <div className="mt-2 text-sm text-white/70">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowFaq")}
            title={t("frequentlyAskedQuestions")}
            description={t("noSalesPressure")}
            align="center"
          />
          <div className="mx-auto grid max-w-4xl gap-4">
            {faqs.map(([question, answer], index) => (
              <Reveal key={question} delay={index * 0.05}>
                <SurfaceCard className="rounded-[28px] p-6">
                  <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">{question}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{answer}</p>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] p-8 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="marketing-chip">{t("eyebrowPricingFit")}</div>
              <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] text-slate-950 sm:text-5xl">
                {t("pricingCtaTitle")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t("pricingCtaDesc")}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationModal
                  triggerText={t("bookFreeConsultation")}
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
