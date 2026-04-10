"use client";

import ScrollReveal from "./ScrollReveal";

const clientsRow1 = [
  "MrBeast", "KSI", "Stokes Twins", "Preston",
  "Unspeakable", "ZHC", "Dude Perfect", "SSSniperWolf",
];

const clientsRow2 = [
  "Aphmau", "Ninja", "Typical Gamer", "Lazarbeam",
  "Lachlan", "Muselk", "Kwebbelkop", "Jelly",
];

function ScrollRow({ clients, reverse = false }: { clients: string[]; reverse?: boolean }) {
  const doubled = [...clients, ...clients];
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <div
        className="flex animate-scroll-left"
        style={reverse ? { animationDirection: "reverse", animationDuration: "45s" } : { animationDuration: "40s" }}
      >
        {doubled.map((client, i) => (
          <div key={`${client}-${i}`} className="flex-shrink-0 mx-2">
            <div className="px-8 py-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 min-w-[160px] text-center">
              <span className="font-[family-name:var(--font-space)] font-medium text-[#444] text-sm tracking-wide whitespace-nowrap">
                {client}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section id="clients" className="py-32 px-6 bg-[#0a0a0a] overflow-hidden noise-bg">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium mb-6 block">
              Trusted By
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              Creators who chose
              <br />
              <span className="gradient-text">to work with me.</span>
            </h2>
            <p className="text-[#555] text-base max-w-lg">
              From the biggest names in YouTube to emerging talent ready to break through.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          <ScrollRow clients={clientsRow1} />
          <ScrollRow clients={clientsRow2} reverse />
        </div>
      </div>
    </section>
  );
}
