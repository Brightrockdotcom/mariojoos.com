"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const caseStudies = [
  {
    title: "Viral Content Engine",
    client: "Major Creator (50M+ subs)",
    description:
      "Rebuilt their entire content strategy around retention data. Identified the exact moments viewers dropped off and restructured video pacing to keep them hooked.",
    beforeMetric: "38%",
    afterMetric: "67%",
    metricLabel: "Average Retention Rate",
    impact: "+340M views in 6 months",
  },
  {
    title: "Channel Resurrection",
    client: "Gaming Creator (10M+ subs)",
    description:
      "A channel in decline — views falling, algorithm punishing. Through deep retention analysis and content pivoting, we reversed the trend completely.",
    beforeMetric: "2.1M",
    afterMetric: "12.8M",
    metricLabel: "Avg Monthly Views",
    impact: "6x growth in viewership",
  },
  {
    title: "Launch to Dominance",
    client: "Emerging Creator",
    description:
      "Took a brand new channel from zero to millions of subscribers using retention-first content strategy and algorithmic positioning.",
    beforeMetric: "0",
    afterMetric: "5M+",
    metricLabel: "Subscribers",
    impact: "Fastest-growing in niche",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-32 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#e50914] text-sm font-semibold tracking-widest uppercase mb-4 block">
              Case Studies
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-4">
              Real <span className="gradient-text">Transformations</span>
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              Every engagement is measured by one thing: did the numbers go up?
              Here&apos;s the proof.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card rounded-2xl p-8 h-full flex flex-col"
              >
                <span className="text-[#e50914] text-xs font-semibold tracking-widest uppercase mb-2">
                  {study.client}
                </span>
                <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-4">
                  {study.title}
                </h3>
                <p className="text-[#a0a0a0] leading-relaxed mb-8 flex-grow">
                  {study.description}
                </p>

                {/* Before/After */}
                <div className="border-t border-white/5 pt-6">
                  <div className="text-xs text-[#a0a0a0] mb-3 uppercase tracking-wider">
                    {study.metricLabel}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center flex-1">
                      <div className="text-[#666] text-xs mb-1">Before</div>
                      <div className="font-[family-name:var(--font-space)] text-2xl font-bold text-[#a0a0a0]">
                        {study.beforeMetric}
                      </div>
                    </div>
                    <div className="text-[#e50914] text-2xl">→</div>
                    <div className="text-center flex-1">
                      <div className="text-[#e50914] text-xs mb-1">After</div>
                      <div className="font-[family-name:var(--font-space)] text-2xl font-bold gradient-text">
                        {study.afterMetric}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-block glass-card px-3 py-1 rounded-full text-xs text-[#e50914] font-semibold">
                      {study.impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
