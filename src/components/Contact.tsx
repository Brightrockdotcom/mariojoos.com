"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/lib/supabase";

const budgetOptions = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Let's discuss",
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
        console.warn("Supabase not configured — form submission skipped");
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
      setFormData({
        name: "",
        email: "",
        message: "",
        budget: "",
        newsletter: false,
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#111111]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#e50914] text-sm font-semibold tracking-widest uppercase mb-4 block">
              Get Started
            </span>
            <h2 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your
              Channel?
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              Let&apos;s talk about how data-driven retention strategy can take
              your content to the next level. Limited spots available.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#e50914]/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#e50914]/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-[#a0a0a0] mb-2">
                Budget Range
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, budget: option })
                    }
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.budget === option
                        ? "bg-[#e50914] text-white"
                        : "glass-card text-[#a0a0a0] hover:text-white hover:border-white/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-[#a0a0a0] mb-2">
                Tell me about your channel & goals
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#e50914]/50 transition-colors resize-none"
                placeholder="What's your channel about? What are your current challenges? What goals do you want to hit?"
              />
            </div>

            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) =>
                    setFormData({ ...formData, newsletter: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#e50914] focus:ring-[#e50914]/50"
                />
                <span className="text-sm text-[#a0a0a0]">
                  Send me retention tips & insights (no spam, ever)
                </span>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glow-button py-4 rounded-full text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message Sent!"
                : status === "error"
                ? "Error — Try Again"
                : "Let's Work Together"}
            </motion.button>

            {status === "sent" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 mt-4 text-sm"
              >
                Thanks! I&apos;ll get back to you within 24 hours.
              </motion.p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
