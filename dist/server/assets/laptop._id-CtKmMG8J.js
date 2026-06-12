import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Plus, X } from "lucide-react";
import { R as Route, L as LAPTOPS, f as formatPrice } from "./router-BX9NRSdj.js";
import { u as useCompare, c as compareStore } from "./CompareStore-JOIL09g3.js";
import { L as LaptopCard } from "./LaptopCard-CFyavU46.js";
import "@tanstack/react-query";
import "react";
import "ai";
import "@ai-sdk/openai-compatible";
function ScoreRing({
  label,
  value
}) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = value / 100 * c;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-24 w-24", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 96 96", className: "w-full h-full -rotate-90", children: [
        /* @__PURE__ */ jsx("circle", { cx: "48", cy: "48", r, fill: "none", stroke: "rgba(255,255,255,0.06)", strokeWidth: "8" }),
        /* @__PURE__ */ jsx(motion.circle, { cx: "48", cy: "48", r, fill: "none", stroke: "url(#g)", strokeWidth: "8", strokeLinecap: "round", initial: {
          strokeDasharray: `0 ${c}`
        }, whileInView: {
          strokeDasharray: `${dash} ${c}`
        }, viewport: {
          once: true
        }, transition: {
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1]
        } }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "g", x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.85 0.18 210)" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.55 0.24 295)" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsx("div", { className: "text-xl font-semibold", children: value }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
function Detail() {
  const {
    laptop
  } = Route.useLoaderData();
  const ids = useCompare();
  const inCompare = ids.includes(laptop.id);
  const similar = LAPTOPS.filter((l) => l.id !== laptop.id && l.usage.some((u) => laptop.usage.includes(u))).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "sticky top-20 z-20 mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-2xl px-5 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "text-muted-foreground hover:text-foreground", "aria-label": "Back to catalog", children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: laptop.brand }),
          /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: laptop.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold", children: formatPrice(laptop.price) }),
        /* @__PURE__ */ jsx("button", { onClick: () => inCompare ? compareStore.remove(laptop.id) : compareStore.add(laptop.id), className: inCompare ? "btn-glass" : "btn-primary", children: inCompare ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Check, { size: 14 }),
          " Added"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Plus, { size: 14 }),
          " Compare"
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.6
      }, className: "relative glass rounded-3xl aspect-square overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 dot-grid opacity-30" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--cyan-accent)]/10 to-[var(--violet-accent)]/10" }),
        /* @__PURE__ */ jsx("img", { src: laptop.image, alt: laptop.name, className: "absolute inset-0 w-full h-full object-cover" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        laptop.badge && /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-[var(--cyan-accent)]", children: laptop.badge }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-semibold tracking-tight mt-2", children: laptop.name }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 text-lg", children: laptop.summary }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-5 gap-3 mt-8", children: [
          /* @__PURE__ */ jsx(ScoreRing, { label: "Performance", value: laptop.scores.performance }),
          /* @__PURE__ */ jsx(ScoreRing, { label: "Gaming", value: laptop.scores.gaming }),
          /* @__PURE__ */ jsx(ScoreRing, { label: "Battery", value: laptop.scores.battery }),
          /* @__PURE__ */ jsx(ScoreRing, { label: "Productivity", value: laptop.scores.productivity }),
          /* @__PURE__ */ jsx(ScoreRing, { label: "Portability", value: laptop.scores.portability })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3 mt-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium mb-3 text-[var(--cyan-accent)]", children: "Pros" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: laptop.pros.map((p) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Check, { size: 14, className: "text-[var(--cyan-accent)] mt-0.5 shrink-0" }),
              " ",
              p
            ] }, p)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium mb-3 text-muted-foreground", children: "Cons" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: laptop.cons.map((p) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(X, { size: 14, className: "text-muted-foreground mt-0.5 shrink-0" }),
              " ",
              p
            ] }, p)) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Full specifications" }),
      /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsx("tbody", { children: [["CPU", laptop.cpu], ["GPU", laptop.gpu], ["RAM", laptop.ram], ["Storage", laptop.storage], ["Display", laptop.display], ["Refresh rate", laptop.refreshRate], ["Battery", laptop.battery], ["Weight", laptop.weight], ["Ports", laptop.ports.join(", ")], ["Best for", laptop.usage.join(", ")]].map(([k, v], i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 ? "bg-white/[0.015]" : "", children: [
        /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-muted-foreground w-40", children: k }),
        /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: v })
      ] }, k)) }) }) })
    ] }),
    similar.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Similar alternatives" }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: similar.map((l) => /* @__PURE__ */ jsx(LaptopCard, { laptop: l }, l.id)) })
    ] })
  ] });
}
export {
  Detail as component
};
