"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import type { Creator } from "@/lib/creators";

// Reduce a large follower total to an integer + unit suffix the counter can animate.
export function formatCount(n: number): { end: number; suffix: string } {
  if (n >= 1_000_000_000) return { end: Math.round(n / 1_000_000_000), suffix: "B+" };
  if (n >= 1_000_000) return { end: Math.round(n / 1_000_000), suffix: "M+" };
  if (n >= 1_000) return { end: Math.round(n / 1_000), suffix: "K+" };
  return { end: Math.max(0, Math.round(n)), suffix: "+" };
}

export function initials(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function StatRow({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(end, 2200);
  return (
    <div ref={ref} className="flex items-baseline justify-between gap-3 py-1.5 border-b border-white/[0.06] last:border-0">
      <span className="text-[#9a9a9a] text-[11px] uppercase tracking-[0.12em] font-medium">{label}</span>
      <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white tracking-tight whitespace-nowrap">
        {count}
        <span className="text-[#e50914]">{suffix}</span>
      </span>
    </div>
  );
}

function CreatorChip({ creator }: { creator: Creator }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = creator.profileImageUrl && !imgFailed;
  return (
    <span className="flex items-center gap-2.5 mx-4 flex-shrink-0">
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
      <span className="text-[13px] font-semibold text-[#cfcfcf] whitespace-nowrap">
        {creator.name ?? "Verified creator"}
      </span>
    </span>
  );
}

export function CreatorMarquee({ creators }: { creators: Creator[] }) {
  const doubled = [...creators, ...creators];
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <div className="flex animate-scroll-left items-center" style={{ animationDuration: "55s" }}>
        {doubled.map((c, i) => (
          <CreatorChip key={`${c.channelId}-${i}`} creator={c} />
        ))}
      </div>
    </div>
  );
}

// The identity panel: large transparent headshot behind the headline + tagline.
export function IdentityPanel() {
  return (
    <div className="hero-panel relative">
      <div className="pointer-events-none absolute -z-10 top-1/2 -translate-y-[74%] left-1/2 -translate-x-1/2 w-[440px] h-[560px] max-w-[150%]">
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
  );
}

// The proof panel: stats card with combined views/followers/creators.
export function StatsPanel({ creators }: { creators: Creator[] }) {
  const hasData = creators.length > 0;
  const creatorCount = hasData ? creators.length : 200;
  const totalFollowers = hasData
    ? creators.reduce((sum, c) => sum + (c.followerCount ?? 0), 0)
    : 1_200_000_000;
  const followers = formatCount(totalFollowers);
  return (
    <div className="hero-panel">
      <div className="glass-card rounded-2xl p-4 bg-[#0c0c0c]/60">
        <StatRow end={50} suffix="B+" label="Combined Views" />
        <StatRow end={followers.end} suffix={followers.suffix} label="Combined Followers" />
        <StatRow end={creatorCount} suffix="+" label="Creators" />
      </div>
    </div>
  );
}

// Standalone contact form (used in the homepage hero panel and the /newsletter modal).
// Sends to /api/contact which emails mario@brightrock.com server-side.
const contactInput =
  "w-full bg-[#141414] border border-white/[0.12] rounded-lg px-3.5 py-2.5 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[14px]";

export function ContactForm({ onSent }: { onSent?: () => void } = {}) {
  const [form, setForm] = useState({ name: "", email: "", channel: "", message: "" });
  // Honeypot field: bots fill this; real users never see it.
  const [website, setWebsite] = useState("");
  // Capture form-load time once; submissions faster than ~1.5s look like bots.
  const [loadedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, _t: loadedAt }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", channel: "", message: "" });
      onSent?.();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="text-[#c4c4c4] text-base py-2">
        Got it. I&apos;ll be in touch within 48 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 mt-3">
      {/* Honeypot — hidden from humans, attractive to bots. Do not remove. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <input
        type="text"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className={contactInput}
      />
      <input
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className={contactInput}
      />
      <input
        type="text"
        value={form.channel}
        onChange={(e) => setForm({ ...form, channel: e.target.value })}
        placeholder="youtube.com/@yourchannel (optional)"
        className={contactInput}
      />
      <textarea
        required
        rows={3}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="What can I help you with?"
        className={`${contactInput} resize-none`}
      />
      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        className="w-full glow-button py-2.5 rounded-lg text-white font-semibold text-[14px] disabled:opacity-50"
      >
        <span>{status === "sending" ? "Sending..." : status === "error" ? "Try again" : "Send"}</span>
      </motion.button>
    </form>
  );
}

// Full-width labelled creator marquee strip.
export function CreatorMarqueeSection({ creators }: { creators: Creator[] }) {
  if (creators.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3 }}
      className="relative z-10 w-full max-w-6xl mx-auto mt-4"
    >
      <p className="text-center text-[#7d7d7d] text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">
        Verified creators
      </p>
      <CreatorMarquee creators={creators} />
    </motion.div>
  );
}
