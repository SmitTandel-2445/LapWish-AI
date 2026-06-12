import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Cpu, Sparkles, GitCompare, BarChart3 } from "lucide-react";
import { useRef } from "react";
import { L as LaptopCard } from "./LaptopCard-CFyavU46.js";
import { L as LAPTOPS } from "./router-BX9NRSdj.js";
import "./CompareStore-JOIL09g3.js";
import "@tanstack/react-query";
import "ai";
import "@ai-sdk/openai-compatible";
const heroLaptop = "/assets/hero-laptop-D8-qWeQX.png";
function HeroLaptop() {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 18).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      onMouseMove,
      onMouseLeave: onLeave,
      className: "relative w-full aspect-square max-w-xl mx-auto",
      style: { perspective: "1200px" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-12 rounded-full bg-[var(--cyan-accent)]/20 blur-3xl animate-pulse-glow" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-20 rounded-full bg-[var(--violet-accent)]/25 blur-3xl animate-pulse-glow", style: { animationDelay: "1.2s" } })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border border-white/5 animate-spin-slow" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-6 rounded-full border border-white/[0.03]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            className: "absolute inset-0 flex items-center justify-center",
            style: {
              transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
              transformStyle: "preserve-3d",
              transition: "transform 0.25s ease-out"
            },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: heroLaptop,
                alt: "LapWise AI laptop",
                width: 1024,
                height: 1024,
                className: "w-full h-full object-contain animate-float drop-shadow-[0_30px_60px_rgba(0,229,255,0.25)]"
              }
            )
          }
        )
      ]
    }
  );
}
const features = [{
  icon: Sparkles,
  title: "AI Recommendation Wizard",
  desc: "Answer three questions, get a curated shortlist scored to your needs."
}, {
  icon: GitCompare,
  title: "Side-by-side Compare",
  desc: "Match up to three laptops with category-by-category winners."
}, {
  icon: BarChart3,
  title: "Live Insights",
  desc: "See trending picks, popular brands, and shifting budgets."
}];
function Home() {
  const trending = LAPTOPS.filter((l) => l.badge).slice(0, 6);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-7", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, className: "inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--cyan-accent)] animate-pulse" }),
          "Powered by AI · Built for India"
        ] }),
        /* @__PURE__ */ jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }, className: "text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight", children: [
          "Find your perfect",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "laptop" }),
          " with AI."
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.1
        }, className: "text-lg text-muted-foreground max-w-xl", children: "Personalized laptop recommendations based on your budget, needs, and preferences — without the spec-sheet fatigue." }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.2
        }, className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/wizard", className: "btn-primary", children: [
            "Start Recommendation ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/compare", className: "btn-glass", children: "Compare Laptops" })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.5
        }, className: "flex items-center gap-6 pt-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { size: 14, className: "text-[var(--cyan-accent)]" }),
            "Unbiased"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Zap, { size: 14, className: "text-[var(--cyan-accent)]" }),
            "Instant matches"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Cpu, { size: 14, className: "text-[var(--cyan-accent)]" }),
            LAPTOPS.length,
            "+ models"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(HeroLaptop, {}) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-20", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: features.map((f, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.08
    }, className: "glass rounded-2xl p-6 hover:border-[var(--cyan-accent)]/30 transition-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--cyan-accent)]/30 to-[var(--violet-accent)]/30 grid place-items-center mb-4", children: /* @__PURE__ */ jsx(f.icon, { size: 18, className: "text-[var(--cyan-accent)]" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1", children: f.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: f.desc })
    ] }, f.title)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-2", children: "Trending" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-semibold tracking-tight", children: "What people are picking" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/catalog", className: "text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1", children: [
          "View all ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: trending.map((l) => /* @__PURE__ */ jsx("div", { className: "snap-start shrink-0 w-[320px]", children: /* @__PURE__ */ jsx(LaptopCard, { laptop: l }) }, l.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-5xl px-4 sm:px-6 py-20", children: /* @__PURE__ */ jsxs("div", { className: "relative glass-strong rounded-3xl p-10 sm:p-14 text-center overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 dot-grid opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-[80%] bg-[var(--cyan-accent)]/30 blur-3xl rounded-full" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto", children: "Stop second-guessing your next laptop." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground max-w-lg mx-auto", children: "Let LapWise AI shortlist three machines that fit you. Takes 30 seconds." }),
        /* @__PURE__ */ jsxs(Link, { to: "/wizard", className: "btn-primary mt-8", children: [
          "Get my recommendation ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
