"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Newsletter() {
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
    <section id="newsletter" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
            The Newsletter
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-3">
            Retention tactics,{" "}
            <span className="gradient-text">in your inbox.</span>
          </h2>
          <p className="text-[#999] text-[15px] max-w-md mx-auto mb-8">
            The breakdowns I send creators &mdash; what actually keeps audiences
            watching. No fluff. Unsubscribe anytime.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {status === "sent" ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#ff6b35] text-[15px] font-mono"
            >
              You&apos;re in. Check your inbox to confirm.
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-[#111] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-white/[0.15] transition-colors text-[15px]"
              />
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-button px-6 py-3 rounded-lg text-white font-medium text-[15px] disabled:opacity-50 whitespace-nowrap"
              >
                <span>
                  {status === "sending"
                    ? "Joining..."
                    : status === "error"
                    ? "Try again"
                    : "Subscribe"}
                </span>
              </motion.button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
