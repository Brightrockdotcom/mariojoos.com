"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

function StatCounter({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(end, 2500);
  return (
    <div ref={ref} className="text-center">
      <div className="font-[family-name:var(--font-space)] text-3xl md:text-5xl font-bold gradient-text">
        {count}
        {suffix}
      </div>
      <div className="text-[#a0a0a0] text-sm mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#e50914]/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <span className="glass-card px-4 py-2 rounded-full text-sm text-[#a0a0a0] inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e50914] rounded-full animate-pulse" />
            Available for consulting
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[family-name:var(--font-space)] text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          The World&apos;s #1
          <br />
          <span className="gradient-text">Retention</span> Strategist
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-[#a0a0a0] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I help the biggest creators on YouTube keep their audiences watching.
          Data-driven strategy that turns views into empires.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#contact"
            className="glow-button px-8 py-4 rounded-full text-white font-semibold text-lg"
          >
            Start Your Transformation
          </a>
          <a
            href="#case-studies"
            className="glass-card px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors"
          >
            See Results
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          <StatCounter end={10} suffix="B+" label="Views Influenced" />
          <StatCounter end={5000} suffix="+" label="Videos Optimized" />
          <StatCounter end={8} suffix="+" label="Years Experience" />
          <StatCounter end={200} suffix="+" label="Creators Helped" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-[#e50914] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
