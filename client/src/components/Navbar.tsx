/*
 * Neural G style — monospace nav, glass panel, amber accent
 * Lighter zinc-900 base, SF Mono / JetBrains Mono throughout
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/GerdsenAI_Logo_Transparent_c0761af6.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#methodology" },
  { label: "Open Source", href: "#opensource" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-800/95 backdrop-blur-md border-b border-white/[0.10] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-3 group"
        >
          <img
            src={LOGO_URL}
            alt="Gerdsen AI"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-bold text-base tracking-tight text-zinc-100 hidden sm:block">
            GERDSEN AI
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-400 hover:text-amber-500 transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <button
            onClick={() => handleClick("#contact")}
            className="px-5 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase border border-amber-500/40 text-amber-500 hover:bg-amber-500 hover:text-zinc-900 transition-all duration-300 rounded-lg"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-zinc-400 hover:text-zinc-100 p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 bg-zinc-800/98 backdrop-blur-xl border-b border-white/[0.10] transition-all duration-400 overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-left text-[13px] font-medium tracking-wide text-zinc-400 hover:text-amber-500 py-3 border-b border-white/[0.06] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleClick("#contact")}
            className="mt-4 px-6 py-3 text-[11px] font-semibold tracking-[0.08em] uppercase border border-amber-500/40 text-amber-500 hover:bg-amber-500 hover:text-zinc-900 transition-all duration-300 text-center rounded-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
