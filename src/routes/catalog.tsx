import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { LAPTOPS, BRANDS, USAGE_OPTIONS, formatPrice } from "@/data/laptops";
import { LaptopCard } from "@/component/site/LaptopCard";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Laptop Catalog — LapWise AI" },
      { name: "description", content: "Browse our curated laptop catalog. Filter by brand, price, RAM, and usage to find your ideal machine." },
      { property: "og:title", content: "Laptop Catalog — LapWise AI" },
      { property: "og:description", content: "Browse and filter 40+ curated laptops by brand, price, RAM, and usage." },
      { property: "og:url", content: "https://lapwise-ai.lovable.app/catalog" },
    ],
    links: [{ rel: "canonical", href: "https://lapwise-ai.lovable.app/catalog" }],
  }),
  component: Catalog,
});


const RAM_OPTIONS = ["8 GB", "16 GB", "32 GB"];

function Catalog() {
  const max = Math.max(...LAPTOPS.map((l) => l.price));
  const [priceMax, setPriceMax] = useState(max);
  const [brands, setBrands] = useState<string[]>([]);
  const [ram, setRam] = useState<string | null>(null);
  const [usage, setUsage] = useState<string[]>([]);
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

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const Filters = (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Max price</h4>
        <input
          type="range"
          min={30000}
          max={max}
          step={5000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-[var(--cyan-accent)]"
        />
        <div className="text-sm text-muted-foreground mt-2">{formatPrice(priceMax)}</div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Brand</h4>
        <div className="space-y-2">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={() => setBrands((a) => toggle(a, b))}
                className="accent-[var(--cyan-accent)]"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">RAM</h4>
        <div className="space-y-2">
          {RAM_OPTIONS.map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="ram"
                checked={ram === r}
                onChange={() => setRam(r)}
                className="accent-[var(--cyan-accent)]"
              />
              <span>{r}+</span>
            </label>
          ))}
          {ram && (
            <button onClick={() => setRam(null)} className="text-xs text-muted-foreground hover:text-foreground">
              Clear
            </button>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Usage</h4>
        <div className="flex flex-wrap gap-2">
          {USAGE_OPTIONS.map((u) => {
            const on = usage.includes(u);
            return (
              <button
                key={u}
                onClick={() => setUsage((a) => toggle(a, u))}
                className={`text-xs px-2.5 py-1 rounded-full border transition ${
                  on
                    ? "border-[var(--cyan-accent)] bg-[var(--cyan-accent)]/10"
                    : "border-white/10 hover:border-white/30 text-muted-foreground"
                }`}
              >
                {u}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Catalog</h1>
          <p className="text-muted-foreground mt-2">
            {filtered.length} {filtered.length === 1 ? "laptop" : "laptops"} matching your filters
          </p>
        </div>
        <button onClick={() => setOpen(true)} className="lg:hidden btn-glass">
          <Filter size={14} /> Filters
        </button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block glass rounded-2xl p-6 h-fit sticky top-28">
          {Filters}
        </aside>

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                <button onClick={() => setOpen(false)} aria-label="Close filters"><X size={18} /></button>
              </div>
              {Filters}
            </motion.div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((l) => <LaptopCard key={l.id} laptop={l} />)}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground glass rounded-2xl">
              No matches. Try widening your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
