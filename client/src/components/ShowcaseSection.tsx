/*
 * Neural G style — project showcase, glass panels, monospace, amber accents
 */
import { useInView } from "../hooks/useInView";

const CLAIMWATCH1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/ClaimWatchDesktop1_3000c94c.webp";
const CLAIMWATCH2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/ClaimWatchDesktop2_44d0a71e.webp";
const OPEN_ROBOTICS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/Open_Robotics_Post_be95501c.jpg";
const ENGINEERING_EXPO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/Engineering_Expo1_a3e7a901.webp";

const projects = [
  {
    image: CLAIMWATCH1,
    title: "ClaimWatch AI Dashboard",
    category: "Enterprise SaaS",
    desc: "AI-powered claims monitoring and analysis platform with real-time data visualization and anomaly detection.",
  },
  {
    image: CLAIMWATCH2,
    title: "ClaimWatch Analytics",
    category: "Computer Vision",
    desc: "Advanced document analysis and automated claim processing with multi-model inference pipeline.",
  },
  {
    image: OPEN_ROBOTICS,
    title: "ROS2 Integration",
    category: "Edge AI & Robotics",
    desc: "Production ROS2 wrappers for depth estimation and computer vision models deployed on edge computing platforms.",
  },
  {
    image: ENGINEERING_EXPO,
    title: "Engineering Showcase",
    category: "Community",
    desc: "Demonstrating AI capabilities at industry events — bridging the gap between research and production deployment.",
  },
];

export default function ShowcaseSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section className="relative py-32 bg-zinc-950/50">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label text-amber-500/60 mb-3 block">
            Our Work
          </span>
          <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-[-0.03em] text-zinc-100">
            Built for Production
          </h2>
          <p className="mt-4 max-w-lg text-[13px] text-zinc-500 leading-relaxed">
            Real systems deployed in real environments. Every project is
            engineered for reliability, scale, and measurable impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden panel rounded-xl transition-all duration-700 hover:border-amber-500/15 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              {/* Image */}
              <div className="relative h-[240px] overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="section-label text-amber-500/50 mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-bold text-[15px] text-zinc-100 mb-2 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-zinc-500">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
