"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const caseStudies = [
  {
    client: "Major Creator \u00b7 50M+ subs",
    title: "Retention rebuilt from the ground up.",
    description:
      "Identified exact drop-off patterns across 200+ videos. Restructured content pacing and hook strategy. The result spoke for itself.",
    beforeMetric: "38%",
    afterMetric: "67%",
    metricLabel: "Avg. Retention",
    impact: "+340M views in 6 months",
  },
  {
    client: "Gaming Creator \u00b7 10M+ subs",
    title: "A dying channel, revived.",
    description:
      "Views were falling month over month. Algorithm was punishing every upload. Deep retention analysis + content pivot reversed everything.",
    beforeMetric: "2.1M",
    afterMetric: "12.8M",
    metricLabel: "Monthly Views",
    impact: "6x growth in viewership",
  },
  {
    client: "Emerging Creator",
    title: "Zero to millions, retention-first.",
    description:
      "Built the entire channel strategy around retention data before the first video was even published. Every decision was intentional.",
    beforeMetric: "0",
    afterMetric: "5M+",
    metricLabel: "Subscribers",
    impact: "Fastest-growing in niche",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
              Results
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
              Work that{" "}
              <span className="gradient-text">speaks for itself.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="glass-card rounded-2xl p-6 md:p-8 cursor-default"
              >
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#555] mb-2 block">
                      {study.client}
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-semibold tracking-tight mb-2">
                      {study.title}
                    </h3>
                    <p className="text-[#999] text-[15px] leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 md:justify-end">
                    <div className="text-center">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-[#555] mb-1">Before</div>
                      <div className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#444]">
                        {study.beforeMetric}
                      </div>
                    </div>
                    <div className="text-[#333]">&rarr;</div>
                    <div className="text-center">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-[#e50914] mb-1">After</div>
                      <div className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                        {study.afterMetric}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-white/[0.04] flex flex-wrap items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#555]">
                    {study.metricLabel}
                  </span>
                  <span className="font-mono text-[9px] px-2.5 py-1 rounded-full border border-[#e50914]/20 text-[#e50914] uppercase tracking-wider">
                    {study.impact}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
