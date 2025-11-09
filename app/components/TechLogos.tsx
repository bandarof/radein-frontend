"use client";

type Logo = {
  name: string;
  src?: string; // local public path
  slug?: string; // simpleicons slug
  bg?: string;
  fg?: string;
  label?: string; // fallback label
};

// Map of logos; TradingView removed as requested. If slug exists we fetch from Simple Icons CDN.
const logos: Logo[] = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Vercel", slug: "vercel" },
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Python", slug: "python" },
  { name: "Solidity", slug: "solidity" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Docker", slug: "docker" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Supabase", slug: "supabase" },

  // Additional from CV — use slugs where available, otherwise fall back to badges
  { name: "Avaya", slug: "avaya" },
  { name: "Pine Script", label: "Pine", bg: "#0ea5e9", fg: "#001018" },
  { name: "CRM", label: "CRM", bg: "#7c3aed", fg: "#ffffff" },
  { name: "KYC", label: "KYC", bg: "#f97316", fg: "#111827" },
  { name: "SEO", label: "SEO", bg: "#10b981", fg: "#052e1a" },
  { name: "PPC", label: "PPC", bg: "#06b6d4", fg: "#012" },
  { name: "Blockchain", label: "Blockchain", bg: "#111827", fg: "#60a5fa" },
  { name: "Fintech", label: "Fintech", bg: "#0f172a", fg: "#fbbf24" },
  { name: "Machine Learning", label: "ML", bg: "#0ea5a4", fg: "#042" },
];

const SIMPLE_ICONS = (slug: string, color = "ffffff") => `https://cdn.simpleicons.org/${slug}/${color}`;

export default function TechLogos() {
  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tech I work with</p>
      <div className="flex flex-wrap items-center gap-3 opacity-95">
        {logos.map((l) => (
          <div
            key={l.name}
            className="h-8 flex items-center gap-2 px-3 rounded-md border border-gray-700/60 bg-gray-900/30 backdrop-blur-sm hover:border-cyan-400/50 transition"
            title={l.name}
          >
            {l.slug ? (
              // fetch monochrome white SVG from Simple Icons CDN
              <img src={SIMPLE_ICONS(l.slug)} alt={l.name} width={18} height={18} className="opacity-95" />
            ) : l.src ? (
              <img src={l.src} alt={l.name} width={18} height={18} className="opacity-95" />
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
