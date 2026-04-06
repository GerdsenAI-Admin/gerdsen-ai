/*
 * Neural G style — contact form, glass panels, monospace, amber accents
 */
import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const projectTypes = [
  "AI Pipeline Development",
  "MCP Server Integration",
  "LLM Training & Fine-Tuning",
  "Computer Vision System",
  "Edge AI / IoT Deployment",
  "AI Strategy Consultation",
  "Other",
];

export default function ContactSection() {
  const { ref, isVisible } = useInView(0.1);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const res = await fetch("https://formspree.io/f/xpwzgkrq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", company: "", projectType: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[12px] text-zinc-200 placeholder-zinc-600 focus:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm";

  return (
    <section id="contact" className="relative py-32 bg-zinc-800/60">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="section-label text-amber-500/60 mb-3 block">
              Contact
            </span>
            <h2 className="font-extrabold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] tracking-[-0.03em] text-zinc-100 mb-6">
              Start Building
            </h2>
            <p className="text-[13px] leading-relaxed text-zinc-400 mb-10">
              Tell us about your project. Whether you need a complete AI pipeline,
              a fine-tuned model, or a strategic assessment of your AI readiness —
              we will respond within 24 hours with a concrete plan of action.
            </p>

            {/* Contact details */}
            <div className="space-y-6 border-t border-white/[0.06] pt-8">
              <div>
                <span className="section-label text-zinc-600 block mb-1">
                  Location
                </span>
                <span className="text-[12px] text-zinc-400">
                  Lafayette, Louisiana
                </span>
              </div>
              <div>
                <span className="section-label text-zinc-600 block mb-1">
                  Serving
                </span>
                <span className="text-[12px] text-zinc-400">
                  Commercial & industrial clients nationwide
                </span>
              </div>
              <div className="flex gap-3 pt-4">
                <a
                  href="https://www.linkedin.com/company/gerdsenai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.1em] uppercase text-zinc-500 hover:text-amber-500 transition-colors panel rounded-lg px-4 py-2 hover:border-amber-500/20"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/GerdsenAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.1em] uppercase text-zinc-500 hover:text-amber-500 transition-colors panel rounded-lg px-4 py-2 hover:border-amber-500/20"
                >
                  GitHub
                </a>
                <a
                  href="https://huggingface.co/GerdsenAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.1em] uppercase text-zinc-500 hover:text-amber-500 transition-colors panel rounded-lg px-4 py-2 hover:border-amber-500/20"
                >
                  Hugging Face
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {formState === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-10 panel rounded-xl">
                <CheckCircle size={48} className="text-emerald-500/60 mb-6" strokeWidth={1} />
                <h3 className="font-bold text-[18px] text-zinc-100 mb-3">
                  Message Sent
                </h3>
                <p className="text-[12px] text-zinc-400 max-w-sm">
                  We have received your inquiry and will respond within 24 hours
                  with a concrete plan of action.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-[10px] tracking-[0.1em] uppercase text-amber-500/60 hover:text-amber-500 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClass}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className={inputClass}
                />

                <select
                  required
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className={`${inputClass} ${
                    !formData.projectType ? "text-zinc-600" : "text-zinc-200"
                  }`}
                >
                  <option value="" disabled>
                    Project Type
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-zinc-800 text-zinc-200">
                      {type}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Tell us about your project..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />

                {formState === "error" && (
                  <div className="flex items-center gap-2 text-red-400/80 text-[12px]">
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full flex items-center justify-center gap-3 px-8 py-3.5 bg-amber-500 text-zinc-900 text-[11px] font-bold tracking-[0.08em] uppercase hover:bg-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                >
                  {formState === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
