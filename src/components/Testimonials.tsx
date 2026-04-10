"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Mario completely changed how I think about content. His retention analysis is unlike anything I've seen. The data doesn't lie — my views exploded.",
    name: "Creator A",
    role: "50M+ Subscribers",
  },
  {
    quote:
      "We were losing viewers at an alarming rate. Mario identified the exact problems, restructured our approach, and within months we were growing faster than ever.",
    name: "Creator B",
    role: "25M+ Subscribers",
  },
  {
    quote:
      "The ROI of working with Mario is insane. For every dollar spent on his consulting, we saw 100x back in revenue from increased watch time and ad revenue.",
    name: "Creator C",
    role: "10M+ Subscribers",
  },
  {
    quote:
      "Mario doesn't just give advice — he gives you a complete framework for thinking about retention. It transformed my entire channel strategy.",
    name: "Creator D",
    role: "5M+ Subscribers",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-32 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#e50914]/3 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#e50914] text-sm font-semibold tracking-widest uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-4">
              What Creators <span className="gradient-text">Say</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-10 md:p-12 text-center"
            >
              <div className="text-4xl text-[#e50914] mb-6">&ldquo;</div>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                {testimonials[current].quote}
              </p>
              <div>
                <div className="font-[family-name:var(--font-space)] font-bold text-white">
                  {testimonials[current].name}
                </div>
                <div className="text-[#a0a0a0] text-sm">
                  {testimonials[current].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-[#e50914] w-8"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
