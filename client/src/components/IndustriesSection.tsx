/*
 * Neural G style — industries showcase, glass panels, monospace, amber accents
 */
import { useInView } from "../hooks/useInView";

const ROVER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/Rover_Front_WetDirt_Rain_v2_75fa6ffe.webp";
const CHASE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/Customer2_Chase-Construction_a7fa1581.jpg";
const YOLO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/yolo-vision_444b6c71.webp";
const EDGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/edge-ai-bg-v2-bmv6bgLXtEcDzdh8SSToX9.webp";
const VECTORDB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410159101/JesrHh7o4HnHRnUQv22iKo/vectorDB_c716bc70.png";

const industries = [
  {
    title: "Energy & Industrial",
    desc: "Oil and gas, utilities, pipeline monitoring, infrastructure modernization",
    image: ROVER_IMG,
  },
  {
    title: "Manufacturing & Quality",
    desc: "Inspection automation, defect detection, production optimization",
    image: YOLO_IMG,
  },
  {
    title: "Construction & Infrastructure",
    desc: "Site monitoring, safety compliance, progress tracking",
    image: CHASE_IMG,
  },
  {
    title: "Enterprise & SaaS",
    desc: "AI-powered product features, internal tooling, workflow automation",
    image: VECTORDB_IMG,
  },
  {
    title: "Agriculture & Environmental",
    desc: "Precision agriculture, remote sensing, environmental monitoring",
    image: EDGE_IMG,
  },
];

export default function IndustriesSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="industries" className="relative py-32 bg-zinc-800">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label text-amber-500/60 mb-3 block">
            Industries
          </span>
          <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-[-0.03em] text-zinc-100">
            Where We Operate
          </h2>
          <p className="mt-4 max-w-lg text-[13px] text-zinc-500 leading-relaxed">
            Production AI systems deployed across industries where reliability,
            accuracy, and real-time performance are non-negotiable.
          </p>
        </div>

        {/* Industries Grid — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* First row: 3 items */}
          {industries.slice(0, 3).map((ind, i) => (
            <div
              key={ind.title}
              className={`group relative overflow-hidden h-[280px] lg:h-[320px] rounded-xl transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              <img
                src={ind.image}
                alt={ind.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 via-zinc-800/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-[16px] text-zinc-100 mb-2 tracking-tight">
                  {ind.title}
                </h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              {/* Top-right index */}
              <span className="absolute top-4 right-4 section-label text-zinc-600">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}

          {/* Second row: 2 items spanning full width */}
          {industries.slice(3).map((ind, i) => (
            <div
              key={ind.title}
              className={`group relative overflow-hidden h-[240px] lg:h-[280px] rounded-xl ${
                i === 0 ? "md:col-span-1 lg:col-span-1" : "md:col-span-1 lg:col-span-2"
              } transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(i + 3) * 120 + 200}ms` }}
            >
              <img
                src={ind.image}
                alt={ind.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-800 via-zinc-800/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-[16px] text-zinc-100 mb-2 tracking-tight">
                  {ind.title}
                </h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              <span className="absolute top-4 right-4 section-label text-zinc-600">
                {String(i + 4).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
