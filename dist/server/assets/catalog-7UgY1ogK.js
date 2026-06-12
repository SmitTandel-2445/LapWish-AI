import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { L as LAPTOPS, f as formatPrice, a as BRANDS, U as USAGE_OPTIONS } from "./router-BX9NRSdj.js";
import { L as LaptopCard } from "./LaptopCard-CFyavU46.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "ai";
import "@ai-sdk/openai-compatible";
import "./CompareStore-JOIL09g3.js";
const RAM_OPTIONS = ["8 GB", "16 GB", "32 GB"];
function Catalog() {
  const max = Math.max(...LAPTOPS.map((l) => l.price));
  const [priceMax, setPriceMax] = useState(max);
  const [brands, setBrands] = useState([]);
  const [ram, setRam] = useState(null);
  const [usage, setUsage] = useState([]);
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => {
    return LAPTOPS.filter((l) => {
      if (l.price > priceMax) return false;
      if (brands.length && !brands.includes(l.brand)) return false;
      if (ram && !l.ram.startsWith(ram.split(" ")[0])) return false;
      if (usage.length && !usage.some((u) => l.usage.includes(u))) return false;
      return true;
    });
  }, [priceMax, brands, ram, usage]);
  const toggle = (arr, v) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  const Filters = /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium mb-3", children: "Max price" }),
      /* @__PURE__ */ jsx("input", { type: "range", min: 3e4, max, step: 5e3, value: priceMax, onChange: (e) => setPriceMax(Number(e.target.value)), className: "w-full accent-[var(--cyan-accent)]" }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground mt-2", children: formatPrice(priceMax) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium mb-3", children: "Brand" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: BRANDS.map((b) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: brands.includes(b), onChange: () => setBrands((a) => toggle(a, b)), className: "accent-[var(--cyan-accent)]" }),
        /* @__PURE__ */ jsx("span", { children: b })
      ] }, b)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium mb-3", children: "RAM" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        RAM_OPTIONS.map((r) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
          /* @__PURE__ */ jsx("input", { type: "radio", name: "ram", checked: ram === r, onChange: () => setRam(r), className: "accent-[var(--cyan-accent)]" }),
          /* @__PURE__ */ jsxs("span", { children: [
            r,
            "+"
          ] })
        ] }, r)),
        ram && /* @__PURE__ */ jsx("button", { onClick: () => setRam(null), className: "text-xs text-muted-foreground hover:text-foreground", children: "Clear" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium mb-3", children: "Usage" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: USAGE_OPTIONS.map((u) => {
        const on = usage.includes(u);
        return /* @__PURE__ */ jsx("button", { onClick: () => setUsage((a) => toggle(a, u)), className: `text-xs px-2.5 py-1 rounded-full border transition ${on ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/10" : "border-white/10 hover:border-white/30 text-muted-foreground"}`, children: u }, u);
      }) })
    ] })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: "Catalog" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-2", children: [
          filtered.length,
          " ",
          filtered.length === 1 ? "laptop" : "laptops",
          " matching your filters"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(true), className: "lg:hidden btn-glass", children: [
        /* @__PURE__ */ jsx(Filter, { size: 14 }),
        " Filters"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[260px_1fr] gap-8", children: [
      /* @__PURE__ */ jsx("aside", { className: "hidden lg:block glass rounded-2xl p-6 h-fit sticky top-28", children: Filters }),
      open && /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, className: "lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm p-4", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxs(motion.div, { initial: {
        y: 30,
        opacity: 0
      }, animate: {
        y: 0,
        opacity: 1
      }, onClick: (e) => e.stopPropagation(), className: "glass-strong rounded-3xl p-6 max-h-[80vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Filters" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), "aria-label": "Close filters", children: /* @__PURE__ */ jsx(X, { size: 18 }) })
        ] }),
        Filters
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-5", children: [
        filtered.map((l) => /* @__PURE__ */ jsx(LaptopCard, { laptop: l }, l.id)),
        filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-full text-center py-20 text-muted-foreground glass rounded-2xl", children: "No matches. Try widening your filters." })
      ] })
    ] })
  ] });
}
export {
  Catalog as component
};
