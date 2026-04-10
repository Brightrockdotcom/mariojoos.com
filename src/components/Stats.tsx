"use client";

import { useCountUp } from "@/hooks/useCountUp";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { end: 10, suffix: "B+", label: "Total Views Influenced", description: "Across all client channels combined" },
  { end: 5000, suffix: "+", label: "Videos Optimized", description: "Each one analyzed frame by frame" },
  { end: 200, suffix: "+", label: "Creators Helped", description: "From startups to MrBeast" },
  { end: 98, suffix: "%", label: "Client Retention Rate", description: "They come back for more" },
];

function AnimatedStat({
  end,
  suffix,
  label,
  description,
}: {
  end: number;
  suffix: string;
  label: string;
  description: string;
}) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref} className="text-center p-8">
      <div className="font-[family-name:var(--font-space)] text-5xl md:text-6xl font-bold gradient-text mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-white text-lg font-semibold mb-1">{label}</div>
      <div className="text-[#a0a0a0] text-sm">{description}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-32 px-6 bg-[#111111] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e50914]/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#e50914] text-sm font-semibold tracking-widest uppercase mb-4 block">
              By The Numbers
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-4">
              Results That <span className="gradient-text">Speak</span>
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              Numbers don&apos;t lie. Here&apos;s the impact of data-driven retention strategy
              at scale.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="glass-card rounded-2xl">
                <AnimatedStat {...stat} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
