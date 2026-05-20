"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { supabase } from "@/lib/supabase";
import type { Creator } from "@/lib/creators";

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(end, 2500);
  return (
    <div ref={ref} className="text-center px-4 py-2">
      <div className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-bold text-white tracking-tight">
        {count}
        <span className="text-[#e50914]">{suffix}</span>
      </div>
      <div className="text-[#9a9a9a] text-[10px] uppercase tracking-[0.12em] font-medium mt-0.5">{label}</div>
    </div>
  );
}

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

function CreatorAvatar({ creator }: { creator: Creator }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = creator.profileImageUrl && !imgFailed;
  return (
    <span className="flex items-center gap-2.5 mx-3 flex-shrink-0">
      <span className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center">
        {showImg ? (
          // Remote, unknown host — use a plain img with graceful fallback to initials.
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
      <span className="text-[13px] font-semibold text-[#bdbdbd] whitespace-nowrap">
        {creator.name ?? "Verified creator"}
      </span>
    </span>
  );
}

function CreatorMarquee({ creators }: { creators: Creator[] }) {
  if (creators.length === 0) return null;
  const doubled = [...creators, ...creators];
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      <div className="flex animate-scroll-left items-center" style={{ animationDuration: "55s" }}>
        {doubled.map((c, i) => (
          <CreatorAvatar key={`${c.channelId}-${i}`} creator={c} />
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-[#141414] border border-white/[0.12] rounded-lg px-3.5 py-3 text-white placeholder-[#777] focus:outline-none focus:border-white/[0.25] transition-colors text-[15px]";

export default function Hero({ creators }: { creators: Creator[] }) {
  // Live stats derived from the verified-creators data (fallbacks when empty).
  const hasData = creators.length > 0;
  const creatorCount = hasData ? creators.length : 200;
  const totalFollowers = hasData
    ? creators.reduce((sum, c) => sum + (c.followerCount ?? 0), 0)
    : 1_200_000_000;
  const followers = formatCount(totalFollowers);

  // Newsletter
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Contact
  const [form, setForm] = useState({ name: "", email: "", channel: "", service: "" });
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
      if (!supabase) {
        setCStatus("sent");
        return;
      }
      const { error } = await supabase.from("contacts").insert([
        {
          name: form.name,
          email: form.email,
          message: `Interested in: ${form.service || "Not sure yet"} | Channel: ${form.channel}`,
        },
      ]);
      if (error) throw error;
      setCStatus("sent");
      setForm({ name: "", email: "", channel: "", service: "" });
    } catch {
      setCStatus("error");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e50914]/[0.05] blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-6xl mx-auto hero-grid gap-10 min-[860px]:gap-14 items-center"
      >
        {/* LEFT — who I am, with headshot beside the text on wide screens */}
        <div className="relative text-center min-[860px]:text-left">
          {/* Transparent headshot — beside the text on desktop, behind it on mobile */}
          <div className="hidden lg:block pointer-events-none absolute -z-10 lg:left-auto lg:right-[-80px] lg:top-1/2 lg:-translate-y-1/2 lg:w-[320px] lg:h-[460px]">
            <Image
              src="/images/bannermario.png"
              alt="Mario Joos"
              fill
              sizes="(max-width: 768px) 360px, 420px"
              className="object-contain object-bottom opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_85%)]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          <span className="relative text-[#a8a8a8] text-[11px] font-bold uppercase tracking-[0.18em] block mb-4">
            Retention Strategy &mdash; YouTube Growth
          </span>

          <h1 className="relative font-[family-name:var(--font-poppins)] text-4xl md:text-5xl lg:text-5xl lg:max-w-[380px] font-bold leading-[1.1] tracking-[-0.01em] mb-5 [text-shadow:0_2px_30px_rgba(5,5,5,0.85)]">
            The strategist behind YouTube&apos;s biggest{" "}
            <span className="gradient-text">creators.</span>
          </h1>

          <p className="relative text-[#c4c4c4] text-lg md:text-xl max-w-md lg:max-w-[360px] mx-auto lg:mx-0 mb-6 leading-relaxed [text-shadow:0_2px_20px_rgba(5,5,5,0.9)]">
            I turn retention data into strategies that keep audiences watching.
            Sign up below, or tell me about your channel.
          </p>

          <div className="relative inline-flex glass-card rounded-xl divide-x divide-white/[0.06] mb-8">
            <StatCounter end={10} suffix="B+" label="Views" />
            <StatCounter end={followers.end} suffix={followers.suffix} label="Followers" />
            <StatCounter end={creatorCount} suffix="+" label="Creators" />
          </div>

          {creators.length > 0 && (
            <div className="relative">
              <p className="text-[#7d7d7d] text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">
                Verified creators
              </p>
              <CreatorMarquee creators={creators} />
            </div>
          )}
        </div>

        {/* RIGHT — the two actions */}
        <div className="glass-card rounded-2xl p-6 md:p-7 space-y-6 bg-[#0c0c0c]/90 backdrop-blur-md">
          {/* Newsletter */}
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight mb-1">
              Get the <span className="gradient-text">newsletter.</span>
            </h2>
            <p className="text-[#a8a8a8] text-[14px] mb-3">Retention tactics in your inbox. No fluff.</p>
            {nlStatus === "sent" ? (
              <p className="text-[#ff6b35] text-sm py-2">You&apos;re in. Check your inbox.</p>
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
                  className="glow-button px-5 py-3 rounded-lg text-white font-semibold text-[15px] disabled:opacity-50 whitespace-nowrap"
                >
                  <span>{nlStatus === "sending" ? "..." : nlStatus === "error" ? "Retry" : "Subscribe"}</span>
                </motion.button>
              </form>
            )}
          </div>

          <div className="section-divider" />

          {/* Contact */}
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight mb-1">
              Or <span className="gradient-text">work with me.</span>
            </h2>
            {cStatus === "sent" ? (
              <p className="text-[#c4c4c4] text-base py-3">
                Got it. I&apos;ll be in touch within 48 hours.
              </p>
            ) : (
              <form onSubmit={handleContact} className="space-y-3 mt-3">
                <div className="grid grid-cols-2 gap-3">
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
                </div>
                <input
                  type="text"
                  required
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  placeholder="youtube.com/@yourchannel"
                  className={inputClass}
                />
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="">What do you need help with?</option>
                  <option value="Retention Analysis">Retention Analysis</option>
                  <option value="Content Strategy">Content Strategy</option>
                  <option value="1:1 Consulting">1:1 Consulting</option>
                  <option value="Channel Architecture">Channel Architecture</option>
                </select>
                <motion.button
                  type="submit"
                  disabled={cStatus === "sending"}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className="w-full glow-button py-3 rounded-lg text-white font-semibold text-[15px] disabled:opacity-50"
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
