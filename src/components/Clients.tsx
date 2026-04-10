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
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      <div
        className="flex animate-scroll-left"
        style={reverse ? { animationDirection: "reverse", animationDuration: "45s" } : { animationDuration: "40s" }}
      >
        {doubled.map((client, i) => (
          <div key={`${client}-${i}`} className="flex-shrink-0 mx-1.5">
            <div className="px-6 py-3 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 min-w-[140px] text-center">
              <span className="font-mono text-[12px] text-[#444] tracking-wide whitespace-nowrap">
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
    <section id="clients" className="py-24 md:py-32 px-6 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
              Trusted By
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-3">
              Creators who chose{" "}
              <span className="gradient-text">to work with me.</span>
            </h2>
            <p className="text-[#666] text-base max-w-md">
              From the biggest names on YouTube to emerging talent ready to break through.
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
