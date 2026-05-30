"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Creator } from "@/lib/creators";
import {
  IdentityPanel,
  StatsPanel,
  CreatorMarqueeSection,
} from "./hero-pieces";

const inputClass =
  "w-full bg-[#141414] border border-white/[0.12] rounded-lg px-3.5 py-2 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[14px]";

export default function Hero({ creators }: { creators: Creator[] }) {
  // Newsletter
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Contact
  const [form, setForm] = useState({ name: "", email: "", channel: "", message: "" });
  const [cStatus, setCStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setCStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setCStatus("sent");
      setForm({ name: "", email: "", channel: "", message: "" });
    } catch {
      setCStatus("error");
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
        {/* PANEL 1 — Identity */}
        <IdentityPanel />

        {/* PANEL 2 — Proof */}
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
            {cStatus === "sent" ? (
              <p className="text-[#c4c4c4] text-base py-2">
                Got it. I&apos;ll be in touch within 48 hours.
              </p>
            ) : (
              <form onSubmit={handleContact} className="space-y-2.5 mt-3">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className={inputClass}
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  placeholder="youtube.com/@yourchannel (optional)"
                  className={inputClass}
                />
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What can I help you with?"
                  className={`${inputClass} resize-none`}
                />
                <motion.button
                  type="submit"
                  disabled={cStatus === "sending"}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className="w-full glow-button py-2.5 rounded-lg text-white font-semibold text-[14px] disabled:opacity-50"
                >
                  <span>{cStatus === "sending" ? "Sending..." : cStatus === "error" ? "Try again" : "Send"}</span>
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>

      <CreatorMarqueeSection creators={creators} />
    </section>
  );
}
