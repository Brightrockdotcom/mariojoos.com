"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Mario completely changed how I think about content. His retention analysis is unlike anything I've seen. The data doesn't lie \u2014 my views exploded.",
    name: "Creator",
    role: "50M+ Subscribers",
  },
  {
    quote:
      "We were losing viewers at an alarming rate. Mario identified the exact problems, restructured our approach, and within months we were growing faster than ever.",
    name: "Creator",
    role: "25M+ Subscribers",
  },
  {
    quote:
      "For every dollar spent on his consulting, we saw 100x back in revenue from increased watch time and ad revenue. The ROI is unreal.",
    name: "Creator",
    role: "10M+ Subscribers",
  },
  {
    quote:
      "He doesn't just give advice \u2014 he gives you a complete framework for thinking about retention. It transformed my entire channel strategy.",
    name: "Creator",
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
    <section id="testimonials" className="py-32 px-6 bg-[#0a0a0a] noise-bg">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium mb-6 block">
              Testimonials
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              In their
              <br />
              <span className="gradient-text">own words.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card rounded-2xl p-10 md:p-14"
            >
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 font-light tracking-tight">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e50914]/40" />
                <div>
                  <span className="text-[#555] text-sm">
                    {testimonials[current].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative h-0.5 flex-1 bg-white/[0.04] rounded-full overflow-hidden"
            >
              {i === current && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-[#e50914]/60 rounded-full"
                />
              )}
              {i < current && (
                <div className="absolute inset-0 bg-white/[0.08] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
