"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    channel: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      if (!supabase) {
        setStatus("sent");
        return;
      }

      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.channel,
        },
      ]);

      if (error) throw error;
      setStatus("sent");
      setFormData({ name: "", email: "", channel: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section id="contact" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
              Got it.
            </h2>
            <p className="text-[#999] text-lg">
              I&apos;ll review your info and be in touch within 48 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#666] mb-5 block">
              Work Together
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-3">
              Interested?{" "}
              <span className="gradient-text">Start here.</span>
            </h2>
            <p className="text-[#666] text-[15px]">
              Three fields. I&apos;ll handle the rest.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-[#666] mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-white/[0.15] transition-colors text-[15px]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-[#666] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-white/[0.15] transition-colors text-[15px]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-[#666] mb-2">
                YouTube Channel URL
              </label>
              <input
                type="text"
                required
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-[#444] focus:outline-none focus:border-white/[0.15] transition-colors text-[15px]"
                placeholder="youtube.com/@yourchannel"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className="w-full glow-button py-3.5 rounded-lg text-white font-medium text-[15px] disabled:opacity-50 mt-2"
            >
              <span>
                {status === "sending" ? "Sending..." : status === "error" ? "Try again" : "Submit"}
              </span>
            </motion.button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
