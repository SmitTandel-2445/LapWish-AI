import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, Check, Star } from "lucide-react";
import { type Laptop, formatPrice } from "@/data/laptops";
import { compareStore, useCompare } from "./CompareStore";

export function LaptopCard({ laptop, score }: { laptop: Laptop; score?: number }) {
  const ids = useCompare();
  const inCompare = ids.includes(laptop.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative glass rounded-2xl overflow-hidden flex flex-col"
    >
      {laptop.badge && (
        <span className="absolute top-3 left-3 z-10 text-[10px] tracking-wider uppercase font-medium px-2 py-1 rounded-full glass-strong text-[var(--cyan-accent)]">
          {laptop.badge}
        </span>
      )}
      {typeof score === "number" && (
        <div className="absolute top-3 right-3 z-10 h-12 w-12 rounded-full glass-strong grid place-items-center">
          <div className="text-center">
            <div className="text-[10px] text-muted-foreground leading-none">Match</div>
            <div
              className="text-sm font-semibold leading-tight"
              style={{
                color: score > 75 ? "var(--cyan-accent)" : score > 55 ? "white" : "var(--muted-foreground)",
              }}
            >
              {score}
            </div>
          </div>
        </div>
      )}

      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
        <img
          src={laptop.image}
          alt={laptop.name}
          loading="lazy"
          width={900}
          height={675}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs text-muted-foreground">{laptop.brand}</div>
            <h3 className="font-semibold leading-tight">{laptop.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star size={12} className="fill-[var(--cyan-accent)] text-[var(--cyan-accent)]" />
            {laptop.rating}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="truncate" title={laptop.cpu}>CPU {laptop.cpu}</div>
          <div className="truncate" title={laptop.gpu}>GPU {laptop.gpu}</div>
          <div>{laptop.ram}</div>
          <div>{laptop.storage}</div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="font-semibold text-lg">{formatPrice(laptop.price)}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                inCompare ? compareStore.remove(laptop.id) : compareStore.add(laptop.id)
              }
              className="h-9 w-9 grid place-items-center rounded-full glass hover:border-[var(--cyan-accent)] transition-colors"
              aria-label={inCompare ? "Remove from compare" : "Add to compare"}
              title={inCompare ? "Remove from compare" : "Add to compare"}
            >
              {inCompare ? <Check size={16} className="text-[var(--cyan-accent)]" /> : <Plus size={16} />}
            </button>
            <Link
              to="/laptop/$id"
              params={{ id: laptop.id }}
              className="text-xs px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
