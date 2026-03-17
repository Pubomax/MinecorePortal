import { Link } from "wouter";
import { ShoppingCart, Briefcase, Truck } from "lucide-react";
import { ConsultationModal } from "@/components/consultation-modal";
import { useLanguage } from "@/hooks/use-language";
import {
  MarketingContainer,
  MarketingHero,
  Reveal,
  SectionHeader,
  SurfaceCard,
} from "@/components/marketing";

export default function CaseStudies() {
  const { t } = useLanguage();

  const scenarios = [
    {
      icon: Truck,
      title: t("scenarioLogisticsTitle"),
      industry: t("scenarioLogisticsIndustry"),
      problem: t("scenarioLogisticsProblem"),
      solution: [
        t("scenarioLogisticsSol1"),
        t("scenarioLogisticsSol2"),
        t("scenarioLogisticsSol3"),
      ],
      outcome: t("scenarioLogisticsOutcome"),
    },
    {
      icon: Briefcase,
      title: t("scenarioAgencyTitle"),
      industry: t("scenarioAgencyIndustry"),
      problem: t("scenarioAgencyProblem"),
      solution: [
        t("scenarioAgencySol1"),
        t("scenarioAgencySol2"),
        t("scenarioAgencySol3"),
      ],
      outcome: t("scenarioAgencyOutcome"),
    },
    {
      icon: ShoppingCart,
      title: t("scenarioRetailTitle"),
      industry: t("scenarioRetailIndustry"),
      problem: t("scenarioRetailProblem"),
      solution: [
        t("scenarioRetailSol1"),
        t("scenarioRetailSol2"),
        t("scenarioRetailSol3"),
      ],
      outcome: t("scenarioRetailOutcome"),
    },
  ];

  return (
    <div className="pb-12">
      <MarketingHero
        eyebrow={t("eyebrowUseCases")}
        title={
          <>
            {t("useCasesTitle")}
            <br />
            <span className="text-slate-500">{t("useCasesSubtitle")}</span>
          </>
        }
        description={t("useCasesDescription")}
        primaryAction={
          <ConsultationModal
            triggerText={t("bookFreeConsultation")}
            className="marketing-button-primary h-12 px-6 text-sm font-semibold"
          />
        }
        stats={[
          { label: t("scenariosLabel"), value: "03" },
          { label: t("deploymentLabel"), value: "2-3 weeks" },
          { label: t("modelLabel"), value: t("modelValue") },
        ]}
      />

      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowScenarios")}
            title={t("scenariosSectionTitle")}
            description={t("scenariosSectionDesc")}
            align="center"
          />

          <div className="grid gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Reveal key={scenario.title} delay={index * 0.06}>
                  <SurfaceCard className="overflow-hidden rounded-[36px] p-6 sm:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-slate-950 text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="font-display text-3xl tracking-[-0.05em] text-slate-950 sm:text-4xl">
                            {scenario.title}
                          </h2>
                          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-500">
                            {scenario.industry}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <div className="marketing-subpanel p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          {t("theProblem")}
                        </div>
                        <p className="mt-4 text-sm leading-7 text-slate-700">
                          {scenario.problem}
                        </p>
                      </div>

                      <div className="marketing-subpanel p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          {t("whatWeBuild")}
                        </div>
                        <div className="mt-4 grid gap-3">
                          {scenario.solution.map((item) => (
                            <div key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                              <span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand-lime)]" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[22px] bg-slate-950 px-5 py-4 text-sm leading-7 text-white/80">
                      <span className="font-semibold text-white">{t("expectedOutcome")}:</span> {scenario.outcome}
                    </div>
                  </SurfaceCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <SurfaceCard className="rounded-[28px] border-2 border-dashed border-slate-200 bg-transparent p-6 text-center">
              <p className="text-sm leading-7 text-slate-500">
                {t("earlyStageDisclaimer")}
              </p>
            </SurfaceCard>
          </Reveal>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] p-8 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="marketing-chip">{t("eyebrowNextStep")}</div>
              <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] text-slate-950 sm:text-5xl">
                {t("useCasesCtaTitle")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {t("useCasesCtaDesc")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationModal
                  triggerText={t("bookFreeConsultation")}
                  className="marketing-button-primary h-12 px-6 text-sm font-semibold"
                />
                <Link
                  href="/contact"
                  className="marketing-button-secondary inline-flex h-12 items-center justify-center px-6 text-sm font-semibold"
                >
                  {t("contact")}
                </Link>
              </div>
            </div>
          </SurfaceCard>
        </MarketingContainer>
      </section>
    </div>
  );
}
