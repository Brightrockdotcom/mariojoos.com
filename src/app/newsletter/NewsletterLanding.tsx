"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Creator } from "@/lib/creators";
import {
  IdentityPanel,
  StatsPanel,
  ContactForm,
  CreatorMarqueeSection,
} from "@/components/hero-pieces";

const inputClass =
  "w-full bg-[#141414] border border-white/[0.12] rounded-lg px-3.5 py-2.5 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[15px]";

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4 py-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass-card rounded-2xl p-6 bg-[#0a0a0a]/95 backdrop-blur-xl my-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-full text-[#888] hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center text-lg"
            >
              &times;
            </button>

            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight mb-1 pr-8">
              Work <span className="gradient-text">with me.</span>
            </h2>
            <p className="text-[#a8a8a8] text-[14px] leading-snug mb-1">
              Tell me about your channel and what you&apos;re trying to figure
              out. I reply within 48 hours.
            </p>

            <ContactForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function NewsletterLanding({ creators }: { creators: Creator[] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactOpen, setContactOpen] = useState(false);

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
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e50914]/[0.05] blur-[150px] pointer-events-none" />

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
          <IdentityPanel />
          <StatsPanel creators={creators} />

          {/* Signup panel */}
          <div className="glass-card rounded-2xl p-5 space-y-3 bg-[#0c0c0c]/90 backdrop-blur-md text-left">
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight leading-[1.1]">
              Retention insights,{" "}
              <span className="gradient-text">in your inbox.</span>
            </h2>
            <p className="text-[#c4c4c4] text-[14px] leading-snug">
              Don&apos;t miss anything I put out there, from industry insights
              to exclusive strategies to keep people watching.
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

        {/* Contact-me button under everything */}
        <motion.button
          type="button"
          onClick={() => setContactOpen(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ y: -1 }}
          className="relative z-10 mt-5 text-[12px] text-[#888] hover:text-white font-semibold uppercase tracking-[0.18em] transition-colors"
        >
          Or contact me &rarr;
        </motion.button>
      </section>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
