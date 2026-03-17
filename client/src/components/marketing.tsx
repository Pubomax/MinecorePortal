import { type HTMLAttributes, type ReactNode, useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { ConsultationModal } from "@/components/consultation-modal";

const revealTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function MarketingContainer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SurfaceCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("marketing-panel", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "space-y-5",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <div className="marketing-chip">{eyebrow}</div> : null}
      <h2 className="font-display text-[2.3rem] leading-[0.98] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[3.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}

export function MarketingHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats = [],
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  stats?: Array<{ label: string; value: string }>;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pb-20 pt-24 sm:pt-28 lg:pb-28", className)}>
      <MarketingContainer>
        <div
          className={cn(
            "grid gap-12 lg:items-center",
            aside ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,.92fr)]" : "max-w-4xl",
          )}
        >
          <Reveal className="space-y-8">
            <div className="space-y-6">
              <div className="marketing-chip">{eyebrow}</div>
              <h1 className="font-display text-[3.4rem] leading-[0.92] tracking-[-0.055em] text-slate-950 sm:text-[4.7rem] lg:text-[5.7rem]">
                {title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {description}
              </p>
            </div>

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {primaryAction}
                {secondaryAction}
              </div>
            )}

            {stats.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="marketing-stat-card">
                    <div className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      {stat.label}
                    </div>
                    <div className="mt-3 font-display text-3xl tracking-[-0.04em] text-slate-950">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </Reveal>

          {aside ? <Reveal delay={0.12}>{aside}</Reveal> : null}
        </div>
      </MarketingContainer>
    </section>
  );
}

export function SuitePreview({
  className,
  accentLabel,
  status,
  title,
  items,
}: {
  className?: string;
  accentLabel?: string;
  status?: string;
  title?: string;
  items?: Array<{ label: string; value: string }>;
}) {
  const { t } = useLanguage();
  const displayAccent = accentLabel ?? t("suiteDefaultAccent");
  const displayStatus = status ?? t("suiteDefaultStatus");
  const displayTitle = title ?? t("suiteDefaultTitle");
  const metrics = items ?? [
    { label: t("suiteDefaultMetric1Label"), value: "24/7" },
    { label: t("suiteDefaultMetric2Label"), value: "08" },
    { label: t("suiteDefaultMetric3Label"), value: "< 2m" },
  ];

  return (
    <div className={cn("relative", className)}>
      <div className="marketing-orb marketing-orb-left" aria-hidden />
      <div className="marketing-orb marketing-orb-right" aria-hidden />

      <SurfaceCard className="relative overflow-hidden rounded-[32px] p-5 sm:p-6">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
            <Sparkles className="h-4 w-4 text-[var(--brand-coral)]" />
            {displayAccent}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.08)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-lime)] shadow-[0_0_0_5px_rgba(212,248,123,0.18)]" />
            {displayStatus}
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(230px,.75fr)]">
          <div className="marketing-subpanel p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {t("suiteOrchestrationHub")}
                </p>
                <p className="max-w-md font-display text-2xl leading-tight tracking-[-0.04em] text-slate-950">
                  {displayTitle}
                </p>
              </div>
              <div className="hidden rounded-2xl bg-slate-950 px-3 py-2 text-white shadow-lg sm:flex">
                <Zap className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.15fr_.85fr]">
              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(20,32,58,0.96),rgba(7,12,24,0.96))] p-5 text-white shadow-[0_24px_48px_rgba(15,23,42,0.18)]">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/60">
                  <span>{t("suitePriorityView")}</span>
                  <span>{t("suiteLiveQueues")}</span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    [t("suiteQueueInbound"), t("suiteQueueInboundValue")],
                    [t("suiteQueueSales"), t("suiteQueueSalesValue")],
                    [t("suiteQueueSupport"), t("suiteQueueSupportValue")],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-lime)]" />
                        <span className="text-sm font-semibold">{label}</span>
                      </div>
                      <span className="text-sm text-white/72">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="marketing-subpanel marketing-float p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {t("suiteRouteLogic")}
                  </div>
                  <div className="mt-4 space-y-3">
                    {[t("suiteRouteStep1"), t("suiteRouteStep2"), t("suiteRouteStep3")].map((step) => (
                      <div key={step} className="flex items-center gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-[var(--brand-teal)]" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="marketing-subpanel p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {t("suiteWeeklyVelocity")}
                  </div>
                  <div className="mt-5 flex items-end gap-3">
                    {[42, 68, 56, 84, 72, 91].map((height, index) => (
                      <div
                        key={height}
                        className="flex-1 rounded-t-full bg-[linear-gradient(180deg,var(--brand-sky),var(--brand-coral))]"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {metrics.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "marketing-subpanel p-5",
                  index === 1 ? "marketing-float-delayed" : undefined,
                )}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {item.label}
                </div>
                <div className="mt-4 font-display text-4xl tracking-[-0.05em] text-slate-950">
                  {item.value}
                </div>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500">
                  {t("suiteLiveSignal")}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

/* ── AnimatedCounter ─────────────────────────────────── */

export function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.25, 0.4, 0, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ── Feature list item ───────────────────────────────── */

export function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 text-sm leading-7 text-slate-700">
      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand-teal)]" />
      {text}
    </div>
  );
}

/* ── Window chrome (macOS dots) ──────────────────────── */

export function WindowChrome({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-red-500/60" />
      <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
      <span className="h-2 w-2 rounded-full bg-green-500/60" />
      <span className="ml-1.5 font-mono text-[10px] text-white/25">{label}</span>
    </div>
  );
}

/* ── Chat mockup ─────────────────────────────────────── */

export function ChatMockup() {
  return (
    <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(20,32,58,0.96),rgba(7,12,24,0.96))] p-5 text-white shadow-[0_24px_48px_rgba(15,23,42,0.18)]">
      <WindowChrome label="Clawbot · Live" />
      <div className="space-y-2.5">
        <Reveal delay={0.2}>
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-xl rounded-tr-sm bg-white px-3 py-2 text-xs text-slate-950">
              Bonjour, comment puis-je obtenir un devis ?
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex gap-2">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
              <Bot className="h-3 w-3 text-white/50" />
            </div>
            <div className="max-w-[70%] rounded-xl rounded-tl-sm bg-white/10 px-3 py-2 text-xs text-white/80">
              Je qualifie votre demande et crée un ticket dans votre CRM. Votre équipe est notifiée. ✓
            </div>
          </div>
        </Reveal>
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-lime)]" />
        <span className="text-[10px] text-[var(--brand-lime)]">Online · 1.4s response</span>
      </div>
    </div>
  );
}

/* ── Product cards (shared between home + services) ─── */

export function OperatorProductCard({ showGuarantee = false }: { showGuarantee?: boolean }) {
  const { t } = useLanguage();

  return (
    <Reveal>
      <SurfaceCard className="overflow-hidden rounded-[32px] p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(212,248,123,0.2)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-lime)] shadow-[0_0_0_4px_rgba(212,248,123,0.2)]" />
              {t("productOperatorBadge")}
            </div>
            <h3 className="font-display text-4xl tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {t("productOperatorName")}
            </h3>
            <p className="text-sm text-slate-500">{t("productOperatorTagline")}</p>
            <p className="max-w-xl text-base leading-8 text-slate-600">{t("productOperatorDescription")}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[t("productOperatorFeature1"), t("productOperatorFeature2"), t("productOperatorFeature3"), t("productOperatorFeature4")].map((f) => (
                <FeatureItem key={f} text={f} />
              ))}
            </div>

            <div className="flex flex-wrap items-baseline gap-3 pt-2">
              <span className="font-display text-3xl tracking-[-0.04em] text-slate-950">{t("productOperatorPricing")}</span>
              <span className="text-sm text-slate-500">{t("productOperatorSetup")}</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ConsultationModal
                triggerText={t("productOperatorCta")}
                className="marketing-button-primary h-12 px-6 text-sm font-semibold"
              />
              {showGuarantee && <p className="text-xs text-slate-400">{t("productOperatorGuarantee")}</p>}
            </div>
          </div>

          <ChatMockup />
        </div>
      </SurfaceCard>
    </Reveal>
  );
}

export function ExecProductCard() {
  const { t } = useLanguage();

  return (
    <Reveal delay={0.06}>
      <SurfaceCard className="h-full rounded-[30px] p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(212,248,123,0.2)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
          <span className="h-2 w-2 rounded-full bg-[var(--brand-lime)] shadow-[0_0_0_4px_rgba(212,248,123,0.2)]" />
          {t("productExecBadge")}
        </div>
        <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-slate-950">
          {t("productExecName")}
        </h3>
        <p className="mt-2 text-sm text-slate-500">{t("productExecTagline")}</p>
        <p className="mt-4 text-sm leading-7 text-slate-600">{t("productExecDescription")}</p>

        <div className="mt-5 space-y-3">
          {[t("productExecFeature1"), t("productExecFeature2"), t("productExecFeature3")].map((f) => (
            <FeatureItem key={f} text={f} />
          ))}
        </div>

        <div className="mt-6 border-t border-[rgba(16,24,40,0.08)] pt-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl tracking-[-0.04em] text-slate-950">{t("productExecPricing")}</span>
            <span className="text-sm text-slate-500">{t("productExecSetup")}</span>
          </div>
        </div>

        <ConsultationModal
          triggerText={t("productExecCta")}
          className="marketing-button-primary mt-5 h-11 w-full px-6 text-sm font-semibold"
        />
      </SurfaceCard>
    </Reveal>
  );
}

export function CivicViewProductCard() {
  const { t } = useLanguage();

  return (
    <Reveal delay={0.12}>
      <SurfaceCard className="h-full rounded-[30px] p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(16,24,40,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {t("productComingSoonBadge")}
        </div>
        <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-slate-950">
          {t("productCivicName")}
        </h3>
        <p className="mt-2 text-sm text-slate-500">{t("productCivicTagline")}</p>
        <p className="mt-4 text-sm leading-7 text-slate-600">{t("productCivicDescription")}</p>

        <div className="mt-5 space-y-3">
          {[t("civicFeature1"), t("civicFeature2"), t("civicFeature3")].map((f) => (
            <FeatureItem key={f} text={f} />
          ))}
        </div>

        <Link
          href="/contact"
          className="marketing-button-secondary mt-8 inline-flex h-11 w-full items-center justify-center text-sm font-semibold"
        >
          {t("productCivicCta")}
        </Link>
      </SurfaceCard>
    </Reveal>
  );
}
