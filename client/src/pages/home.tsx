import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Cable,
  Cloud,
  Container,
  Database,
  MessageSquareText,
  Phone,
  PhoneCall,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { ConsultationModal } from "@/components/consultation-modal";
import { MultiStepConsultationForm } from "@/components/multi-step-consultation-form";
import {
  ChatMockup,
  CivicViewProductCard,
  ExecProductCard,
  FeatureItem,
  MarketingContainer,
  MarketingHero,
  OperatorProductCard,
  Reveal,
  SectionHeader,
  SuitePreview,
  SurfaceCard,
  WindowChrome,
} from "@/components/marketing";

export default function Home() {
  const { t } = useLanguage();

  const problems = [
    {
      icon: MessageSquareText,
      title: t("customerSupportTrap"),
      description: t("customerSupportProblem"),
      bullets: [t("aiChatbotsHandle"), t("smartEmailAutomation"), t("intelligentCallRouting")],
      result: t("resultSave25Hours"),
      accent: "from-[#fff1d8] to-[#ffe6b8]",
    },
    {
      icon: Users,
      title: t("revenueCeiling"),
      description: t("revenueCeilingProblem"),
      bullets: [t("automatedLeadResearchSol"), t("smartFollowUpSequences"), t("crmThatWorks")],
      result: t("resultRevenueIncrease"),
      accent: "from-[#ddf7ff] to-[#c3ecff]",
    },
    {
      icon: Workflow,
      title: t("operationalChaos"),
      description: t("operationalChaosProblem"),
      bullets: [t("automatedReportingSol"), t("intelligentTaskMgmt"), t("resourceOptimizationSol")],
      result: t("result50PercentEfficiency"),
      accent: "from-[#eaf4d7] to-[#d5eea5]",
    },
  ];

  const modules = [
    { icon: Bot, name: t("chatbotModule"), description: t("chatbotModuleDescription"), label: "01" },
    { icon: PhoneCall, name: t("voicebotModule"), description: t("voicebotModuleDescription"), label: "02" },
    { icon: Users, name: t("crmModule"), description: t("crmModuleDescription"), label: "03" },
    { icon: Cable, name: t("automationsModule"), description: t("automationsModuleDescription"), label: "04" },
  ];

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

  return (
    <div className="pb-12">
      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <MarketingHero
        eyebrow={t("openclawBadge")}
        title={
          <>
            {t("openclawHeroTitle1")}
            <br />
            <span className="text-slate-500">{t("openclawHeroTitle2")}</span>
          </>
        }
        description={t("openclawHeroSubtitle")}
        primaryAction={
          <ConsultationModal
            triggerText={t("openclawPrimaryCta")}
            className="marketing-button-primary h-12 px-6 text-sm font-semibold"
          />
        }
        secondaryAction={
          <Link
            href="/services"
            className="marketing-button-secondary inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-semibold"
          >
            {t("openclawSecondaryCta")}
          </Link>
        }
        stats={[
          { label: t("pricingModelLabel"), value: t("pricingModelValue") },
          { label: t("commitmentLabel"), value: t("commitmentValue") },
          { label: t("launchSpeed"), value: "2-3 " + t("weeksSuffix") },
        ]}
        aside={
          <SuitePreview
            accentLabel={t("suitePreviewAccentLabel")}
            status={t("suitePreviewStatus")}
            title={t("suitePreviewTitle")}
            items={[
              { label: t("suitePreviewItem1Label"), value: t("suitePreviewItem1Value") },
              { label: t("suitePreviewItem2Label"), value: t("suitePreviewItem2Value") },
              { label: t("suitePreviewItem3Label"), value: t("suitePreviewItem3Value") },
            ]}
          />
        }
      />

      {/* ═══ PRODUCT SUITE CARDS ════════════════════════════ */}
      <MarketingContainer className="pb-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Link href="/services">
              <SurfaceCard className="group cursor-pointer rounded-[30px] p-6 transition-all hover:shadow-[0_32px_80px_rgba(15,23,42,0.16)]">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{t("aiSystemSupportLabel")}</div>
                <h3 className="mt-4 font-display text-3xl tracking-[-0.04em] text-slate-950">
                  {t("aiSystemSupportTitle1")}<br />{t("aiSystemSupportTitle2")}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t("aiSystemSupportDesc")}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-slate-950">
                  {t("openclawSecondaryCta")} <ArrowRight className="h-4 w-4" />
                </div>
              </SurfaceCard>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/services">
              <SurfaceCard className="group cursor-pointer rounded-[30px] p-6 transition-all hover:shadow-[0_32px_80px_rgba(15,23,42,0.16)]">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{t("morpheusSuiteLabel")}</div>
                <h3 className="mt-4 font-display text-3xl tracking-[-0.04em] text-slate-950">
                  {t("morpheusSuiteTitle1")}<br />{t("morpheusSuiteTitle2")}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t("morpheusSuiteDesc")}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-slate-950">
                  {t("exploreMorpheus")} <ArrowRight className="h-4 w-4" />
                </div>
              </SurfaceCard>
            </Link>
          </Reveal>
        </div>
      </MarketingContainer>

      {/* ═══ EARLY-STAGE TRUST BAR ═══════════════════════ */}
      <MarketingContainer className="pb-8">
        <Reveal>
          <SurfaceCard className="rounded-[32px] px-6 py-5 text-center">
            <p className="text-sm leading-7 text-slate-500">
              {t("earlyStageDisclaimer")}
            </p>
          </SurfaceCard>
        </Reveal>
      </MarketingContainer>

      {/* ═══ PROBLEMS ══════════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowSystemBottlenecks")}
            title={t("threeProblemsKilling")}
            description={t("problemNarrative")}
            align="center"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Reveal key={problem.title} delay={index * 0.08}>
                  <SurfaceCard className="h-full rounded-[30px] p-6">
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br ${problem.accent} text-slate-950 shadow-[0_18px_30px_rgba(15,23,42,0.08)]`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-6 space-y-4">
                      <h3 className="font-display text-3xl tracking-[-0.04em] text-slate-950">{problem.title}</h3>
                      <p className="text-base leading-8 text-slate-600">{problem.description}</p>
                    </div>
                    <div className="marketing-subpanel mt-6 p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{t("ourSolution")}</div>
                      <div className="mt-4 space-y-3">
                        {problem.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                            <span className="mt-2 h-2 w-2 rounded-full bg-slate-950" />
                            {bullet}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">{problem.result}</div>
                    </div>
                  </SurfaceCard>
                </Reveal>
              );
            })}
          </div>
        </MarketingContainer>
      </section>

      {/* ═══ AI PRODUCTS ═══════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowAiProducts")}
            title={t("aiProductsSectionTitle")}
            description={t("aiProductsSectionDescription")}
            align="center"
          />
          <OperatorProductCard />
          <div className="grid gap-6 md:grid-cols-2">
            <ExecProductCard />
            <CivicViewProductCard />
          </div>
        </MarketingContainer>
      </section>

      {/* ═══ WHAT YOU GET ═══════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowWhatYouGet")}
            title={t("whatYouGetTitle")}
            description={t("whatYouGetDesc")}
            align="center"
          />
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { value: "2-3", suffix: t("weeksSuffix"), label: t("whatYouGetMetric1") },
                { value: "90", suffix: t("daysSuffix"), label: t("whatYouGetMetric2") },
                { value: "0", suffix: "", label: t("whatYouGetMetric3") },
              ].map((m) => (
                <SurfaceCard key={m.label} className="rounded-[28px] p-8 text-center">
                  <div className="font-display text-6xl tracking-[-0.06em] text-slate-950">
                    {m.value}<span className="text-3xl text-slate-400">{m.suffix}</span>
                  </div>
                  <div className="mt-3 text-sm text-slate-500">{m.label}</div>
                </SurfaceCard>
              ))}
            </div>
          </Reveal>
        </MarketingContainer>
      </section>

      {/* ═══ DARK BANNER ══════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[36px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-8 text-center text-white sm:p-12">
            <Reveal>
              <div className="mx-auto max-w-3xl space-y-6">
                <div className="marketing-chip border-white/12 bg-white/8 text-white/72">{t("eyebrowOneAiLayer")}</div>
                <h2 className="font-display text-4xl leading-[0.96] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  {t("darkBannerTitle")}
                </h2>
                <p className="mx-auto max-w-xl text-lg leading-8 text-white/60">
                  {t("darkBannerDescription")}
                </p>
                <ConsultationModal
                  triggerText={t("openclawPrimaryCta")}
                  className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition-all hover:bg-white/90"
                />
              </div>
            </Reveal>
          </SurfaceCard>
        </MarketingContainer>
      </section>

      {/* ═══ PLATFORM VISUALS ═════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader
            eyebrow={t("eyebrowPlatformInAction")}
            title={t("platformInAction")}
            description={t("platformInActionSubtitle")}
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {/* Chatbot UI */}
            <Reveal>
              <SurfaceCard className="overflow-hidden rounded-[28px] p-0">
                <div className="bg-[linear-gradient(180deg,rgba(20,32,58,0.96),rgba(7,12,24,0.96))] p-5 text-white">
                  <WindowChrome label="Clawbot · OpenClaw Chat" />
                  <div className="mb-4 space-y-2.5">
                    <div className="flex justify-end">
                      <div className="max-w-[75%] rounded-xl rounded-tr-sm bg-white px-3 py-2 text-xs text-slate-950">Bonjour, comment puis-je obtenir un devis rapidement ?</div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10"><Bot className="h-3 w-3 text-white/50" /></div>
                      <div className="max-w-[75%] rounded-xl rounded-tl-sm bg-white/10 px-3 py-2 text-xs text-white/80">Bonjour ! Je suis Clawbot. Puis-je vous guider vers le bon forfait ?</div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10"><Bot className="h-3 w-3 text-white/50" /></div>
                      <div className="max-w-[75%] rounded-xl rounded-tl-sm bg-white/10 px-3 py-2 text-xs text-white/70">J'ai qualifié votre demande et créé un ticket dans Kommo CRM. ✓</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-lime)]" />
                      <span className="text-[10px] text-[var(--brand-lime)]">En ligne · 1.4s</span>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/25">OpenClaw</span>
                  </div>
                </div>
              </SurfaceCard>
            </Reveal>

            {/* Workflow UI */}
            <Reveal delay={0.08}>
              <SurfaceCard className="overflow-hidden rounded-[28px] p-0">
                <div className="bg-[linear-gradient(180deg,rgba(20,32,58,0.96),rgba(7,12,24,0.96))] p-5 text-white">
                  <WindowChrome label="BotClaw · n8n" />
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-white/30">Lead → Client Pipeline</span>
                    <span className="text-[10px] font-medium text-[var(--brand-lime)]">● Active</span>
                  </div>
                  <div className="mb-4 flex items-center gap-1 overflow-x-auto pb-2">
                    {["Email", "IA", "CRM", "Alerte", "RDV"].map((label, i) => (
                      <div key={label} className="flex items-center gap-1 flex-shrink-0">
                        <div className="text-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.06] mb-1">
                            <Workflow className="h-4 w-4 text-white/50" />
                          </div>
                          <div className="text-[9px] text-white/25">{label}</div>
                        </div>
                        {i < 4 && <div className="mx-0.5 mb-3 text-sm text-white/15">›</div>}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-[var(--brand-lime)]/15 bg-[var(--brand-lime)]/10 px-3 py-2 text-[10px] text-[var(--brand-lime)]">
                    ✓ 347 runs today · 0 errors · 4.2 hrs saved
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-[10px] text-white/20">n8n + OpenClaw</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/25">BotClaw</span>
                  </div>
                </div>
              </SurfaceCard>
            </Reveal>

            {/* CRM UI */}
            <Reveal delay={0.12}>
              <SurfaceCard className="overflow-hidden rounded-[28px] p-0">
                <div className="bg-[linear-gradient(180deg,rgba(20,32,58,0.96),rgba(7,12,24,0.96))] p-5 text-white">
                  <WindowChrome label="Kommo CRM" />
                  <div className="mb-4 grid grid-cols-3 gap-2.5">
                    {[
                      { stage: "New", count: 3, value: "3 leads" },
                      { stage: "Qualifying", count: 3, value: "3 leads" },
                      { stage: "Won ✓", count: 3, value: "3 leads" },
                    ].map((col) => (
                      <div key={col.stage}>
                        <div className="mb-2 text-[10px] text-white/25">{col.stage}</div>
                        {[...Array(col.count)].map((_, i) => (
                          <div key={i} className="mb-1 rounded-md border border-white/[0.05] bg-white/[0.04] p-1.5">
                            <div className="mb-1 h-1 w-full rounded bg-white/15" />
                            <div className="h-1 w-2/3 rounded bg-white/[0.08]" />
                          </div>
                        ))}
                        <div className="mt-1.5 text-[10px] font-medium text-white/50">{col.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-[10px] text-white/20">Zero lost prospects</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/25">Revenue Ops</span>
                  </div>
                </div>
              </SurfaceCard>
            </Reveal>

            {/* Voicebot UI */}
            <Reveal delay={0.16}>
              <SurfaceCard className="overflow-hidden rounded-[28px] p-0">
                <div className="bg-[linear-gradient(180deg,rgba(20,32,58,0.96),rgba(7,12,24,0.96))] p-5 text-white">
                  <WindowChrome label="Morpheus · Voicebot" />
                  <div className="mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/45">Calls intercepted / day</span>
                      <span className="text-sm font-semibold">247</span>
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[10px] text-white/30">Auto-qualification rate</span>
                        <span className="text-[10px] text-white/50">87%</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.08]">
                        <motion.div
                          className="h-1 rounded-full bg-white"
                          initial={{ width: 0 }}
                          whileInView={{ width: "87%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 text-center">
                        <div className="text-xl font-semibold text-[var(--brand-lime)]">&lt;2s</div>
                        <div className="mt-0.5 text-[10px] text-white/30">Response</div>
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-3 text-center">
                        <div className="text-xl font-semibold text-[var(--brand-lime)]">24/7</div>
                        <div className="mt-0.5 text-[10px] text-white/30">Uptime</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-lime)]" />
                      <span className="text-[10px] text-[var(--brand-lime)]">Zero missed calls</span>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/25">Morpheus</span>
                  </div>
                </div>
              </SurfaceCard>
            </Reveal>
          </div>
        </MarketingContainer>
      </section>

      {/* ═══ MODULES ══════════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader eyebrow={t("eyebrowModularSystem")} title={t("ourModules")} description={t("standardizedModulesDescription")} align="center" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Reveal key={module.name} delay={index * 0.06}>
                  <SurfaceCard className="h-full rounded-[30px] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-slate-950 text-white"><Icon className="h-5 w-5" /></div>
                      <div className="rounded-full bg-[var(--brand-lime)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950">{module.label}</div>
                    </div>
                    <h3 className="mt-6 font-display text-3xl tracking-[-0.04em] text-slate-950">{module.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{module.description}</p>
                    <div className="mt-8 flex items-center justify-between border-t border-[rgba(16,24,40,0.08)] pt-5 text-sm font-semibold text-slate-500">
                      <span>{t("alwaysConnected")}</span>
                      <span className="text-slate-950">{t("readyToDeploy")}</span>
                    </div>
                  </SurfaceCard>
                </Reveal>
              );
            })}
          </div>
        </MarketingContainer>
      </section>

      {/* ═══ TECH STACK ═══════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer className="space-y-10">
          <SectionHeader eyebrow={t("eyebrowStackDesign")} title={t("ourTechStack")} description={t("techStackDescription")} align="center" />

          {/* Stats bar */}
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

          {/* Stack layers */}
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

          {/* Philosophy banner */}
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

      {/* ═══ CTA ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <MarketingContainer>
          <SurfaceCard className="rounded-[36px] p-4 sm:p-5">
            <div className="grid gap-8 rounded-[30px] bg-[linear-gradient(135deg,#111b2d,#1f365b)] p-6 text-white sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
              <div className="space-y-6">
                <div className="marketing-chip border-white/12 bg-white/8 text-white/72">{t("eyebrowRoadmapSession")}</div>
                <h2 className="font-display text-4xl leading-[0.96] tracking-[-0.05em] sm:text-5xl">{t("readyToCutWorkload")}</h2>
                <p className="max-w-xl text-lg leading-8 text-white/74">{t("freeConsultationText")}</p>
                <div className="grid gap-3">
                  {[t("identifyTimeWasters"), t("getCustomRoadmap"), t("noCommitmentRequired")].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/7 px-4 py-3 text-sm text-white/82">
                      <BarChart3 className="h-4 w-4 text-[var(--brand-lime)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-white/12 bg-[#fffaf3] p-2 text-slate-950 shadow-[0_32px_70px_rgba(0,0,0,0.18)]">
                <MultiStepConsultationForm />
              </div>
            </div>
          </SurfaceCard>
        </MarketingContainer>
      </section>
    </div>
  );
}
