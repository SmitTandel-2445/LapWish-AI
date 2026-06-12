import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, PolarAngleAxis,
  PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  Area, AreaChart,
} from "recharts";
import { LAPTOPS } from "@/data/laptops";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "AI Insights Dashboard — LapWise AI" },
      { name: "description", content: "Live analytics: most recommended laptops, popular brands, and budget trends." },
      { property: "og:title", content: "AI Insights Dashboard — LapWise AI" },
      { property: "og:description", content: "Trending laptop picks, popular brands, and shifting budgets — visualized." },
      { property: "og:url", content: "https://lapwise-ai.lovable.app/insights" },
    ],
    links: [{ rel: "canonical", href: "https://lapwise-ai.lovable.app/insights" }],
  }),
  component: Insights,
});


const CYAN = "oklch(0.85 0.18 210)";
const VIOLET = "oklch(0.55 0.24 295)";

const recommended = [...LAPTOPS]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6)
  .map((l) => ({ name: l.name.replace(/MacBook|Air|Pro/g, "").trim() || l.name, score: Math.round(l.rating * 18 + Math.random() * 4) }));

const brandCounts = LAPTOPS.reduce<Record<string, number>>((a, l) => {
  a[l.brand] = (a[l.brand] ?? 0) + 1;
  return a;
}, {});
const brandData = Object.entries(brandCounts).map(([name, value]) => ({ name, value }));
const COLORS = [CYAN, VIOLET, "oklch(0.75 0.15 180)", "oklch(0.65 0.2 320)", "oklch(0.7 0.18 250)", "oklch(0.6 0.2 30)"];

const budget = [
  { range: "<40k", picks: 12 },
  { range: "40–60k", picks: 28 },
  { range: "60–80k", picks: 41 },
  { range: "80k–1L", picks: 33 },
  { range: ">1L", picks: 22 },
];

const radar = ["Performance", "Gaming", "Battery", "Productivity", "Portability"].map((axis) => ({
  axis,
  avg: Math.round(
    LAPTOPS.reduce((s, l) => {
      const key = axis.toLowerCase() as keyof typeof l.scores;
      return s + (l.scores[key] ?? 0);
    }, 0) / LAPTOPS.length,
  ),
}));

function Insights() {
  const [range, setRange] = useState<"7d" | "30d" | "all">("30d");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-2">Live data</div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground mt-2">What our recommender is picking right now.</p>
        </div>
        <div className="glass rounded-full p-1 inline-flex text-sm">
          {(["7d", "30d", "all"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-full transition ${
                range === r ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "All time"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <ChartCard title="Most recommended laptops">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recommended} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.6)" fontSize={11} width={120} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill={CYAN} radius={[0, 8, 8, 0]} animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Popular brands">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={brandData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                {brandData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Budget distribution">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={budget}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CYAN} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="range" stroke="rgba(255,255,255,0.5)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="picks" stroke={CYAN} fill="url(#grad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Average performance profile">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radar}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="axis" stroke="rgba(255,255,255,0.6)" fontSize={11} />
              <Radar dataKey="avg" stroke={VIOLET} fill={VIOLET} fillOpacity={0.35} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: "rgba(15,15,18,0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  fontSize: 12,
  backdropFilter: "blur(10px)",
} as const;

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}
