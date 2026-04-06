/*
 * Neural G style — about section, glass panels, monospace, amber accents
 */
import { useInView } from "../hooks/useInView";
import { Layers, GitBranch, Cpu, Database } from "lucide-react";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/about-bg-v2-nAvofessKkzXknFQejkZtN.webp";

const credentials = [
  {
    icon: Layers,
    label: "Full-Stack AI",
    desc: "End-to-end AI system development — from data pipelines and model training through edge deployment and monitoring",
  },
  {
    icon: GitBranch,
    label: "Open Source",
    desc: "Active contributors to the AI/ML community with production-ready ROS2 wrappers, MCP plugins, and developer tools",
  },
  {
    icon: Cpu,
    label: "Edge Deployment",
    desc: "Proven expertise deploying optimized models to NVIDIA Jetson and resource-constrained industrial environments",
  },
  {
    icon: Database,
    label: "Published Models",
    desc: "Fine-tuned LLMs and custom training datasets published on Hugging Face with production-grade pipelines",
  },
];

export default function AboutSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={ABOUT_BG}
          alt=""
          className="w-full h-full object-cover opacity-12"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-zinc-800/90" />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="section-label text-amber-500/60 mb-3 block">
              About
            </span>
            <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-[-0.03em] text-zinc-100 mb-6">
              Engineering-First
              <br />
              AI Company
            </h2>

            <div className="space-y-4 text-[13px] leading-relaxed text-zinc-400">
              <p>
                Gerdsen AI LLC is a production AI engineering firm based in
                Lafayette, Louisiana. We combine deep industrial domain
                knowledge with modern AI/ML engineering to deploy systems
                that work in the real world.
              </p>
              <p>
                Our experience spans energy, manufacturing, and enterprise
                environments — giving us a unique perspective on building
                AI that operates reliably in harsh, bandwidth-constrained,
                and safety-critical conditions.
              </p>
              <p>
                We are not a research lab. We are engineers who ship production
                systems. Every model we train, every pipeline we build, and
                every edge device we deploy is designed to deliver measurable
                business outcomes from day one.
              </p>
            </div>

            {/* Partners */}
            <div className="mt-10 pt-8 border-t border-white/[0.06]">
              <span className="section-label text-zinc-600 mb-4 block">
                Partners
              </span>
              <div className="flex flex-wrap gap-6 text-[12px] text-zinc-500">
                <span>Chase Group Construction</span>
                <span className="text-zinc-700">|</span>
                <span>Choraquest GIS</span>
              </div>
            </div>
          </div>

          {/* Right: Credentials */}
          <div className="space-y-4">
            {credentials.map((cred, i) => {
              const Icon = cred.icon;
              return (
                <div
                  key={cred.label}
                  className={`flex gap-5 p-5 panel rounded-xl transition-all duration-700 hover:border-amber-500/15 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: `${i * 150 + 300}ms` }}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/[0.08] rounded-lg bg-white/[0.03]">
                    <Icon
                      size={18}
                      className="text-amber-500/60"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-zinc-200 mb-1">
                      {cred.label}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-zinc-500">
                      {cred.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
