"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Audience Retention Analysis",
    description:
      "Deep-dive analysis of your audience retention graphs, identifying exact drop-off points and patterns. I decode viewer behavior to find what keeps them watching — and what makes them leave.",
    icon: "01",
    features: [
      "Frame-by-frame retention analysis",
      "Drop-off pattern identification",
      "Benchmark comparison",
      "Actionable improvement roadmap",
    ],
  },
  {
    title: "Content Strategy",
    description:
      "End-to-end content strategy built on data, not guesswork. From topic selection to video structure, every decision is engineered to maximize watch time and subscriber conversion.",
    icon: "02",
    features: [
      "Topic research & validation",
      "Video structure blueprints",
      "Thumbnail & title strategy",
      "Publishing cadence optimization",
    ],
  },
  {
    title: "Creator Consulting",
    description:
      "One-on-one strategic partnership with hands-on guidance. I embed myself in your creative process to transform how you think about content, retention, and growth.",
    icon: "03",
    features: [
      "1-on-1 strategy sessions",
      "Pre-publish video reviews",
      "Real-time analytics feedback",
      "Long-term growth planning",
    ],
  },
  {
    title: "Channel Growth Architecture",
    description:
      "Complete channel optimization from the algorithm level up. I architect your channel's growth engine — from metadata to viewer journey — to compound views over time.",
    icon: "04",
    features: [
      "Algorithm optimization",
      "Channel page redesign",
      "Series & playlist strategy",
      "Cross-promotion frameworks",
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
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#e50914] text-sm font-semibold tracking-widest uppercase mb-4 block">
              Services
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-4">
              How I <span className="gradient-text">Transform</span> Channels
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              Every service is built on the same foundation: obsessive data
              analysis combined with creative intuition that comes from years at
              the top.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <TiltCard>
                <motion.div
                  whileHover={{ borderColor: "rgba(229, 9, 20, 0.3)" }}
                  className="glass-card rounded-2xl p-8 h-full group cursor-default"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-[family-name:var(--font-space)] text-4xl font-bold text-white/10 group-hover:text-[#e50914]/30 transition-colors">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                    {service.title}
                  </h3>
                  <p className="text-[#a0a0a0] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-[#a0a0a0]"
                      >
                        <span className="w-1.5 h-1.5 bg-[#e50914] rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
