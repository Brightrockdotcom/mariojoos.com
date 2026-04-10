"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 noise-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-16 items-center">
          {/* Photo — 2 columns */}
          <ScrollReveal direction="left" className="md:col-span-2">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 relative">
                <Image
                  src="/images/bannermario.png"
                  alt="Mario Joos"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40" />
              </div>
            </div>
          </ScrollReveal>

          {/* Content — 3 columns */}
          <div className="md:col-span-3">
            <ScrollReveal>
              <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium mb-6 block">
                About
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-8 leading-[1.1] tracking-tight">
                Obsessed with what makes
                <br />
                people <span className="gradient-text">keep watching.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[#888] text-lg leading-relaxed mb-5">
                I&apos;m Mario Joos. I&apos;ve spent 8+ years studying why people
                click away &mdash; and more importantly, why they don&apos;t. That
                obsession led me to work with some of the most-watched creators
                on YouTube, helping them collectively generate billions of views.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-[#888] text-lg leading-relaxed mb-10">
                My approach is simple: every second of every video tells a story
                in the data. I read that story and translate it into strategies
                that creators can feel in their analytics within weeks.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-2">
                {[
                  "Retention Analysis",
                  "Content Strategy",
                  "Data Analytics",
                  "YouTube Growth",
                  "Creator Consulting",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wider text-[#555] border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
