"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Creator } from "@/lib/creators";
import {
  IdentityPanel,
  StatsPanel,
  CreatorMarqueeSection,
} from "@/components/hero-pieces";

const inputClass =
  "w-full bg-[#141414] border border-white/[0.12] rounded-lg px-3.5 py-2.5 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[15px]";

export default function NewsletterLanding({ creators }: { creators: Creator[] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e50914]/[0.05] blur-[150px] pointer-events-none" />

      {/* Back link */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 text-[#888] hover:text-white text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
      >
        &larr; mariojoos.com
      </Link>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 w-full max-w-6xl mx-auto hero-3col"
      >
        {/* PANEL 1 — Identity */}
        <IdentityPanel />

        {/* PANEL 2 — Proof */}
        <StatsPanel creators={creators} />

        {/* PANEL 3 — Signup */}
        <div className="glass-card rounded-2xl p-5 space-y-3 bg-[#0c0c0c]/90 backdrop-blur-md text-left">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight leading-[1.1]">
            Retention insights,{" "}
            <span className="gradient-text">in your inbox.</span>
          </h2>
          <p className="text-[#c4c4c4] text-[14px] leading-snug">
            Don&apos;t miss anything I put out there, from industry insights to
            exclusive strategies to keep people watching.
          </p>

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2"
            >
              <p className="text-[#ff6b35] text-base font-semibold mb-1">
                You&apos;re in.
              </p>
              <p className="text-[#c4c4c4] text-[13px]">
                Check your inbox to confirm your subscription.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
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
                disabled={status === "sending"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full glow-button py-3 rounded-lg text-white font-semibold text-[15px] disabled:opacity-50"
              >
                <span>
                  {status === "sending"
                    ? "Joining..."
                    : status === "error"
                    ? "Try again"
                    : "Subscribe"}
                </span>
              </motion.button>
              <p className="text-[#666] text-[11px] text-center">
                Free. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </motion.div>

      <CreatorMarqueeSection creators={creators} />
    </section>
  );
}
