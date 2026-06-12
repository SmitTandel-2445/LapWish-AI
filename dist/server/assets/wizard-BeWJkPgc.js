import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Sparkles, Wallet, Briefcase, Check, Cpu, ArrowLeft, ArrowRight } from "lucide-react";
import { L as LAPTOPS, s as scoreLaptop, B as BUDGET_BUCKETS, U as USAGE_OPTIONS, a as BRANDS } from "./router-BX9NRSdj.js";
import { L as LaptopCard } from "./LaptopCard-CFyavU46.js";
import "@tanstack/react-query";
import "ai";
import "@ai-sdk/openai-compatible";
import "./CompareStore-JOIL09g3.js";
function Wizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    budget: null,
    usage: [],
    brand: null
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const totalSteps = 3;
  const recommendations = useMemo(() => {
    if (!answers.budget) return [];
    const opts = {
      budgetMax: answers.budget.max,
      usage: answers.usage,
      brand: answers.brand
    };
    return LAPTOPS.map((l) => ({
      laptop: l,
      score: scoreLaptop(l, opts)
    })).sort((a, b) => b.score - a.score).slice(0, 3);
  }, [answers]);
  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };
  const canNext = step === 0 && !!answers.budget || step === 1 && answers.usage.length > 0 || step === 2 && !!answers.brand;
  return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl px-4 sm:px-6 py-12", children: !done ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-3", children: [
        /* @__PURE__ */ jsx(Sparkles, { size: 14 }),
        " AI Wizard"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: "Three questions. One perfect match." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Step ",
          step + 1,
          " of ",
          totalSteps + 1
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          Math.round((step + 1) / (totalSteps + 1) * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-1 w-full bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { className: "h-full bg-gradient-to-r from-[var(--cyan-accent)] to-[var(--violet-accent)]", initial: false, animate: {
        width: `${(step + 1) / (totalSteps + 1) * 100}%`
      }, transition: {
        type: "spring",
        stiffness: 180,
        damping: 24
      } }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-3xl p-6 sm:p-10 min-h-[420px] flex flex-col", children: [
      /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
        step === 0 && /* @__PURE__ */ jsx(Step, { icon: Wallet, title: "What's your budget?", subtitle: "Pick a range — we'll respect it.", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: BUDGET_BUCKETS.map((b) => /* @__PURE__ */ jsx("button", { onClick: () => setAnswers((a) => ({
          ...a,
          budget: b
        })), className: `text-left p-4 rounded-2xl border transition-all ${answers.budget?.id === b.id ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`, children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: b.label }) }, b.id)) }) }, "budget"),
        step === 1 && /* @__PURE__ */ jsx(Step, { icon: Briefcase, title: "What will you use it for?", subtitle: "Pick all that apply.", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: USAGE_OPTIONS.map((u) => {
          const on = answers.usage.includes(u);
          return /* @__PURE__ */ jsxs("button", { onClick: () => setAnswers((a) => ({
            ...a,
            usage: on ? a.usage.filter((x) => x !== u) : [...a.usage, u]
          })), className: `px-4 py-2 rounded-full text-sm border transition-all ${on ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/15 text-foreground" : "border-white/10 bg-white/[0.03] hover:border-white/20 text-muted-foreground"}`, children: [
            on && /* @__PURE__ */ jsx(Check, { size: 12, className: "inline mr-1.5 text-[var(--cyan-accent)]" }),
            u
          ] }, u);
        }) }) }, "usage"),
        step === 2 && /* @__PURE__ */ jsx(Step, { icon: Cpu, title: "Brand preference?", subtitle: "Or let us pick the best fit.", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [...BRANDS, "No Preference"].map((b) => /* @__PURE__ */ jsx("button", { onClick: () => setAnswers((a) => ({
          ...a,
          brand: b
        })), className: `p-4 rounded-2xl border text-sm transition-all ${answers.brand === b ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`, children: b }, b)) }) }, "brand"),
        step === 3 && /* @__PURE__ */ jsxs(Step, { icon: Sparkles, title: "Ready to match", subtitle: "We'll score every laptop against your answers.", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsx(Row, { label: "Budget", value: answers.budget?.label ?? "—" }),
            /* @__PURE__ */ jsx(Row, { label: "Usage", value: answers.usage.join(", ") || "—" }),
            /* @__PURE__ */ jsx(Row, { label: "Brand", value: answers.brand ?? "—" })
          ] }),
          loading && /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Analyzing 100+ specs across the catalog…" }),
            /* @__PURE__ */ jsx("div", { className: "h-1 w-full bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { className: "h-full bg-gradient-to-r from-[var(--cyan-accent)] to-[var(--violet-accent)]", initial: {
              width: "5%"
            }, animate: {
              width: "100%"
            }, transition: {
              duration: 1.2
            } }) })
          ] })
        ] }, "review")
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-6 mt-auto", children: [
        /* @__PURE__ */ jsxs("button", { onClick: back, disabled: step === 0 || loading, className: "btn-glass disabled:opacity-30 disabled:cursor-not-allowed", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
          " Back"
        ] }),
        step < totalSteps ? /* @__PURE__ */ jsxs("button", { onClick: next, disabled: !canNext, className: "btn-primary disabled:opacity-40 disabled:cursor-not-allowed", children: [
          "Next ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
        ] }) : /* @__PURE__ */ jsx("button", { onClick: submit, disabled: loading, className: "btn-primary", children: loading ? "Matching…" : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Generate matches ",
          /* @__PURE__ */ jsx(Sparkles, { size: 16 })
        ] }) })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-3", children: [
        /* @__PURE__ */ jsx(Sparkles, { size: 14 }),
        " Your matches"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: "Three machines tuned to you." }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-3", children: "Scored across price, performance, portability, and your use cases." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: recommendations.map(({
      laptop,
      score
    }) => /* @__PURE__ */ jsx(LaptopCard, { laptop, score }, laptop.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mt-10 flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setDone(false);
        setStep(0);
        setAnswers({
          budget: null,
          usage: [],
          brand: null
        });
      }, className: "btn-glass", children: "Start over" }),
      /* @__PURE__ */ jsxs(Link, { to: "/compare", className: "btn-primary", children: [
        "Compare picks ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
      ] })
    ] })
  ] }) });
}
function Step({
  icon: Icon,
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxs(motion.div, { initial: {
    opacity: 0,
    x: 30
  }, animate: {
    opacity: 1,
    x: 0
  }, exit: {
    opacity: 0,
    x: -30
  }, transition: {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1]
  }, className: "flex-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-xl glass grid place-items-center", children: /* @__PURE__ */ jsx(Icon, { size: 16, className: "text-[var(--cyan-accent)]" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: title })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: subtitle }),
    children
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-white/5 py-2", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: "font-medium", children: value })
  ] });
}
export {
  Wizard as component
};
