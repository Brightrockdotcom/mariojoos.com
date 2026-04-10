"use client";

import { useCountUp } from "@/hooks/useCountUp";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { end: 10, suffix: "B+", label: "Views influenced" },
  { end: 5000, suffix: "+", label: "Videos analyzed" },
  { end: 200, suffix: "+", label: "Creators transformed" },
  { end: 98, suffix: "%", label: "Client retention" },
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
    <div ref={ref} className="py-8 md:py-10 text-center">
      <div className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight mb-2">
        {count}
        <span className="text-[#e50914]">{suffix}</span>
      </div>
      <div className="text-[#666] text-[11px] font-mono uppercase tracking-[0.15em]">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
              Track Record
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
              The numbers tell{" "}
              <span className="gradient-text">the story.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.06]">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
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
