"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewsletterForm() {
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
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e50914]/[0.05] blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <Link
          href="/"
          className="inline-block mb-10 text-[#888] hover:text-white text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors"
        >
          &larr; mariojoos.com
        </Link>

        <h1 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
          Retention insights,{" "}
          <span className="gradient-text">in your inbox.</span>
        </h1>

        <p className="text-[#c4c4c4] text-lg md:text-xl leading-relaxed mb-10">
          Don&apos;t miss anything I put out there, from industry insights, to
          exclusive strategies to keep people watching.
        </p>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 bg-[#0c0c0c]/80"
          >
            <p className="text-[#ff6b35] text-lg font-semibold mb-1">
              You&apos;re in.
            </p>
            <p className="text-[#c4c4c4] text-[15px]">
              Check your inbox to confirm your subscription.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-[#141414] border border-white/[0.12] rounded-lg px-4 py-3 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[15px]"
            />
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glow-button px-6 py-3 rounded-lg text-white font-semibold text-[15px] disabled:opacity-50 whitespace-nowrap"
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

        <p className="mt-8 text-[#666] text-[12px]">
          Powered by{" "}
          <span className="text-[#888]">beehiiv</span>. We&apos;ll never share
          your email.
        </p>
      </motion.div>
    </main>
  );
}
