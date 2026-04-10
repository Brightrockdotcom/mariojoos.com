"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-[family-name:var(--font-space)] text-2xl font-bold mb-4">
              MARIO<span className="gradient-text">JOOS</span>
            </div>
            <p className="text-[#a0a0a0] leading-relaxed">
              The world&apos;s #1 YouTube retention strategist. Turning data
              into views, and views into empires.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-space)] font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["About", "Services", "Case Studies", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-[#a0a0a0] hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-space)] font-semibold mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li>
                <a
                  href="mailto:mario@brightrock.com"
                  className="hover:text-white transition-colors"
                >
                  mario@brightrock.com
                </a>
              </li>
              <li>Sofia, Bulgaria</li>
              <li className="flex gap-4 pt-2">
                <a
                  href="https://x.com/mariojoos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X / Twitter
                </a>
                <a
                  href="https://linkedin.com/in/mariojoos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://youtube.com/@mariojoos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#666]">
          <p>&copy; {currentYear} Mario Joos. All rights reserved.</p>
          <p>
            Built with obsession for detail.
          </p>
        </div>
      </div>
    </footer>
  );
}
