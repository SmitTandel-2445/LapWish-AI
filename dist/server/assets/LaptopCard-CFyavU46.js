import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Check, Plus } from "lucide-react";
import { f as formatPrice } from "./router-BX9NRSdj.js";
import { u as useCompare, c as compareStore } from "./CompareStore-JOIL09g3.js";
function LaptopCard({ laptop, score }) {
  const ids = useCompare();
  const inCompare = ids.includes(laptop.id);
  return /* @__PURE__ */ jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.4 },
      whileHover: { y: -4 },
      className: "group relative glass rounded-2xl overflow-hidden flex flex-col",
      children: [
        laptop.badge && /* @__PURE__ */ jsx("span", { className: "absolute top-3 left-3 z-10 text-[10px] tracking-wider uppercase font-medium px-2 py-1 rounded-full glass-strong text-[var(--cyan-accent)]", children: laptop.badge }),
        typeof score === "number" && /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 z-10 h-12 w-12 rounded-full glass-strong grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground leading-none", children: "Match" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "text-sm font-semibold leading-tight",
              style: {
                color: score > 75 ? "var(--cyan-accent)" : score > 55 ? "white" : "var(--muted-foreground)"
              },
              children: score
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: laptop.image,
              alt: laptop.name,
              loading: "lazy",
              width: 900,
              height: 675,
              className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col gap-3 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: laptop.brand }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold leading-tight", children: laptop.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Star, { size: 12, className: "fill-[var(--cyan-accent)] text-[var(--cyan-accent)]" }),
              laptop.rating
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("div", { className: "truncate", title: laptop.cpu, children: [
              "CPU ",
              laptop.cpu
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "truncate", title: laptop.gpu, children: [
              "GPU ",
              laptop.gpu
            ] }),
            /* @__PURE__ */ jsx("div", { children: laptop.ram }),
            /* @__PURE__ */ jsx("div", { children: laptop.storage })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between gap-2 pt-2", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-lg", children: formatPrice(laptop.price) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => inCompare ? compareStore.remove(laptop.id) : compareStore.add(laptop.id),
                  className: "h-9 w-9 grid place-items-center rounded-full glass hover:border-[var(--cyan-accent)] transition-colors",
                  "aria-label": inCompare ? "Remove from compare" : "Add to compare",
                  title: inCompare ? "Remove from compare" : "Add to compare",
                  children: inCompare ? /* @__PURE__ */ jsx(Check, { size: 16, className: "text-[var(--cyan-accent)]" }) : /* @__PURE__ */ jsx(Plus, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/laptop/$id",
                  params: { id: laptop.id },
                  className: "text-xs px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors",
                  children: "Details"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  LaptopCard as L
};
