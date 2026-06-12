import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Plus, ArrowRight } from "lucide-react";
import { LAPTOPS, formatPrice, type Laptop } from "@/data/laptops";
import { compareStore, useCompare } from "@/component/site/CompareStore";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Laptops — LapWise AI" },
      { name: "description", content: "Compare up to three laptops side-by-side, with a clear winner per category." },
      { property: "og:title", content: "Compare Laptops — LapWise AI" },
      { property: "og:description", content: "Side-by-side laptop comparison with category-by-category winners." },
      { property: "og:url", content: "https://lapwise-ai.lovable.app/compare" },
    ],
    links: [{ rel: "canonical", href: "https://lapwise-ai.lovable.app/compare" }],
  }),
  component: Compare,
});


type Row = {
  key: string;
  label: string;
  get: (l: Laptop) => string | number;
  pick?: (vals: Array<string | number>) => number; // index of winner
};

const numWin = (vals: Array<string | number>) => {
  const nums = vals.map((v) => Number(String(v).replace(/[^\d.]/g, "")));
  return nums.indexOf(Math.max(...nums));
};
const numWinLow = (vals: Array<string | number>) => {
  const nums = vals.map((v) => Number(String(v).replace(/[^\d.]/g, "")));
  return nums.indexOf(Math.min(...nums));
};

const ROWS: Row[] = [
  { key: "price", label: "Price", get: (l) => formatPrice(l.price), pick: (v) => numWinLow(v.map((x) => String(x))) },
  { key: "cpu", label: "CPU", get: (l) => l.cpu },
  { key: "gpu", label: "GPU", get: (l) => l.gpu },
  { key: "ram", label: "RAM", get: (l) => l.ram, pick: numWin },
  { key: "storage", label: "Storage", get: (l) => l.storage, pick: numWin },
  { key: "display", label: "Display", get: (l) => l.display },
  { key: "refresh", label: "Refresh rate", get: (l) => l.refreshRate, pick: numWin },
  { key: "battery", label: "Battery", get: (l) => l.battery, pick: numWin },
  { key: "weight", label: "Weight", get: (l) => l.weight, pick: numWinLow },
  { key: "ports", label: "Ports", get: (l) => l.ports.join(", ") },
];

function Compare() {
  const ids = useCompare();
  const selected = ids.map((id) => LAPTOPS.find((l) => l.id === id)).filter(Boolean) as Laptop[];

  const remaining = LAPTOPS.filter((l) => !ids.includes(l.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Compare</h1>
          <p className="text-muted-foreground mt-2">
            Add up to {compareStore.max} laptops. We'll mark the winner per category.
          </p>
        </div>
        {selected.length > 0 && (
          <button onClick={() => compareStore.clear()} className="btn-glass">
            <X size={14} /> Clear all
          </button>
        )}
      </div>

      {selected.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="text-muted-foreground mb-6">Nothing in your compare list yet.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {LAPTOPS.slice(0, 3).map((l) => (
              <button
                key={l.id}
                onClick={() => compareStore.add(l.id)}
                className="btn-glass"
              >
                <Plus size={14} /> {l.name}
              </button>
            ))}
          </div>
          <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-[var(--cyan-accent)] mt-6">
            Browse catalog <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <>
          <div className={`grid gap-4 mb-6 grid-cols-1 sm:grid-cols-${selected.length}`} style={{ gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))` }}>
            <AnimatePresence>
              {selected.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-2xl p-4 relative"
                >
                  <button
                    onClick={() => compareStore.remove(l.id)}
                    className="absolute top-3 right-3 h-7 w-7 rounded-full grid place-items-center bg-white/5 hover:bg-white/10"
                    aria-label="Remove"
                  >
                    <X size={14} />
                  </button>
                  <img src={l.image} alt={l.name} className="w-full aspect-[4/3] object-cover rounded-xl mb-3" loading="lazy" />
                  <div className="text-xs text-muted-foreground">{l.brand}</div>
                  <div className="font-semibold">{l.name}</div>
                  <div className="text-lg font-semibold mt-1">{formatPrice(l.price)}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {ROWS.map((row, i) => {
                  const vals = selected.map(row.get);
                  const winner = row.pick && selected.length > 1 ? row.pick(vals) : -1;
                  return (
                    <tr key={row.key} className={i % 2 ? "bg-white/[0.015]" : ""}>
                      <td className="px-5 py-3 text-muted-foreground w-40 sticky left-0 bg-card/80 backdrop-blur">{row.label}</td>
                      {vals.map((v, idx) => (
                        <td key={idx} className="px-5 py-3">
                          <span className={winner === idx ? "text-[var(--cyan-accent)] font-medium inline-flex items-center gap-1.5" : ""}>
                            {winner === idx && <Check size={14} />}
                            {v}
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selected.length < compareStore.max && remaining.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm text-muted-foreground mb-3">Add another</h3>
              <div className="flex flex-wrap gap-2">
                {remaining.slice(0, 6).map((l) => (
                  <button
                    key={l.id}
                    onClick={() => compareStore.add(l.id)}
                    className="text-xs px-3 py-2 rounded-full glass hover:border-[var(--cyan-accent)]/40"
                  >
                    <Plus size={12} className="inline mr-1" /> {l.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
