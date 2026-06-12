import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GitCompare,
  BarChart3,
  Zap,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { HeroLaptop } from "@/component/site/HeroLaptop";
import { LaptopCard } from "@/component/site/LaptopCard";
import { LAPTOPS } from "@/data/laptops";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LapWise AI — Find Your Perfect Laptop with AI" },
      {
        name: "description",
        content:
          "Get personalized laptop recommendations based on your budget, needs, and preferences. Compare, decide, buy with confidence.",
      },
      { property: "og:title", content: "LapWise AI — Find Your Perfect Laptop with AI" },
      { property: "og:description", content: "Personalized laptop recommendations based on your budget, needs, and preferences." },
      { property: "og:url", content: "https://lapwise-ai.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://lapwise-ai.lovable.app/" }],
  }),
  component: Home,
});


const features = [
  {
    icon: Sparkles,
    title: "AI Recommendation Wizard",
    desc: "Answer three questions, get a curated shortlist scored to your needs.",
  },
  {
    icon: GitCompare,
    title: "Side-by-side Compare",
    desc: "Match up to three laptops with category-by-category winners.",
  },
  {
    icon: BarChart3,
    title: "Live Insights",
    desc: "See trending picks, popular brands, and shifting budgets.",
  },
];

function Home() {
  const trending = LAPTOPS.filter((l) => l.badge).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan-accent)] animate-pulse" />
              Powered by AI · Built for India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
            >
              Find your perfect{" "}
              <span className="text-gradient">laptop</span> with AI.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              Personalized laptop recommendations based on your budget, needs,
              and preferences — without the spec-sheet fatigue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/wizard" className="btn-primary">
                Start Recommendation <ArrowRight size={16} />
              </Link>
              <Link to="/compare" className="btn-glass">
                Compare Laptops
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 pt-4 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[var(--cyan-accent)]" />
                Unbiased
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[var(--cyan-accent)]" />
                Instant matches
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-[var(--cyan-accent)]" />
                {LAPTOPS.length}+ models
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <HeroLaptop />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:border-[var(--cyan-accent)]/30 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--cyan-accent)]/30 to-[var(--violet-accent)]/30 grid place-items-center mb-4">
                <f.icon size={18} className="text-[var(--cyan-accent)]" />
              </div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--cyan-accent)] mb-2">
              Trending
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              What people are picking
            </h2>
          </div>
          <Link to="/catalog" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trending.map((l) => (
            <div key={l.id} className="snap-start shrink-0 w-[320px]">
              <LaptopCard laptop={l} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="relative glass-strong rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-[80%] bg-[var(--cyan-accent)]/30 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
              Stop second-guessing your next laptop.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Let LapWise AI shortlist three machines that fit you. Takes 30 seconds.
            </p>
            <Link to="/wizard" className="btn-primary mt-8">
              Get my recommendation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
