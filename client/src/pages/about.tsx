import { Link } from "wouter";
import { Globe2, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/consultation-modal";
import { useLanguage } from "@/hooks/use-language";
import {
  MarketingContainer,
  MarketingHero,
  Reveal,
  SectionHeader,
  SuitePreview,
  SurfaceCard,
} from "@/components/marketing";

export default function About() {
  const { t } = useLanguage();

  const principles = [
    {
      title: t("identify"),
      description: t("identifyDescription"),
    },
    {
      title: t("implement"),
      description: t("implementDescription"),
    },
    {
      title: t("optimize"),
      description: t("optimizeDescription"),
    },
  ];

  const values = [
    {
      title: t("authenticity"),
      description: t("authenticityDescription"),
    },
    {
      title: t("speed"),
      description: t("speedDescription"),
    },
    {
      title: t("partnership"),
      description: t("partnershipDescription"),
    },
    {
      title: t("results"),
      description: t("resultsDescription"),
    },
  ];

  return (
    <div className="pb-12">
      <MarketingHero
        eyebrow={t("eyebrowAbout")}
        title={
          <>
            {t("aboutTitle")}
            <br />
            <span className="text-slate-500">{t("aboutSubtitle")}</span>
          </>
        }
        description={t("aboutDescription")}
        primaryAction={
          <ConsultationModal
            triggerText={t("workWithUs")}
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
          { label: t("aboutStatFoundedLabel"), value: "2024" },
          { label: t("aboutStatDeliveryLabel"), value: t("aboutStatDeliveryValue") },
          { label: t("aboutStatSupportLabel"), value: "FR / EN" },
        ]}
        aside={
          <SuitePreview
            accentLabel={t("aboutSuiteAccent")}
            status={t("aboutSuiteStatus")}
            title={t("aboutSuiteTitle")}
            items={[
              { label: t("aboutSuiteItem1Label"), value: "70%" },
              { label: t("aboutSuiteItem2Label"), value: "40%" },
              { label: t("aboutSuiteItem3Label"), value: "2-3 " + t("weeksSuffix") },
            ]}
          />
        }
      />

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <div className="grid gap-10 lg:grid-cols-[1fr_.95fr] lg:items-center">
            <Reveal className="space-y-8">
              <SectionHeader
                eyebrow={t("eyebrowOrigin")}
                title={t("fromBurnoutBreakthrough")}
                description={t("foundedIn2024")}
              />

              <SurfaceCard className="rounded-[30px] p-6">
                <p className="text-base leading-8 text-slate-600">{t("despiteGrowingRevenue")}</p>
                <div className="marketing-subpanel mt-6 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {t("turningPoint")}
                  </div>
                  <p className="mt-4 text-lg leading-8 text-slate-800">"{t("turningPointQuote")}"</p>
                </div>
              </SurfaceCard>
            </Reveal>

            <Reveal delay={0.08}>
              <SurfaceCard className="overflow-hidden rounded-[34px] p-3">
                <div className="rounded-[28px] bg-[linear-gradient(135deg,#13213a,#101828)] p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="marketing-chip border-white/10 bg-white/8 text-white/70">
                      {t("founderLabel")}
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                      Laval, QC
                    </div>
                  </div>
                  <div className="mt-6 rounded-[24px] border border-white/10 bg-white/6 p-6">
                    <div className="font-display text-3xl tracking-[-0.04em]">Thierry Bijou</div>
                    <p className="mt-3 text-sm leading-7 text-white/60">{t("founderBio")}</p>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-white/8 p-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-white/60">
                        {t("founderStat1Label")}
                      </div>
                      <div className="mt-3 font-display text-4xl tracking-[-0.05em]">2024</div>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/8 p-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-white/60">
                        {t("founderStat2Label")}
                      </div>
                      <div className="mt-3 font-display text-4xl tracking-[-0.05em]">FR / EN</div>
                    </div>
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
            eyebrow={t("eyebrowOperatingProof")}
            title={t("ourPersonalTransformation")}
            description={t("helpFellowEntrepreneurs")}
            align="center"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ["70%", t("weeklyWorkloadReduction"), t("from80HoursTo25")],
              ["40%", t("revenueIncrease"), t("workingLessEarningMore")],
              ["2-3", t("weeksToImplement"), t("quickWinsCompound")],
            ].map(([value, label, copy], index) => (
              <Reveal key={label} delay={index * 0.08}>
                <SurfaceCard className="h-full rounded-[30px] p-6">
                  <div className="font-display text-6xl tracking-[-0.06em] text-slate-950">{value}</div>
                  <div className="mt-4 text-base font-semibold text-slate-900">{label}</div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <Reveal className="space-y-8">
              <SectionHeader
                eyebrow={t("eyebrowMission")}
                title={t("ourMission")}
                description={t("helpFellowEntrepreneurs")}
              />

              <SurfaceCard className="rounded-[30px] p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {t("whyWereDifferent")}
                </div>
                <div className="mt-5 grid gap-3">
                  {[
                    t("entrepreneurToEntrepreneur"),
                    t("provenResults"),
                    t("noCorporateBs"),
                    t("fastImplementation"),
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-[22px] border border-[rgba(16,24,40,0.08)] bg-white/70 px-4 py-3 text-sm font-medium text-slate-700"
                    >
                      <Sparkles className="h-4 w-4 text-[var(--brand-coral)]" />
                      {point}
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.08}>
                  <SurfaceCard className="rounded-[28px] p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      0{index + 1}
                    </div>
                    <h3 className="mt-4 font-display text-3xl tracking-[-0.04em] text-slate-950">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{principle.description}</p>
                  </SurfaceCard>
                </Reveal>
              ))}
            </div>
          </div>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <div className="grid gap-10 lg:grid-cols-[1fr_.95fr] lg:items-start">
            <Reveal className="space-y-8">
              <SectionHeader
                eyebrow={t("eyebrowLocation")}
                title={t("proudlyMontrealBased")}
                description={t("locatedInLaval")}
              />

              <SurfaceCard className="rounded-[30px] p-6">
                <div className="grid gap-4 text-sm leading-7 text-slate-600">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-slate-950" />
                    1655 Rue du Grand Pic, Laval, QC H7P 0K8
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe2 className="h-4 w-4 text-slate-950" />
                    {t("servingClientsNorthAmerica")}
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-slate-950" />
                    {t("bilingualService")}
                  </div>
                </div>
              </SurfaceCard>
            </Reveal>

            <Reveal delay={0.08}>
              <SurfaceCard className="rounded-[34px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-6 text-white">
                <div className="marketing-chip border-white/10 bg-white/8 text-white/72">
                  {t("ourValues")}
                </div>
                <div className="mt-6 grid gap-4">
                  {values.map((value) => (
                    <div key={value.title} className="rounded-[22px] border border-white/10 bg-white/8 p-4">
                      <div className="font-display text-2xl tracking-[-0.04em]">{value.title}</div>
                      <p className="mt-2 text-sm leading-7 text-white/72">{value.description}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </Reveal>
          </div>
        </MarketingContainer>
      </section>

      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] p-8 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="marketing-chip">{t("eyebrowNextStep")}</div>
              <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] text-slate-950 sm:text-5xl">
                {t("readyForBreakthrough")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t("entrepreneurToEntrepreneurTalk")}</p>
              <Link href="/contact">
                <Button className="marketing-button-primary mt-8 h-12 px-6 text-sm font-semibold">
                  {t("bookFreeConsultation")}
                </Button>
              </Link>
            </div>
          </SurfaceCard>
        </MarketingContainer>
      </section>
    </div>
  );
}
