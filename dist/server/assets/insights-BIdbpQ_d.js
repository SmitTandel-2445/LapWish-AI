import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { L as LAPTOPS } from "./router-BX9NRSdj.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "lucide-react";
import "ai";
import "@ai-sdk/openai-compatible";
const CYAN = "oklch(0.85 0.18 210)";
const VIOLET = "oklch(0.55 0.24 295)";
const recommended = [...LAPTOPS].sort((a, b) => b.rating - a.rating).slice(0, 6).map((l) => ({
  name: l.name.replace(/MacBook|Air|Pro/g, "").trim() || l.name,
  score: Math.round(l.rating * 18 + Math.random() * 4)
}));
const brandCounts = LAPTOPS.reduce((a, l) => {
  a[l.brand] = (a[l.brand] ?? 0) + 1;
  return a;
}, {});
const brandData = Object.entries(brandCounts).map(([name, value]) => ({
  name,
  value
}));
const COLORS = [CYAN, VIOLET, "oklch(0.75 0.15 180)", "oklch(0.65 0.2 320)", "oklch(0.7 0.18 250)", "oklch(0.6 0.2 30)"];
const budget = [{
  range: "<40k",
  picks: 12
}, {
  range: "40–60k",
  picks: 28
}, {
  range: "60–80k",
  picks: 41
}, {
  range: "80k–1L",
  picks: 33
}, {
  range: ">1L",
  picks: 22
}];
const radar = ["Performance", "Gaming", "Battery", "Productivity", "Portability"].map((axis) => ({
  axis,
  avg: Math.round(LAPTOPS.reduce((s, l) => {
    const key = axis.toLowerCase();
    return s + (l.scores[key] ?? 0);
  }, 0) / LAPTOPS.length)
}));
function Insights() {
  const [range, setRange] = useState("30d");
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-2", children: "Live data" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: "AI Insights" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "What our recommender is picking right now." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "glass rounded-full p-1 inline-flex text-sm", children: ["7d", "30d", "all"].map((r) => /* @__PURE__ */ jsx("button", { onClick: () => setRange(r), className: `px-4 py-1.5 rounded-full transition ${range === r ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`, children: r === "7d" ? "7 days" : r === "30d" ? "30 days" : "All time" }, r)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsx(ChartCard, { title: "Most recommended laptops", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: recommended, layout: "vertical", margin: {
        left: 20,
        right: 20
      }, children: [
        /* @__PURE__ */ jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.05)" }),
        /* @__PURE__ */ jsx(XAxis, { type: "number", stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsx(YAxis, { dataKey: "name", type: "category", stroke: "rgba(255,255,255,0.6)", fontSize: 11, width: 120 }),
        /* @__PURE__ */ jsx(Tooltip, { cursor: {
          fill: "rgba(255,255,255,0.04)"
        }, contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsx(Bar, { dataKey: "score", fill: CYAN, radius: [0, 8, 8, 0], animationDuration: 900 })
      ] }) }) }),
      /* @__PURE__ */ jsx(ChartCard, { title: "Popular brands", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(PieChart, { children: [
        /* @__PURE__ */ jsx(Pie, { data: brandData, dataKey: "value", nameKey: "name", innerRadius: 60, outerRadius: 100, paddingAngle: 4, children: brandData.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length], stroke: "transparent" }, i)) }),
        /* @__PURE__ */ jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsx(Legend, { wrapperStyle: {
          fontSize: 12,
          color: "rgba(255,255,255,0.7)"
        } })
      ] }) }) }),
      /* @__PURE__ */ jsx(ChartCard, { title: "Budget distribution", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(AreaChart, { data: budget, children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "grad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: CYAN, stopOpacity: 0.5 }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: CYAN, stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.05)" }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "range", stroke: "rgba(255,255,255,0.5)", fontSize: 11 }),
        /* @__PURE__ */ jsx(YAxis, { stroke: "rgba(255,255,255,0.5)", fontSize: 11 }),
        /* @__PURE__ */ jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "picks", stroke: CYAN, fill: "url(#grad)", strokeWidth: 2 })
      ] }) }) }),
      /* @__PURE__ */ jsx(ChartCard, { title: "Average performance profile", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(RadarChart, { data: radar, children: [
        /* @__PURE__ */ jsx(PolarGrid, { stroke: "rgba(255,255,255,0.08)" }),
        /* @__PURE__ */ jsx(PolarAngleAxis, { dataKey: "axis", stroke: "rgba(255,255,255,0.6)", fontSize: 11 }),
        /* @__PURE__ */ jsx(Radar, { dataKey: "avg", stroke: VIOLET, fill: VIOLET, fillOpacity: 0.35 }),
        /* @__PURE__ */ jsx(Tooltip, { contentStyle: tooltipStyle })
      ] }) }) })
    ] })
  ] });
}
const tooltipStyle = {
  background: "rgba(15,15,18,0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  fontSize: 12,
  backdropFilter: "blur(10px)"
};
function ChartCard({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-50px"
  }, transition: {
    duration: 0.5
  }, className: "glass rounded-2xl p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: title }),
    children
  ] });
}
export {
  Insights as component
};
