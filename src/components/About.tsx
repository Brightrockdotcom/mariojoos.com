"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[3/4] bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 relative">
                <Image
                  src="/images/bannermario.png"
                  alt="Mario Joos"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#e50914]/20 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#e50914]/5 rounded-2xl blur-xl" />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <ScrollReveal>
              <span className="text-[#e50914] text-sm font-semibold tracking-widest uppercase mb-4 block">
                About Me
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-6 leading-tight">
                I Don&apos;t Just Advise.
                <br />
                <span className="gradient-text">I Transform.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[#a0a0a0] text-lg leading-relaxed mb-6">
                I&apos;m Mario Joos — the retention strategist behind some of
                YouTube&apos;s most-watched creators. From MrBeast to KSI, I&apos;ve
                helped channels collectively generate billions of views by
                mastering the science of keeping audiences hooked.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-[#a0a0a0] text-lg leading-relaxed mb-8">
                My approach is data-obsessed and results-driven. I analyze every
                second of audience behavior to craft strategies that don&apos;t
                just attract viewers — they create addicts. Based in Sofia,
                Bulgaria, working with the world&apos;s biggest names.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-3">
                {[
                  "Audience Retention",
                  "Content Strategy",
                  "Data Analytics",
                  "YouTube Growth",
                  "Creator Consulting",
                  "Performance Optimization",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="glass-card px-4 py-2 rounded-full text-sm text-[#a0a0a0]"
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
