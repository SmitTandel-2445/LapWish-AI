import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, ArrowRight, Check } from "lucide-react";
import { L as LAPTOPS, f as formatPrice } from "./router-BX9NRSdj.js";
import { u as useCompare, c as compareStore } from "./CompareStore-JOIL09g3.js";
import "@tanstack/react-query";
import "react";
import "ai";
import "@ai-sdk/openai-compatible";
const numWin = (vals) => {
  const nums = vals.map((v) => Number(String(v).replace(/[^\d.]/g, "")));
  return nums.indexOf(Math.max(...nums));
};
const numWinLow = (vals) => {
  const nums = vals.map((v) => Number(String(v).replace(/[^\d.]/g, "")));
  return nums.indexOf(Math.min(...nums));
};
const ROWS = [{
  key: "price",
  label: "Price",
  get: (l) => formatPrice(l.price),
  pick: (v) => numWinLow(v.map((x) => String(x)))
}, {
  key: "cpu",
  label: "CPU",
  get: (l) => l.cpu
}, {
  key: "gpu",
  label: "GPU",
  get: (l) => l.gpu
}, {
  key: "ram",
  label: "RAM",
  get: (l) => l.ram,
  pick: numWin
}, {
  key: "storage",
  label: "Storage",
  get: (l) => l.storage,
  pick: numWin
}, {
  key: "display",
  label: "Display",
  get: (l) => l.display
}, {
  key: "refresh",
  label: "Refresh rate",
  get: (l) => l.refreshRate,
  pick: numWin
}, {
  key: "battery",
  label: "Battery",
  get: (l) => l.battery,
  pick: numWin
}, {
  key: "weight",
  label: "Weight",
  get: (l) => l.weight,
  pick: numWinLow
}, {
  key: "ports",
  label: "Ports",
  get: (l) => l.ports.join(", ")
}];
function Compare() {
  const ids = useCompare();
  const selected = ids.map((id) => LAPTOPS.find((l) => l.id === id)).filter(Boolean);
  const remaining = LAPTOPS.filter((l) => !ids.includes(l.id));
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: "Compare" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-2", children: [
          "Add up to ",
          compareStore.max,
          " laptops. We'll mark the winner per category."
        ] })
      ] }),
      selected.length > 0 && /* @__PURE__ */ jsxs("button", { onClick: () => compareStore.clear(), className: "btn-glass", children: [
        /* @__PURE__ */ jsx(X, { size: 14 }),
        " Clear all"
      ] })
    ] }),
    selected.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-12 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "Nothing in your compare list yet." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center", children: LAPTOPS.slice(0, 3).map((l) => /* @__PURE__ */ jsxs("button", { onClick: () => compareStore.add(l.id), className: "btn-glass", children: [
        /* @__PURE__ */ jsx(Plus, { size: 14 }),
        " ",
        l.name
      ] }, l.id)) }),
      /* @__PURE__ */ jsxs(Link, { to: "/catalog", className: "inline-flex items-center gap-1 text-sm text-[var(--cyan-accent)] mt-6", children: [
        "Browse catalog ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: `grid gap-4 mb-6 grid-cols-1 sm:grid-cols-${selected.length}`, style: {
        gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))`
      }, children: /* @__PURE__ */ jsx(AnimatePresence, { children: selected.map((l) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95,
        y: 20
      }, animate: {
        opacity: 1,
        scale: 1,
        y: 0
      }, exit: {
        opacity: 0,
        scale: 0.95
      }, className: "glass rounded-2xl p-4 relative", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => compareStore.remove(l.id), className: "absolute top-3 right-3 h-7 w-7 rounded-full grid place-items-center bg-white/5 hover:bg-white/10", "aria-label": "Remove", children: /* @__PURE__ */ jsx(X, { size: 14 }) }),
        /* @__PURE__ */ jsx("img", { src: l.image, alt: l.name, className: "w-full aspect-[4/3] object-cover rounded-xl mb-3", loading: "lazy" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: l.brand }),
        /* @__PURE__ */ jsx("div", { className: "font-semibold", children: l.name }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold mt-1", children: formatPrice(l.price) })
      ] }, l.id)) }) }),
      /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl overflow-hidden overflow-x-auto", children: /* @__PURE__ */ jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsx("tbody", { children: ROWS.map((row, i) => {
        const vals = selected.map(row.get);
        const winner = row.pick && selected.length > 1 ? row.pick(vals) : -1;
        return /* @__PURE__ */ jsxs("tr", { className: i % 2 ? "bg-white/[0.015]" : "", children: [
          /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-muted-foreground w-40 sticky left-0 bg-card/80 backdrop-blur", children: row.label }),
          vals.map((v, idx) => /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxs("span", { className: winner === idx ? "text-[var(--cyan-accent)] font-medium inline-flex items-center gap-1.5" : "", children: [
            winner === idx && /* @__PURE__ */ jsx(Check, { size: 14 }),
            v
          ] }) }, idx))
        ] }, row.key);
      }) }) }) }),
      selected.length < compareStore.max && remaining.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm text-muted-foreground mb-3", children: "Add another" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: remaining.slice(0, 6).map((l) => /* @__PURE__ */ jsxs("button", { onClick: () => compareStore.add(l.id), className: "text-xs px-3 py-2 rounded-full glass hover:border-[var(--cyan-accent)]/40", children: [
          /* @__PURE__ */ jsx(Plus, { size: 12, className: "inline mr-1" }),
          " ",
          l.name
        ] }, l.id)) })
      ] })
    ] })
  ] });
}
export {
  Compare as component
};
