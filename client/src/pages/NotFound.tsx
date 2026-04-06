import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center px-6">
      <span className="section-label text-amber-500/60 mb-6">
        Error 404
      </span>
      <h1 className="font-extrabold text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em] text-zinc-100 mb-4">
        Page Not Found
      </h1>
      <p className="text-[13px] text-zinc-500 mb-10 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => setLocation("/")}
        className="px-7 py-3 bg-amber-500 text-zinc-900 text-[11px] font-bold tracking-[0.08em] uppercase hover:bg-amber-400 transition-all duration-300 rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
}
