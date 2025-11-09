"use client";

import Image from "next/image";

type Logo = {
  name: string;
  src?: string; // /public path
  bg?: string;
  fg?: string;
  label?: string; // fallback label
};

// Using local assets we have now; more can be added once confirmed
const logos: Logo[] = [
  { name: "Next.js", src: "/next.svg" },
  { name: "Vercel", src: "/vercel.svg" },
  // Fallback styled badges until we confirm full icon set
  { name: "JavaScript", label: "JS", bg: "#f7df1e", fg: "#000000" },
  { name: "TypeScript", label: "TS", bg: "#3178c6", fg: "#ffffff" },
  { name: "React", label: "React", bg: "#0ea5e9", fg: "#001018" },
  { name: "Node.js", label: "Node", bg: "#3c873a", fg: "#ffffff" },
  { name: "Tailwind", label: "TW", bg: "#06b6d4", fg: "#00222a" },
  { name: "Python", label: "Py", bg: "#3776ab", fg: "#ffdf76" },
  { name: "Solidity", label: "Sol", bg: "#0b0b0b", fg: "#ffffff" },
  { name: "PostgreSQL", label: "PG", bg: "#336791", fg: "#ffffff" },
  { name: "Docker", label: "Docker", bg: "#0db7ed", fg: "#07283a" },
  { name: "Git", label: "Git", bg: "#f05033", fg: "#2b0b06" },
  { name: "GitHub", label: "GH", bg: "#24292e", fg: "#ffffff" },
  { name: "AWS", label: "AWS", bg: "#232f3e", fg: "#ff9900" },
  { name: "Supabase", label: "SB", bg: "#3ecf8e", fg: "#052e1a" },

  // Additional skills from CV
  { name: "TradingView", label: "TradingView", bg: "#1f2937", fg: "#9ae6b4" },
  { name: "Pine Script", label: "Pine", bg: "#0ea5e9", fg: "#001018" },
  { name: "Avaya", label: "Avaya", bg: "#ef4444", fg: "#ffffff" },
  { name: "CRM", label: "CRM", bg: "#7c3aed", fg: "#ffffff" },
  { name: "KYC", label: "KYC", bg: "#f97316", fg: "#111827" },
  { name: "SEO", label: "SEO", bg: "#10b981", fg: "#052e1a" },
  { name: "PPC", label: "PPC", bg: "#06b6d4", fg: "#012" },
  { name: "Blockchain", label: "Blockchain", bg: "#111827", fg: "#60a5fa" },
  { name: "Fintech", label: "Fintech", bg: "#0f172a", fg: "#fbbf24" },
  { name: "Machine Learning", label: "ML", bg: "#0ea5a4", fg: "#042" },
];

export default function TechLogos() {
  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tech I work with</p>
      <div className="flex flex-wrap items-center gap-3 opacity-90">
        {logos.map((l) => (
          <div
            key={l.name}
            className="h-8 flex items-center gap-2 px-3 rounded-md border border-gray-700/60 bg-gray-900/40 backdrop-blur-sm hover:border-cyan-400/50 transition"
            title={l.name}
          >
            {l.src ? (
              <Image src={l.src} alt={l.name} width={18} height={18} className="opacity-90" />
            ) : (
              <span
                className="text-[10px] font-bold leading-none px-1.5 py-1 rounded-sm"
                style={{ background: l.bg || "#111827", color: l.fg || "#E5E7EB" }}
              >
                {l.label || l.name}
              </span>
            )}
            <span className="text-xs text-gray-300 hidden sm:inline">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
