import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, X, Plus, ArrowLeft } from "lucide-react";
import { LAPTOPS, formatPrice } from "@/data/laptops";
import { compareStore, useCompare } from "@/component/site/CompareStore";
import { LaptopCard } from "@/component/site/LaptopCard";

export const Route = createFileRoute("/laptop/$id")({
  loader: ({ params }) => {
    const laptop = LAPTOPS.find((l) => l.id === params.id);
    if (!laptop) throw notFound();
    return { laptop };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.laptop.name} — LapWise AI` },
          { name: "description", content: loaderData.laptop.summary },
          { property: "og:title", content: loaderData.laptop.name },
          { property: "og:description", content: loaderData.laptop.summary },
          { property: "og:image", content: loaderData.laptop.image },
          { property: "og:type", content: "product" },
          { property: "og:url", content: `https://lapwise-ai.lovable.app/laptop/${loaderData.laptop.id}` },
        ]
      : [{ title: "Laptop — LapWise AI" }],
    links: loaderData
      ? [{ rel: "canonical", href: `https://lapwise-ai.lovable.app/laptop/${loaderData.laptop.id}` }]
      : [],
    scripts: loaderData
      ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.laptop.name,
            brand: { "@type": "Brand", name: loaderData.laptop.brand },
            image: loaderData.laptop.image,
            description: loaderData.laptop.summary,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: loaderData.laptop.price,
              availability: "https://schema.org/InStock",
            },
          }),
        }]
      : [],
  }),

  notFoundComponent: () => (
    <div className="text-center py-32">
      <h1 className="text-3xl font-semibold">Laptop not found</h1>
      <Link to="/catalog" className="btn-primary mt-6">Browse catalog</Link>
    </div>
  ),
  component: Detail,
});

function ScoreRing({ label, value }: { label: string; value: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="url(#g)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${c}` }}
            whileInView={{ strokeDasharray: `${dash} ${c}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.18 210)" />
              <stop offset="100%" stopColor="oklch(0.55 0.24 295)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-xl font-semibold">{value}</div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Detail() {
  const { laptop } = Route.useLoaderData();
  const ids = useCompare();
  const inCompare = ids.includes(laptop.id);

  const similar = LAPTOPS.filter(
    (l) => l.id !== laptop.id && l.usage.some((u) => laptop.usage.includes(u)),
  ).slice(0, 3);

  return (
    <div>
      {/* sticky bar */}
      <div className="sticky top-20 z-20 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/catalog" className="text-muted-foreground hover:text-foreground" aria-label="Back to catalog"><ArrowLeft size={16} /></Link>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{laptop.brand}</div>
              <div className="font-medium truncate">{laptop.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-semibold">{formatPrice(laptop.price)}</div>
            <button
              onClick={() => (inCompare ? compareStore.remove(laptop.id) : compareStore.add(laptop.id))}
              className={inCompare ? "btn-glass" : "btn-primary"}
            >
              {inCompare ? <><Check size={14} /> Added</> : <><Plus size={14} /> Compare</>}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative glass rounded-3xl aspect-square overflow-hidden"
        >
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-accent)]/10 to-[var(--violet-accent)]/10" />
          <img
            src={laptop.image}
            alt={laptop.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <div>
          {laptop.badge && (
            <span className="text-xs uppercase tracking-wider text-[var(--cyan-accent)]">
              {laptop.badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mt-2">{laptop.name}</h1>
          <p className="text-muted-foreground mt-4 text-lg">{laptop.summary}</p>

          <div className="grid grid-cols-5 gap-3 mt-8">
            <ScoreRing label="Performance" value={laptop.scores.performance} />
            <ScoreRing label="Gaming" value={laptop.scores.gaming} />
            <ScoreRing label="Battery" value={laptop.scores.battery} />
            <ScoreRing label="Productivity" value={laptop.scores.productivity} />
            <ScoreRing label="Portability" value={laptop.scores.portability} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-8">
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-medium mb-3 text-[var(--cyan-accent)]">Pros</h3>
              <ul className="space-y-2 text-sm">
                {laptop.pros.map((p: string) => (
                  <li key={p} className="flex gap-2"><Check size={14} className="text-[var(--cyan-accent)] mt-0.5 shrink-0" /> {p}</li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Cons</h3>
              <ul className="space-y-2 text-sm">
                {laptop.cons.map((p: string) => (
                  <li key={p} className="flex gap-2"><X size={14} className="text-muted-foreground mt-0.5 shrink-0" /> {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">Full specifications</h2>
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["CPU", laptop.cpu],
                ["GPU", laptop.gpu],
                ["RAM", laptop.ram],
                ["Storage", laptop.storage],
                ["Display", laptop.display],
                ["Refresh rate", laptop.refreshRate],
                ["Battery", laptop.battery],
                ["Weight", laptop.weight],
                ["Ports", laptop.ports.join(", ")],
                ["Best for", laptop.usage.join(", ")],
              ].map(([k, v], i) => (
                <tr key={k} className={i % 2 ? "bg-white/[0.015]" : ""}>
                  <td className="px-5 py-3 text-muted-foreground w-40">{k}</td>
                  <td className="px-5 py-3">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Similar alternatives</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.map((l) => <LaptopCard key={l.id} laptop={l} />)}
          </div>
        </section>
      )}
    </div>
  );
}
