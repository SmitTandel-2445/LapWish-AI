import { motion } from "framer-motion";
import heroLaptop from "@/assets/hero-laptop.png";
import { useRef } from "react";

export function HeroLaptop() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 18).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className="relative w-full aspect-square max-w-xl mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-12 rounded-full bg-[var(--cyan-accent)]/20 blur-3xl animate-pulse-glow" />
        <div className="absolute inset-20 rounded-full bg-[var(--violet-accent)]/25 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.2s" }} />
      </div>

      {/* Orbit ring */}
      <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
      <div className="absolute inset-6 rounded-full border border-white/[0.03]" />

      {/* Dot grid backdrop */}
      <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transformStyle: "preserve-3d",
          transition: "transform 0.25s ease-out",
        }}
      >
        <img
          src={heroLaptop}
          alt="LapWise AI laptop"
          width={1024}
          height={1024}
          className="w-full h-full object-contain animate-float drop-shadow-[0_30px_60px_rgba(0,229,255,0.25)]"
        />
      </motion.div>
    </div>
  );
}
