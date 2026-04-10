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
    <div ref={ref} className="text-center px-6 py-4">
      <div className="font-[family-name:var(--font-space)] text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
        {count}
        <span className="text-[#e50914]">{suffix}</span>
      </div>
      <div className="text-[#555] text-xs uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 noise-bg"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#e50914]/[0.03] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#ff6b35]/[0.02] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium">
            Retention Strategy &mdash; YouTube Growth &mdash; Creator Consulting
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-[family-name:var(--font-space)] text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.0] tracking-[-0.03em] mb-8 text-balance"
        >
          The strategist behind
          <br />
          YouTube&apos;s biggest
          <br />
          <span className="gradient-text">creators.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[#888] text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          I turn retention data into strategies that keep audiences watching.
          The creators I work with don&apos;t just grow &mdash; they dominate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#contact"
            className="glow-button px-8 py-4 rounded-full text-white font-medium text-base"
          >
            <span>Get in Touch</span>
          </a>
          <a
            href="#case-studies"
            className="glass-card px-8 py-4 rounded-full text-[#888] font-medium text-base hover:text-white"
          >
            View Results
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="inline-flex glass-card rounded-2xl divide-x divide-white/5"
        >
          <StatCounter end={10} suffix="B+" label="Views" />
          <StatCounter end={5000} suffix="+" label="Videos" />
          <StatCounter end={8} suffix="yr" label="Experience" />
          <StatCounter end={200} suffix="+" label="Creators" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
