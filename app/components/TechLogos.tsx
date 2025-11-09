"use client";

type Logo = {
  name: string;
  src?: string; // local public path
  slug?: string; // simpleicons slug
  color?: string; // brand hex without '#'
  bg?: string;
  fg?: string;
  label?: string; // fallback label
};

// Map of logos; removed AWS and added server-side tech per request. If slug exists we fetch from Simple Icons CDN and use brand color.
const logos: Logo[] = [
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Solidity", slug: "solidity", color: "363636" },
  { name: "PostgreSQL", slug: "postgresql", color: "336791" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },

  // Added server-side/webserver technologies
  { name: "PHP", slug: "php", color: "777BB4" },
  { name: "LiteSpeed", slug: "litespeed", color: "FF6A00" },
  { name: "Nginx", slug: "nginx", color: "009639" },
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
            {l.src ? (
              <img src={l.src} alt={l.name} width={18} height={18} className="opacity-100" />
            ) : l.slug ? (
              // fetch colored SVG from Simple Icons CDN using brand color when available
              <img src={SIMPLE_ICONS(l.slug, l.color || 'ffffff')} alt={l.name} width={18} height={18} className="opacity-100" />
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
