"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import type { Creator } from "@/lib/creators";

// Reduce a large follower total to an integer + unit suffix the counter can animate.
function formatCount(n: number): { end: number; suffix: string } {
  if (n >= 1_000_000_000) return { end: Math.round(n / 1_000_000_000), suffix: "B+" };
  if (n >= 1_000_000) return { end: Math.round(n / 1_000_000), suffix: "M+" };
  if (n >= 1_000) return { end: Math.round(n / 1_000), suffix: "K+" };
  return { end: Math.max(0, Math.round(n)), suffix: "+" };
}

function initials(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function StatRow({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(end, 2200);
  return (
    <div ref={ref} className="flex items-baseline justify-between gap-3 py-2 border-b border-white/[0.06] last:border-0">
      <span className="text-[#9a9a9a] text-[11px] uppercase tracking-[0.12em] font-medium">{label}</span>
      <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white tracking-tight whitespace-nowrap">
        {count}
        <span className="text-[#e50914]">{suffix}</span>
      </span>
    </div>
  );
}

function CreatorRow({ creator }: { creator: Creator }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = creator.profileImageUrl && !imgFailed;
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={creator.profileImageUrl as string}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-[10px] font-bold text-[#aaa]">{initials(creator.name)}</span>
        )}
      </span>
      <span className="text-[13px] font-semibold text-[#cfcfcf] truncate">
        {creator.name ?? "Verified creator"}
      </span>
    </div>
  );
}

const inputClass =
  "w-full bg-[#141414] border border-white/[0.12] rounded-lg px-3.5 py-2.5 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[14px]";

export default function Hero({ creators }: { creators: Creator[] }) {
  // Live stats derived from the verified-creators data (fallbacks when empty).
  const hasData = creators.length > 0;
  const creatorCount = hasData ? creators.length : 200;
  const totalFollowers = hasData
    ? creators.reduce((sum, c) => sum + (c.followerCount ?? 0), 0)
    : 1_200_000_000;
  const followers = formatCount(totalFollowers);
  const topCreators = creators.slice(0, 6);

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
      className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e50914]/[0.05] blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 w-full max-w-6xl mx-auto hero-3col"
      >
        {/* PANEL 1 — Identity (headshot behind the title) */}
        <div className="hero-panel relative">
          {/* Large transparent headshot behind the headline */}
          <div className="pointer-events-none absolute -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[440px] h-[520px] max-w-[140%]">
            <Image
              src="/images/bannermario.png"
              alt="Mario Joos"
              fill
              sizes="460px"
              className="object-contain object-bottom opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_92%)]"
              priority
            />
          </div>

          <h1 className="relative font-[family-name:var(--font-poppins)] text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-[-0.01em] mb-4 [text-shadow:0_2px_30px_rgba(5,5,5,0.95)]">
            The strategist behind YouTube&apos;s biggest{" "}
            <span className="gradient-text">creators.</span>
          </h1>

          <p className="relative text-[#c4c4c4] text-base leading-relaxed [text-shadow:0_2px_20px_rgba(5,5,5,0.95)]">
            I turn retention data into strategies that keep audiences watching.
          </p>
        </div>

        {/* PANEL 2 — Proof */}
        <div className="hero-panel">
          <div className="glass-card rounded-2xl p-5 bg-[#0c0c0c]/60">
            <StatRow end={50} suffix="B+" label="Combined Views" />
            <StatRow end={followers.end} suffix={followers.suffix} label="Combined Followers" />
            <StatRow end={creatorCount} suffix="+" label="Creators" />
          </div>

          {topCreators.length > 0 && (
            <div className="mt-5">
              <p className="text-[#7d7d7d] text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">
                Verified creators
              </p>
              <div className="space-y-2.5">
                {topCreators.map((c) => (
                  <CreatorRow key={c.channelId} creator={c} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PANEL 3 — Act */}
        <div className="glass-card rounded-2xl p-5 md:p-6 space-y-5 bg-[#0c0c0c]/90 backdrop-blur-md text-left">
          {/* Newsletter */}
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold tracking-tight mb-1">
              Get the <span className="gradient-text">newsletter.</span>
            </h2>
            <p className="text-[#a8a8a8] text-[13px] mb-3">Retention tactics in your inbox.</p>
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
    </section>
  );
}
