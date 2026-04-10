"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-3 tracking-tight">
              Mario Joos
            </div>
            <p className="text-[#444] text-sm leading-relaxed max-w-sm">
              Retention strategist working with YouTube&apos;s most-watched
              creators. Turning data into strategies that keep audiences watching.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666] mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {["About", "Services", "Work", "Contact"].map((link) => (
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

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666] mb-4">
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
              <li className="flex gap-4 pt-2">
                <a href="https://x.com/mariojoos" target="_blank" rel="noopener noreferrer" className="text-[#333] hover:text-white transition-colors font-mono text-[11px] uppercase tracking-wider">X</a>
                <a href="https://linkedin.com/in/mariojoos" target="_blank" rel="noopener noreferrer" className="text-[#333] hover:text-white transition-colors font-mono text-[11px] uppercase tracking-wider">LinkedIn</a>
                <a href="https://youtube.com/@mariojoos" target="_blank" rel="noopener noreferrer" className="text-[#333] hover:text-white transition-colors font-mono text-[11px] uppercase tracking-wider">YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 text-[12px] text-[#333]">
          <p>&copy; {currentYear} Mario Joos</p>
        </div>
      </div>
    </footer>
  );
}
