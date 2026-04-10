"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <ScrollReveal direction="left" className="md:col-span-2">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06] relative">
                <Image
                  src="/images/bannermario.png"
                  alt="Mario Joos"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-30" />
              </div>
            </div>
          </ScrollReveal>

          <div className="md:col-span-3">
            <ScrollReveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
                About
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold mb-6 leading-[1.1] tracking-tight">
                Obsessed with what makes
                people <span className="gradient-text">keep watching.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[#999] text-base leading-relaxed mb-5">
                I&apos;m Mario Joos. I&apos;ve spent 8+ years studying why people
                click away &mdash; and more importantly, why they don&apos;t. That
                obsession led me to work with some of the most-watched creators
                on YouTube, helping them collectively generate billions of views.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-[#999] text-base leading-relaxed mb-8">
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
                    className="px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] text-[#555] border border-white/[0.06]"
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
