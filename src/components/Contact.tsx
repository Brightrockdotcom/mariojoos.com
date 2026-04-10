"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/lib/supabase";

const budgetOptions = [
  "Under $5k",
  "$5k \u2013 $15k",
  "$15k \u2013 $50k",
  "$50k+",
  "Let\u2019s discuss",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    newsletter: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      if (!supabase) {
        console.warn("Supabase not configured");
        setStatus("sent");
        return;
      }

      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          budget: formData.budget,
          newsletter_optin: formData.newsletter,
        },
      ]);

      if (error) throw error;
      setStatus("sent");
      setFormData({ name: "", email: "", message: "", budget: "", newsletter: false });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 noise-bg">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-[#555] text-xs uppercase tracking-[0.3em] font-medium mb-6 block">
              Contact
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              Let&apos;s talk about
              <br />
              <span className="gradient-text">your channel.</span>
            </h2>
            <p className="text-[#555] text-base max-w-lg">
              Limited availability. Tell me about your goals and I&apos;ll let you know
              if we&apos;re a fit.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#555] text-xs uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3.5 text-white placeholder-[#333] focus:outline-none focus:border-[#e50914]/30 transition-colors text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[#555] text-xs uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3.5 text-white placeholder-[#333] focus:outline-none focus:border-[#e50914]/30 transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#555] text-xs uppercase tracking-wider mb-3">
                Budget
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: option })}
                    className={`px-4 py-2 rounded-lg text-xs transition-all duration-300 ${
                      formData.budget === option
                        ? "bg-[#e50914] text-white"
                        : "border border-white/[0.06] text-[#555] hover:text-white hover:border-white/[0.1]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#555] text-xs uppercase tracking-wider mb-2">
                About your channel & goals
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3.5 text-white placeholder-[#333] focus:outline-none focus:border-[#e50914]/30 transition-colors resize-none text-sm"
                placeholder="What's your channel about? What challenges are you facing? What does success look like?"
              />
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                  className="w-3.5 h-3.5 rounded border-white/10 bg-white/[0.03] text-[#e50914] focus:ring-0"
                />
                <span className="text-xs text-[#444] group-hover:text-[#888] transition-colors">
                  Send me retention insights (no spam)
                </span>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full glow-button py-4 rounded-xl text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                  ? "Sent \u2014 I\u2019ll be in touch."
                  : status === "error"
                  ? "Something went wrong. Try again."
                  : "Send Message"}
              </span>
            </motion.button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
