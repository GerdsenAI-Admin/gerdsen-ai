/*
 * Neural G style — methodology timeline, glass panels, monospace, amber accents
 */
import { useInView } from "../hooks/useInView";
import { Search, PenTool, Hammer, Rocket, Activity } from "lucide-react";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/services-bg-v2-CABYGEMP4cK8KqgprSPFvV.webp";

const phases = [
  {
    icon: Search,
    title: "Discovery",
    desc: "We map your data landscape, define success metrics, and identify the highest-impact AI opportunities.",
  },
  {
    icon: PenTool,
    title: "Architecture",
    desc: "System design, model selection, infrastructure planning, and integration mapping — before a line of code.",
  },
  {
    icon: Hammer,
    title: "Build",
    desc: "Iterative development with continuous validation. Models trained, pipelines assembled, edge cases handled.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    desc: "Production deployment with monitoring, rollback capabilities, and performance optimization from day one.",
  },
  {
    icon: Activity,
    title: "Monitor",
    desc: "Continuous model performance tracking, drift detection, retraining triggers, and system health dashboards.",
  },
];

export default function MethodologySection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="methodology" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={SERVICES_BG}
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-zinc-800/92" />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label text-amber-500/60 mb-3 block">
            Our Process
          </span>
          <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-[-0.03em] text-zinc-100">
            How We Work
          </h2>
          <p className="mt-4 max-w-lg text-[13px] text-zinc-500 leading-relaxed">
            A disciplined engineering methodology that takes AI systems from
            concept to production with predictable outcomes.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[44px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.title}
                  className={`relative flex flex-col items-center lg:items-center text-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150 + 300}ms` }}
                >
                  {/* Node */}
                  <div className="relative z-10 w-[64px] h-[64px] flex items-center justify-center panel rounded-xl mb-6 group hover:border-amber-500/30 transition-all duration-300">
                    <Icon
                      size={24}
                      className="text-zinc-400 group-hover:text-amber-500 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                    {/* Phase number */}
                    <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[9px] font-bold text-amber-500 bg-zinc-800 border border-amber-500/20 rounded">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-bold text-[14px] text-zinc-200 mb-2 tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-zinc-500 max-w-[220px]">
                    {phase.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
