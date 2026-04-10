"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Mario completely changed how I think about content. His retention analysis is unlike anything I\u2019ve seen. The data doesn\u2019t lie \u2014 my views exploded.",
    role: "50M+ Subscribers",
  },
  {
    quote:
      "We were losing viewers at an alarming rate. Mario identified the exact problems, restructured our approach, and within months we were growing faster than ever.",
    role: "25M+ Subscribers",
  },
  {
    quote:
      "For every dollar spent on his consulting, we saw 100x back in revenue from increased watch time and ad revenue. The ROI is unreal.",
    role: "10M+ Subscribers",
  },
  {
    quote:
      "He doesn\u2019t just give advice \u2014 he gives you a complete framework for thinking about retention. It transformed my entire channel strategy.",
    role: "5M+ Subscribers",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
              Testimonials
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
              In their{" "}
              <span className="gradient-text">own words.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-10"
            >
              <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-white/80 leading-relaxed mb-6 font-light tracking-tight">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#e50914]/40" />
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#666]">
                  {testimonials[current].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative h-px flex-1 bg-white/[0.04] overflow-hidden"
            >
              {i === current && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-[#e50914]/50"
                />
              )}
              {i < current && (
                <div className="absolute inset-0 bg-white/[0.06]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
