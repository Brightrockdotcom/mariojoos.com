"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const navItems = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "case-studies", label: "Work" },
  { id: "clients", label: "Clients" },
  { id: "testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(
    ["hero", ...navItems.map((item) => item.id), "contact"],
    150
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-40 h-16 flex items-center transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
      }`}
    >
      <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#f5f5f5] hover:text-white transition-colors tracking-tight"
        >
          Mario Joos
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-[13px] transition-colors duration-200 ${
                activeSection === item.id
                  ? "text-[#f5f5f5]"
                  : "text-[#555] hover:text-[#999]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden lg:block text-[13px] text-[#555] hover:text-[#f5f5f5] transition-colors duration-200"
        >
          Get in Touch
        </button>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 -mr-2"
        >
          <motion.div className="flex flex-col gap-[5px]">
            <motion.span
              animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1px] bg-[#999] block origin-center"
            />
            <motion.span
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[1px] bg-[#999] block"
            />
            <motion.span
              animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1px] bg-[#999] block origin-center"
            />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-16 left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left text-[13px] py-1 transition-colors ${
                    activeSection === item.id ? "text-[#f5f5f5]" : "text-[#555]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="text-left text-[13px] text-[#555] hover:text-[#f5f5f5] pt-3 border-t border-white/[0.06]"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
