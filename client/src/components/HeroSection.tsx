/*
 * Neural G style — monospace hero, lighter zinc base, amber accents
 * Glass panel effects, scan-line animation, status indicators
 */
import { useEffect, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/hero-bg-v2-jT8jbgKgeKRKNAEbrWtXZB.webp";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-zinc-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/50 via-zinc-800/20 to-zinc-800" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/60 via-transparent to-zinc-800/40" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="w-full h-px bg-amber-500/10 scan-line" />
      </div>

      {/* Particle Overlay */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-[1400px] mx-auto">
        {/* Status indicator */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
            <span className="section-label text-zinc-400">
              AI Engineering &middot; Lafayette, LA
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block font-extrabold text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-zinc-100">
            Production AI
          </span>
          <span className="block font-extrabold text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-zinc-100 mt-2">
            Systems.
          </span>
          <span className="block font-bold text-[clamp(1.3rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.02em] text-amber-500/70 mt-4">
            From Model to Metal.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className={`mt-8 max-w-xl text-[13px] sm:text-[14px] leading-relaxed text-zinc-400 transition-all duration-1000 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          We build and deploy AI pipelines, MCP servers, fine-tuned LLMs,
          computer vision systems, and edge IoT solutions for commercial
          and industrial clients.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-wrap gap-4 transition-all duration-1000 delay-900 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={scrollToServices}
            className="px-7 py-3 bg-amber-500 text-zinc-900 text-[11px] font-bold tracking-[0.08em] uppercase hover:bg-amber-400 transition-all duration-300 rounded-lg"
          >
            Explore Services
          </button>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3 border border-white/[0.15] text-zinc-300 text-[11px] font-bold tracking-[0.08em] uppercase hover:border-white/30 hover:text-zinc-100 transition-all duration-300 rounded-lg"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="section-label text-zinc-500">
          Scroll to explore
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500/40 to-transparent animate-pulse" />
      </div>

      {/* Bottom gradient edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-800 to-transparent z-10" />
    </section>
  );
}
