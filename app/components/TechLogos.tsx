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

// Map of logos ordered by importance. If slug exists we fetch from Simple Icons CDN and use brand color.
const logos: Logo[] = [
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "HTML", slug: "html5", color: "E34F26" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
  { name: "PHP", slug: "php", color: "777BB4" },
  { name: "Nginx", slug: "nginx", color: "009639" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "PostgreSQL", slug: "postgresql", color: "336791" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "web3.js", slug: "web3dotjs", color: "143CFB" },
  { name: "Remix", slug: "remix", color: "B4282E" },
  { name: "Solidity", slug: "solidity", color: "363636" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  // UNIX (no canonical Simple Icons entry) - styled badge
  { name: "UNIX", label: "UNIX", bg: "#0f172a", fg: "#34D399" },
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
            className="flex items-center gap-3 rounded-lg transition"
            title={l.name}
          >
            <div className="logo-tile">
              {l.src ? (
                <img src={l.src} alt={l.name} width={20} height={20} />
              ) : l.slug ? (
                // fetch colored SVG from Simple Icons CDN using brand color when available
                <img src={SIMPLE_ICONS(l.slug, l.color || 'ffffff')} alt={l.name} width={20} height={20} />
              ) : (
                <span className="text-[11px] font-semibold" style={{ background: l.bg || "#111827", color: l.fg || "#E5E7EB" }}>
                  {l.label || l.name}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-300 hidden sm:inline">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
