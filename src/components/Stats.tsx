"use client";

import { useCountUp } from "@/hooks/useCountUp";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { end: 10, suffix: "B+", label: "Views influenced across client channels" },
  { end: 5000, suffix: "+", label: "Videos analyzed and optimized" },
  { end: 200, suffix: "+", label: "Creators transformed" },
  { end: 98, suffix: "%", label: "Client retention rate" },
];

function AnimatedStat({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(end, 2200);
  return (
    <div ref={ref} className="py-10 md:py-16 text-center">
      <div className="font-[family-name:var(--font-space)] text-5xl md:text-7xl font-bold tracking-tight mb-3">
        {count}
        <span className="text-[#e50914]">{suffix}</span>
      </div>
      <div className="text-[#555] text-sm max-w-[180px] mx-auto leading-snug">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-32 px-6 noise-bg">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium mb-6 block">
              Track Record
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              The numbers tell
              <br />
              <span className="gradient-text">the story.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.04]">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="bg-[#050505]">
                <AnimatedStat {...stat} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
