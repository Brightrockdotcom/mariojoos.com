"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Creator } from "@/lib/creators";
import {
  IdentityPanel,
  StatsPanel,
  ContactForm,
  CreatorMarqueeSection,
} from "./hero-pieces";

const inputClass =
  "w-full bg-[#141414] border border-white/[0.12] rounded-lg px-3.5 py-2 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[14px]";

export default function Hero({ creators }: { creators: Creator[] }) {
  // Newsletter
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setNlStatus("sent");
      setEmail("");
    } catch {
      setNlStatus("error");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-4 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e50914]/[0.05] blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 w-full max-w-6xl mx-auto hero-3col"
      >
        <IdentityPanel />
        <StatsPanel creators={creators} />

        {/* PANEL 3 — Act */}
        <div className="glass-card rounded-2xl p-4 space-y-4 bg-[#0c0c0c]/90 backdrop-blur-md text-left">
          {/* Newsletter */}
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold tracking-tight mb-1">
              Retention insights,{" "}
              <span className="gradient-text">in your inbox.</span>
            </h2>
            <p className="text-[#a8a8a8] text-[13px] mb-3 leading-snug">
              Industry insights and exclusive strategies to keep people watching.
            </p>
            {nlStatus === "sent" ? (
              <p className="text-[#ff6b35] text-sm py-1">You&apos;re in. Check your inbox.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                />
                <motion.button
                  type="submit"
                  disabled={nlStatus === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glow-button px-4 py-2.5 rounded-lg text-white font-semibold text-[14px] disabled:opacity-50 whitespace-nowrap"
                >
                  <span>{nlStatus === "sending" ? "..." : nlStatus === "error" ? "Retry" : "Join"}</span>
                </motion.button>
              </form>
            )}
          </div>

          <div className="section-divider" />

          {/* Contact */}
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold tracking-tight mb-1">
              Or <span className="gradient-text">work with me.</span>
            </h2>
            <ContactForm />
          </div>
        </div>
      </motion.div>

      <CreatorMarqueeSection creators={creators} />
    </section>
  );
}
