"use client";

import ScrollReveal from "./ScrollReveal";

const clients = [
  "MrBeast",
  "KSI",
  "Stokes Twins",
  "Preston",
  "Unspeakable",
  "ZHC",
  "Dude Perfect",
  "SSSniperWolf",
  "Aphmau",
  "Ninja",
  "Typical Gamer",
  "Lazarbeam",
  "Lachlan",
  "Muselk",
  "Kwebbelkop",
  "Jelly",
];

export default function Clients() {
  return (
    <section id="clients" className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#e50914] text-sm font-semibold tracking-widest uppercase mb-4 block">
              Trusted By The Best
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-4">
              Creators I&apos;ve <span className="gradient-text">Worked With</span>
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              From the biggest names in YouTube to emerging creators ready to
              dominate. Here are some of the channels I&apos;ve helped transform.
            </p>
          </div>
        </ScrollReveal>

        {/* Infinite scroll row 1 */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
          <div className="flex animate-scroll-left">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="flex-shrink-0 mx-3"
              >
                <div className="glass-card rounded-xl px-8 py-5 flex items-center justify-center hover:border-[#e50914]/30 transition-colors min-w-[180px]">
                  <span className="font-[family-name:var(--font-space)] font-semibold text-[#a0a0a0] whitespace-nowrap">
                    {client}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite scroll row 2 (reverse) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
          <div
            className="flex animate-scroll-left"
            style={{ animationDirection: "reverse", animationDuration: "35s" }}
          >
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map(
              (client, i) => (
                <div
                  key={`${client}-rev-${i}`}
                  className="flex-shrink-0 mx-3"
                >
                  <div className="glass-card rounded-xl px-8 py-5 flex items-center justify-center hover:border-[#e50914]/30 transition-colors min-w-[180px]">
                    <span className="font-[family-name:var(--font-space)] font-semibold text-[#a0a0a0] whitespace-nowrap">
                      {client}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
