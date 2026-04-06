/*
 * Neural G style — open source repos, glass panels, monospace, amber accents
 */
import { useInView } from "../hooks/useInView";
import { ExternalLink, GitBranch, Star } from "lucide-react";

const DEPTH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/515406480-4d2c1cdf-0d8c-448c-a3f9-8e3557e37d81_68d74a56.webp";
const BYTEDANCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/ByteDance_Awesome_Projects_5636948f.png";
const HOTDOG_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/Is-a-hotdog-a-sandwhich_035d1b69.png";

const repos = [
  {
    name: "Depth-Anything-3-ROS2-Wrapper",
    org: "GerdsenAI",
    description:
      "Production-ready ROS2 wrapper for Depth Anything V3 monocular depth estimation. Enables real-time depth inference on robotic platforms with configurable publishers and TF integration.",
    url: "https://github.com/GerdsenAI/GerdsenAI-Depth-Anything-3-ROS2-Wrapper",
    image: DEPTH_IMG,
    tags: ["ROS2", "Computer Vision", "Depth Estimation"],
  },
  {
    name: "Markdown-To-PDF-Suite",
    org: "GerdsenAI",
    description:
      "Claude MCP plugin that converts Markdown documents to professionally formatted PDFs. Supports custom templates, syntax highlighting, and batch processing for technical documentation workflows.",
    url: "https://github.com/GerdsenAI/GerdsenAI-Markdown-To-PDF-Suite-Claude-Plugin",
    image: BYTEDANCE_IMG,
    tags: ["MCP", "Claude Plugin", "PDF"],
  },
  {
    name: "Document Builder",
    org: "GerdsenAI",
    description:
      "AI-powered document generation system that creates structured technical documents, proposals, and reports from templates and data sources. Built for enterprise documentation workflows.",
    url: "https://github.com/GerdsenAI/GerdsenAI_Document_Builder",
    image: HOTDOG_IMG,
    tags: ["Document AI", "Automation", "Templates"],
  },
];

export default function OpenSourceSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="opensource" className="relative py-32 bg-zinc-800/80">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label text-amber-500/60 mb-3 block">
            Open Source
          </span>
          <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-[-0.03em] text-zinc-100">
            Featured Repositories
          </h2>
          <p className="mt-4 max-w-lg text-[13px] text-zinc-500 leading-relaxed">
            We contribute production-grade tools to the open source community.
            Explore our public repositories on GitHub.
          </p>
        </div>

        {/* Repo Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative panel rounded-xl overflow-hidden transition-all duration-700 hover:border-amber-500/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden rounded-t-xl">
                <img
                  src={repo.image}
                  alt={repo.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 via-zinc-800/40 to-transparent" />

                {/* GitHub icon overlay */}
                <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={14} className="text-zinc-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch size={14} className="text-amber-500/50" />
                  <span className="section-label text-zinc-500">
                    {repo.org}
                  </span>
                </div>

                <h3 className="font-bold text-[14px] text-zinc-100 mb-2 tracking-tight group-hover:text-amber-500 transition-colors duration-300">
                  {repo.name}
                </h3>

                <p className="text-[11px] leading-relaxed text-zinc-500 mb-4">
                  {repo.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.1em] uppercase text-amber-500/50 border border-amber-500/10 px-2 py-0.5 bg-amber-500/5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Hugging Face mention */}
        <div
          className={`mt-10 flex items-center gap-4 p-5 panel rounded-xl transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/[0.08] rounded-lg bg-white/[0.03]">
            <Star size={18} className="text-amber-500/60" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              We also publish fine-tuned LLM models and custom training datasets on{" "}
              <span className="text-amber-500 font-medium">Hugging Face</span>{" "}
              — demonstrating production-grade model training capabilities
              including SFT, GRPO, and domain-specific embedding models.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
