/*
 * Neural G style — massive monospace statement, lighter zinc base
 */
import { useInView } from "../hooks/useInView";

export default function StatementSection() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section className="relative py-40 lg:py-52 bg-zinc-800 overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          className={`transition-all duration-[1500ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="font-extrabold text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.03em] text-zinc-100 max-w-[900px]">
            Building intelligent systems that{" "}
            <span className="text-zinc-500">see,</span>{" "}
            <span className="text-zinc-500">decide,</span>{" "}
            <span className="text-zinc-500">and</span>{" "}
            <span className="text-amber-500">act.</span>
          </h2>
        </div>

        <div
          className={`mt-12 flex items-center gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-16 h-px bg-amber-500/30" />
          <p className="text-[13px] text-zinc-500 max-w-md leading-relaxed">
            From data ingestion to edge deployment — we engineer the complete
            AI stack so your systems perform in production, not just in demos.
          </p>
        </div>
      </div>
    </section>
  );
}
