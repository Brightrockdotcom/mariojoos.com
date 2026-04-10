"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Retention Analysis",
    description:
      "Frame-by-frame analysis of where viewers drop off and why. I decode the data others overlook to find the exact moments that make or break a video.",
    features: [
      "Drop-off pattern mapping",
      "Benchmark comparisons",
      "Pacing optimization",
      "Actionable improvement plans",
    ],
  },
  {
    title: "Content Strategy",
    description:
      "Every decision \u2014 from topic to thumbnail to structure \u2014 engineered around data. No guesswork, no trends-chasing. Just strategy that compounds.",
    features: [
      "Topic validation frameworks",
      "Video structure blueprints",
      "Title & thumbnail strategy",
      "Publishing cadence design",
    ],
  },
  {
    title: "1:1 Consulting",
    description:
      "Deep strategic partnership where I embed in your creative process. I don\u2019t just review videos \u2014 I reshape how you think about content.",
    features: [
      "Dedicated strategy sessions",
      "Pre-publish video review",
      "Real-time analytics feedback",
      "Long-term growth architecture",
    ],
  },
  {
    title: "Channel Architecture",
    description:
      "Complete channel optimization from the algorithm level up. I build growth engines that compound views and subscribers over time.",
    features: [
      "Algorithm positioning",
      "Series & playlist strategy",
      "Cross-promotion frameworks",
      "Viewer journey mapping",
    ],
  },
];

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.2s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
              Services
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
              What I do for the creators{" "}
              <span className="gradient-text">I work with.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <div className="glass-card rounded-2xl p-6 md:p-8 h-full group cursor-default">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-[#e50914] to-transparent rounded-full" />
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[#999] text-[15px] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-[13px] text-[#555] group-hover:text-[#888] transition-colors"
                      >
                        <span className="w-1 h-1 bg-[#e50914]/50 rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
