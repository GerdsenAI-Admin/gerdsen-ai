/*
 * Neural G style — minimal footer, monospace, amber accents
 */
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/GerdsenAI_Logo_Transparent_c0761af6.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-800/90 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Gerdsen AI" className="h-8 w-auto" />
              <span className="font-bold text-[14px] tracking-tight text-zinc-100">
                GERDSEN AI
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-500 max-w-xs">
              Production AI systems for commercial and industrial clients.
              AI pipelines, MCP servers, LLM training, computer vision,
              and edge IoT — from Lafayette, LA.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="section-label text-zinc-600 mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Services", href: "#services" },
                { label: "How We Work", href: "#methodology" },
                { label: "Open Source", href: "#opensource" },
                { label: "Industries", href: "#industries" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[11px] text-zinc-500 hover:text-amber-500 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="section-label text-zinc-600 mb-4">
              Connect
            </h4>
            <div className="space-y-2">
              <a
                href="https://github.com/GerdsenAI"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] text-zinc-500 hover:text-amber-500 transition-colors py-1"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/company/gerdsenai"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] text-zinc-500 hover:text-amber-500 transition-colors py-1"
              >
                LinkedIn
              </a>
              <a
                href="https://huggingface.co/GerdsenAI"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] text-zinc-500 hover:text-amber-500 transition-colors py-1"
              >
                Hugging Face
              </a>
              <a
                href="https://www.linkedin.com/in/ggerdsen/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] text-zinc-500 hover:text-amber-500 transition-colors py-1"
              >
                Founder LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-zinc-600">
            &copy; {year} Gerdsen AI LLC. All rights reserved.
          </span>
          <span className="section-label text-zinc-700">
            Lafayette, LA &middot; Serving clients nationwide
          </span>
        </div>
      </div>
    </footer>
  );
}
