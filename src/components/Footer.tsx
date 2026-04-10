"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-[family-name:var(--font-space)] text-sm font-semibold tracking-[0.15em] uppercase mb-4 text-white/80">
              Mario Joos
            </div>
            <p className="text-[#444] text-sm leading-relaxed max-w-sm">
              Retention strategist working with YouTube&apos;s most-watched
              creators. Turning data into strategies that keep audiences watching.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#555] text-xs uppercase tracking-[0.2em] mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {["About", "Services", "Results", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[#333] hover:text-[#888] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#555] text-xs uppercase tracking-[0.2em] mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:mario@brightrock.com"
                  className="text-[#333] hover:text-[#888] transition-colors"
                >
                  mario@brightrock.com
                </a>
              </li>
              <li className="text-[#333]">Sofia, Bulgaria</li>
              <li className="flex gap-4 pt-3">
                <a
                  href="https://x.com/mariojoos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333] hover:text-white transition-colors text-xs uppercase tracking-wider"
                >
                  X
                </a>
                <a
                  href="https://linkedin.com/in/mariojoos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333] hover:text-white transition-colors text-xs uppercase tracking-wider"
                >
                  LinkedIn
                </a>
                <a
                  href="https://youtube.com/@mariojoos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333] hover:text-white transition-colors text-xs uppercase tracking-wider"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#333]">
          <p>&copy; {currentYear} Mario Joos</p>
        </div>
      </div>
    </footer>
  );
}
