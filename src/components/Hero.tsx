"use client";

import Image from "next/image";
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
    <div ref={ref} className="text-center px-5 py-3">
      <div className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-semibold text-white mb-1 tracking-tight">
        {count}
        <span className="text-[#e50914]">{suffix}</span>
      </div>
      <div className="text-[#666] text-[10px] uppercase tracking-[0.15em] font-mono">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6"
    >
      {/* Background face */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="relative w-[500px] h-[600px] md:w-[600px] md:h-[750px] opacity-[0.07]">
          <Image
            src="/images/bannermario.png"
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60" />
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e50914]/[0.02] blur-[150px]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="text-[#666] text-[11px] uppercase tracking-[0.2em] font-mono">
            Retention Strategy &mdash; YouTube Growth &mdash; Creator Consulting
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-[-0.02em] mb-6"
        >
          The strategist behind
          YouTube&apos;s biggest{" "}
          <span className="gradient-text">creators.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[#999] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I turn retention data into strategies that keep audiences watching.
          The creators I work with don&apos;t just grow &mdash; they dominate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#contact"
            className="glow-button px-8 py-3.5 rounded-full text-white font-medium text-[15px]"
          >
            <span>Get in Touch</span>
          </a>
          <a
            href="#case-studies"
            className="glass-card px-8 py-3.5 rounded-full text-[#999] font-medium text-[15px] hover:text-white"
          >
            View Results
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="inline-flex glass-card rounded-2xl divide-x divide-white/[0.06]"
        >
          <StatCounter end={10} suffix="B+" label="Views" />
          <StatCounter end={5000} suffix="+" label="Videos" />
          <StatCounter end={8} suffix="yr" label="Experience" />
          <StatCounter end={200} suffix="+" label="Creators" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1 bg-white/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
