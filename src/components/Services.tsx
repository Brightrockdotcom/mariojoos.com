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
      "Every decision &mdash; from topic to thumbnail to structure &mdash; engineered around data. No guesswork, no trends-chasing. Just strategy that compounds.",
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
      "Deep strategic partnership where I embed in your creative process. I don&apos;t just review videos &mdash; I reshape how you think about content.",
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
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
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
    <section id="services" className="py-32 px-6 bg-[#0a0a0a] noise-bg">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium mb-6 block">
              Services
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              What I do for
              <br />
              <span className="gradient-text">the creators I work with.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass-card rounded-2xl p-8 md:p-10 h-full group cursor-default">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#e50914] to-transparent rounded-full" />
                    <h3 className="font-[family-name:var(--font-space)] text-xl font-semibold tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p
                    className="text-[#888] leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-[#555] group-hover:text-[#888] transition-colors"
                      >
                        <span className="w-1 h-1 bg-[#e50914]/60 rounded-full flex-shrink-0" />
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
