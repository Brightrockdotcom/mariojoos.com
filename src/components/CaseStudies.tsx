"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const caseStudies = [
  {
    client: "Major Creator &middot; 50M+ subs",
    title: "Retention rebuilt from the ground up.",
    description:
      "Identified exact drop-off patterns across 200+ videos. Restructured content pacing and hook strategy. The result spoke for itself.",
    beforeMetric: "38%",
    afterMetric: "67%",
    metricLabel: "Avg. Retention",
    impact: "+340M views in 6 months",
  },
  {
    client: "Gaming Creator &middot; 10M+ subs",
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
    <section id="case-studies" className="py-32 px-6 noise-bg">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium mb-6 block">
              Results
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Work that
              <br />
              <span className="gradient-text">speaks for itself.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-5">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="glass-card rounded-2xl p-8 md:p-10 cursor-default"
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Left: Content */}
                  <div className="md:col-span-2">
                    <span
                      className="text-[#555] text-xs uppercase tracking-wider mb-3 block"
                      dangerouslySetInnerHTML={{ __html: study.client }}
                    />
                    <h3 className="font-[family-name:var(--font-space)] text-2xl md:text-3xl font-bold tracking-tight mb-3">
                      {study.title}
                    </h3>
                    <p className="text-[#888] leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex items-center gap-6 md:justify-end">
                    <div className="text-center">
                      <div className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Before</div>
                      <div className="font-[family-name:var(--font-space)] text-2xl font-bold text-[#444]">
                        {study.beforeMetric}
                      </div>
                    </div>
                    <div className="text-[#333] text-lg">&rarr;</div>
                    <div className="text-center">
                      <div className="text-[#e50914] text-[10px] uppercase tracking-wider mb-1">After</div>
                      <div className="font-[family-name:var(--font-space)] text-2xl font-bold text-white">
                        {study.afterMetric}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/[0.04] flex flex-wrap items-center gap-4">
                  <span className="text-[#555] text-xs uppercase tracking-wider">
                    {study.metricLabel}
                  </span>
                  <span className="text-[10px] px-3 py-1 rounded-full border border-[#e50914]/20 text-[#e50914] uppercase tracking-wider font-medium">
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
