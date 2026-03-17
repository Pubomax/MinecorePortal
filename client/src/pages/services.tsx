import { Link } from "wouter";
import {
  BrainCircuit,
  Cable,
  Cloud,
  Container,
  Database,
  MessageSquareText,
  Phone,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { ConsultationModal } from "@/components/consultation-modal";
import { useLanguage } from "@/hooks/use-language";
import {
  CivicViewProductCard,
  ExecProductCard,
  MarketingContainer,
  MarketingHero,
  OperatorProductCard,
  Reveal,
  SectionHeader,
  SuitePreview,
  SurfaceCard,
} from "@/components/marketing";

export default function Services() {
  const { t } = useLanguage();

  const stackLayers = [
    {
      layer: t("techStackLayerOrchestration"),
      tools: [
        { name: "n8n", icon: Workflow, description: t("n8nDescription"), benefit: t("n8nBenefit") },
        { name: "Make", icon: Cable, description: t("makeDescription"), benefit: t("makeBenefit") },
      ],
    },
    {
      layer: t("techStackLayerIntelligence"),
      tools: [
        { name: "OpenAI", icon: Sparkles, description: t("openAiDescription"), benefit: t("openAiBenefit") },
        { name: "Kommo CRM", icon: Users, description: t("komomCrmDescription"), benefit: t("komomBenefit") },
      ],
    },
    {
      layer: t("techStackLayerCommunication"),
      tools: [
        { name: "Twilio", icon: Phone, description: t("twilioDescription"), benefit: t("twilioBenefit") },
        { name: "WhatsApp API", icon: MessageSquareText, description: t("whatsappApiDescription"), benefit: t("whatsappApiBenefit") },
      ],
    },
    {
      layer: t("techStackLayerInfrastructure"),
      tools: [
        { name: "PostgreSQL", icon: Database, description: t("postgresDescription"), benefit: t("postgresBenefit") },
        { name: "Docker", icon: Container, description: t("dockerDescription"), benefit: t("dockerBenefit") },
        { name: "Vercel", icon: Cloud, description: t("vercelDescription"), benefit: t("vercelBenefit") },
      ],
    },
  ];

  const steps = [
    { number: "01", title: t("step1Title"), description: t("step1Description") },
    { number: "02", title: t("step2Title"), description: t("step2Description") },
    { number: "03", title: t("step3Title"), description: t("step3Description") },
  ];

  return (
    <div className="pb-12">
      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <MarketingHero
        eyebrow={t("eyebrowAiProductsSystems")}
        title={
          <>
            {t("aiProductsHeroTitle")}
            <br />
            <span className="text-slate-500">{t("aiProductsHeroSubtitle")}</span>
          </>
        }
        description={t("aiProductsHeroDescription")}
        primaryAction={
          <ConsultationModal
            triggerText={t("bookFreeConsultation")}
            className="marketing-button-primary h-12 px-6 text-sm font-semibold"
          />
        }
        secondaryAction={
          <Link
            href="/pricing"
            className="marketing-button-secondary inline-flex h-12 items-center justify-center px-6 text-sm font-semibold"
          >
            {t("viewPricingPlans")}
          </Link>
        }
        stats={[
          { label: t("servicesStatProducts"), value: "03" },
          { label: t("servicesStatDeployment"), value: "2-3 " + t("weeksSuffix") },
          { label: t("servicesStatSupport"), value: t("servicesStatSupportValue") },
        ]}
        aside={
          <SuitePreview
            accentLabel={t("servicesSuiteAccent")}
            status={t("servicesSuiteStatus")}
            title={t("servicesSuiteTitle")}
            items={[
              { label: t("servicesSuiteItem1Label"), value: "Exec" },
              { label: t("servicesSuiteItem2Label"), value: "Operator" },
              { label: t("servicesSuiteItem3Label"), value: "CivicView" },
            ]}
          />
        }
      />

      {/* ═══ AI PRODUCTS ═══════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowAiProducts")}
            title={t("aiProductsSectionTitle")}
            description={t("aiProductsSectionDescription")}
            align="center"
          />
          <OperatorProductCard showGuarantee />
          <div className="grid gap-6 md:grid-cols-2">
            <ExecProductCard />
            <CivicViewProductCard />
          </div>
        </MarketingContainer>
      </section>

      {/* ═══ TECH STACK ═══════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader eyebrow={t("eyebrowTechStack")} title={t("ourTechStack")} description={t("techStackDescription")} align="center" />

          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: t("techStackStat1Value"), label: t("techStackStat1Label") },
                { value: t("techStackStat2Value"), label: t("techStackStat2Label") },
                { value: t("techStackStat3Value"), label: t("techStackStat3Label") },
                { value: t("techStackStat4Value"), label: t("techStackStat4Label") },
              ].map((stat) => (
                <SurfaceCard key={stat.label} className="rounded-[22px] p-5 text-center">
                  <div className="font-display text-3xl tracking-[-0.05em] text-slate-950">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
                </SurfaceCard>
              ))}
            </div>
          </Reveal>

          <div className="space-y-6">
            {stackLayers.map((layer, layerIndex) => (
              <Reveal key={layer.layer} delay={layerIndex * 0.06}>
                <SurfaceCard className="rounded-[30px] p-6">
                  <div className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                    {layer.layer}
                  </div>
                  <div className={`grid gap-4 ${layer.tools.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                    {layer.tools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <div key={tool.name} className="marketing-subpanel p-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-slate-950 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
                              <Icon className="h-4 w-4" />
                            </div>
                            <h4 className="font-display text-xl tracking-[-0.03em] text-slate-950">{tool.name}</h4>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
                          <p className="mt-2 text-xs font-semibold text-slate-900">{tool.benefit}</p>
                        </div>
                      );
                    })}
                  </div>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <SurfaceCard className="rounded-[30px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-8 text-white">
              <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <div>
                  <h3 className="font-display text-3xl tracking-[-0.04em]">{t("techStackWhyTitle")}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{t("techStackWhyDescription")}</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/8 p-5">
                  <p className="text-base leading-8 text-white/80 italic">&ldquo;{t("techStackPhilosophy")}&rdquo;</p>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">— Minecore · OpenClaw</div>
                </div>
              </div>
            </SurfaceCard>
          </Reveal>
        </MarketingContainer>
      </section>

      {/* ═══ HOW WE WORK ══════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader eyebrow={t("eyebrowImplementation")} title={t("howWeWork")} description={t("simpleProcessDescription")} align="center" />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <SurfaceCard className="h-full rounded-[30px] p-6">
                  <div className="inline-flex rounded-full bg-[var(--brand-lime)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950">{step.number}</div>
                  <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-slate-950">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        </MarketingContainer>
      </section>

      {/* ═══ CTA ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[34px] p-8 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="marketing-chip">{t("eyebrowServiceFit")}</div>
              <h2 className="mt-6 font-display text-4xl tracking-[-0.05em] text-slate-950 sm:text-5xl">{t("readyToEliminateBottlenecks")}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t("readyToEliminateBottlenecksDesc")}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationModal triggerText={t("bookFreeConsultation")} className="marketing-button-primary h-12 px-6 text-sm font-semibold" />
                <Link href="/pricing" className="marketing-button-secondary inline-flex h-12 items-center justify-center px-6 text-sm font-semibold">{t("pricing")}</Link>
              </div>
            </div>
          </SurfaceCard>
        </MarketingContainer>
      </section>
    </div>
  );
}
