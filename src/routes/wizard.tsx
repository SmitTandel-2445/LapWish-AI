import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, Wallet, Briefcase, Cpu } from "lucide-react";
import {
  BUDGET_BUCKETS,
  BRANDS,
  USAGE_OPTIONS,
  LAPTOPS,
  scoreLaptop,
} from "@/data/laptops";
import { LaptopCard } from "@/component/site/LaptopCard";

export const Route = createFileRoute("/wizard")({
  head: () => ({
    meta: [
      { title: "AI Recommendation Wizard — LapWise AI" },
      { name: "description", content: "Answer a few questions and get a personalized shortlist of laptops scored to your needs." },
      { property: "og:title", content: "AI Recommendation Wizard — LapWise AI" },
      { property: "og:description", content: "Three quick questions, a curated shortlist scored to your needs." },
      { property: "og:url", content: "https://lapwise-ai.lovable.app/wizard" },
    ],
    links: [{ rel: "canonical", href: "https://lapwise-ai.lovable.app/wizard" }],
  }),
  component: Wizard,
});


type Answers = {
  budget: (typeof BUDGET_BUCKETS)[number] | null;
  usage: string[];
  brand: string | null;
};

function Wizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ budget: null, usage: [], brand: null });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const totalSteps = 3;

  const recommendations = useMemo(() => {
    if (!answers.budget) return [];
    const opts = {
      budgetMax: answers.budget.max,
      usage: answers.usage,
      brand: answers.brand,
    };
    return LAPTOPS.map((l) => ({ laptop: l, score: scoreLaptop(l, opts) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers]);

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  const canNext =
    (step === 0 && !!answers.budget) ||
    (step === 1 && answers.usage.length > 0) ||
    (step === 2 && !!answers.brand);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {!done ? (
        <>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-3">
              <Sparkles size={14} /> AI Wizard
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Three questions. One perfect match.
            </h1>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Step {step + 1} of {totalSteps + 1}</span>
              <span>{Math.round(((step + 1) / (totalSteps + 1)) * 100)}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--cyan-accent)] to-[var(--violet-accent)]"
                initial={false}
                animate={{ width: `${((step + 1) / (totalSteps + 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              />
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6 sm:p-10 min-h-[420px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <Step key="budget" icon={Wallet} title="What's your budget?" subtitle="Pick a range — we'll respect it.">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {BUDGET_BUCKETS.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setAnswers((a) => ({ ...a, budget: b }))}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          answers.budget?.id === b.id
                            ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <div className="text-sm font-medium">{b.label}</div>
                      </button>
                    ))}
                  </div>
                </Step>
              )}

              {step === 1 && (
                <Step key="usage" icon={Briefcase} title="What will you use it for?" subtitle="Pick all that apply.">
                  <div className="flex flex-wrap gap-2">
                    {USAGE_OPTIONS.map((u) => {
                      const on = answers.usage.includes(u);
                      return (
                        <button
                          key={u}
                          onClick={() =>
                            setAnswers((a) => ({
                              ...a,
                              usage: on ? a.usage.filter((x) => x !== u) : [...a.usage, u],
                            }))
                          }
                          className={`px-4 py-2 rounded-full text-sm border transition-all ${
                            on
                              ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/15 text-foreground"
                              : "border-white/10 bg-white/[0.03] hover:border-white/20 text-muted-foreground"
                          }`}
                        >
                          {on && <Check size={12} className="inline mr-1.5 text-[var(--cyan-accent)]" />}
                          {u}
                        </button>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 2 && (
                <Step key="brand" icon={Cpu} title="Brand preference?" subtitle="Or let us pick the best fit.">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[...BRANDS, "No Preference"].map((b) => (
                      <button
                        key={b}
                        onClick={() => setAnswers((a) => ({ ...a, brand: b }))}
                        className={`p-4 rounded-2xl border text-sm transition-all ${
                          answers.brand === b
                            ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </Step>
              )}

              {step === 3 && (
                <Step key="review" icon={Sparkles} title="Ready to match" subtitle="We'll score every laptop against your answers.">
                  <div className="space-y-2 text-sm">
                    <Row label="Budget" value={answers.budget?.label ?? "—"} />
                    <Row label="Usage" value={answers.usage.join(", ") || "—"} />
                    <Row label="Brand" value={answers.brand ?? "—"} />
                  </div>
                  {loading && (
                    <div className="mt-8 space-y-3">
                      <div className="text-sm text-muted-foreground">Analyzing 100+ specs across the catalog…</div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[var(--cyan-accent)] to-[var(--violet-accent)]"
                          initial={{ width: "5%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.2 }}
                        />
                      </div>
                    </div>
                  )}
                </Step>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-6 mt-auto">
              <button
                onClick={back}
                disabled={step === 0 || loading}
                className="btn-glass disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16} /> Back
              </button>
              {step < totalSteps ? (
                <button
                  onClick={next}
                  disabled={!canNext}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={submit} disabled={loading} className="btn-primary">
                  {loading ? "Matching…" : <>Generate matches <Sparkles size={16} /></>}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-3">
              <Sparkles size={14} /> Your matches
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Three machines tuned to you.
            </h1>
            <p className="text-muted-foreground mt-3">
              Scored across price, performance, portability, and your use cases.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendations.map(({ laptop, score }) => (
              <LaptopCard key={laptop.id} laptop={laptop} score={score} />
            ))}
          </div>

          <div className="text-center mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setDone(false);
                setStep(0);
                setAnswers({ budget: null, usage: [], brand: null });
              }}
              className="btn-glass"
            >
              Start over
            </button>
            <Link to="/compare" className="btn-primary">
              Compare picks <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="h-9 w-9 rounded-xl glass grid place-items-center">
          <Icon size={16} className="text-[var(--cyan-accent)]" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>
      {children}
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
