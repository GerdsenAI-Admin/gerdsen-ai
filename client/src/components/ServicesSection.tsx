/*
 * Neural G style — glass panel service cards, monospace, amber accents
 */
import { useState } from "react";
import { useInView } from "../hooks/useInView";
import {
  Workflow,
  Server,
  Brain,
  Eye,
  Cpu,
  Compass,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "AI Pipelines & Automation",
    short:
      "End-to-end production AI systems: data ingestion, preprocessing, model serving, inference loops, RAG architectures, and monitoring.",
    detail:
      "We design and deploy complete AI pipelines that move from prototype to production. Our systems handle data ingestion from diverse sources, automated preprocessing, model serving with load balancing, inference optimization, and continuous monitoring. We specialize in RAG architectures that connect your LLMs to proprietary data sources with vector databases and semantic search.",
  },
  {
    icon: Server,
    title: "MCP Server Development",
    short:
      "Custom Model Context Protocol servers that give LLMs structured access to external tools, APIs, and data sources.",
    detail:
      "We build MCP servers that extend the capabilities of Claude, ChatGPT, and open-source models by providing structured tool access. Our implementations connect LLMs to your internal APIs, databases, file systems, and third-party services — enabling AI agents that can take real actions in your business workflows.",
  },
  {
    icon: Brain,
    title: "LLM Training & Fine-Tuning",
    short:
      "Domain-specific model training using SFT, GRPO, DPO, and custom dataset creation for specialized applications.",
    detail:
      "We fine-tune foundation models for your specific domain using supervised fine-tuning (SFT), group relative policy optimization (GRPO), and direct preference optimization (DPO). Our team creates custom training datasets, builds embedding models for semantic search, and trains vision-language models for multimodal applications. Published models on Hugging Face demonstrate our production-grade training capabilities.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    short:
      "Production CV systems for industrial inspection, safety compliance, quality control, and autonomous navigation.",
    detail:
      "We deploy production computer vision systems that handle depth estimation, object detection, multi-sensor fusion, and real-time edge inference. Our solutions serve manufacturing inspection lines, construction site safety monitoring, quality control automation, and autonomous navigation systems — all optimized for the latency and accuracy requirements of industrial environments.",
  },
  {
    icon: Cpu,
    title: "Edge AI & IoT",
    short:
      "NVIDIA Jetson deployment, TensorRT optimization, on-premise inference servers, and sensor network integration.",
    detail:
      "We specialize in deploying AI models to edge devices where cloud connectivity is limited or latency is critical. Our expertise covers NVIDIA Jetson platforms, TensorRT model optimization, air-gapped deployment architectures, and industrial system integration. We build sensor network pipelines that process data locally and sync intelligently with cloud infrastructure.",
  },
  {
    icon: Compass,
    title: "AI Strategy & Consulting",
    short:
      "Technical roadmapping, architecture review, build-vs-buy analysis, and AI readiness assessment.",
    detail:
      "We help organizations navigate AI adoption with practical, engineering-grounded guidance. Our consulting covers technical roadmapping, system architecture review, build-vs-buy analysis for AI components, vendor evaluation, and AI readiness assessments. We focus on identifying the highest-impact AI opportunities that align with your existing infrastructure and team capabilities.",
  },
];

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: (typeof services)[0];
  index: number;
  isVisible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className={`group relative panel rounded-xl p-7 transition-all duration-700 hover:border-amber-500/20 hover:bg-white/[0.05] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100 + 200}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-amber-500/5 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="w-10 h-10 flex items-center justify-center mb-5 rounded-lg bg-white/[0.05] border border-white/[0.06]">
          <Icon
            size={20}
            className="text-amber-500/70 group-hover:text-amber-500 transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="font-bold text-[15px] text-zinc-100 mb-3 tracking-tight">
          {service.title}
        </h3>

        <p className="text-[12px] leading-relaxed text-zinc-400 mb-4">
          {service.short}
        </p>

        {/* Expandable detail */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-[12px] leading-relaxed text-zinc-500 border-t border-white/[0.06] pt-4">
            {service.detail}
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-amber-500/60 hover:text-amber-500 transition-colors"
        >
          {expanded ? "Less" : "Learn More"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="services" className="relative py-32 bg-zinc-800/80">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label text-amber-500/60 mb-3 block">
            What We Build
          </span>
          <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-[-0.03em] text-zinc-100">
            Core Services
          </h2>
          <p className="mt-4 max-w-lg text-[13px] text-zinc-500 leading-relaxed">
            Six engineering disciplines, one integrated approach. Every system
            we build is designed for production from day one.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
