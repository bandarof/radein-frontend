type Logo = {
  name: string;
  src?: string; // local public path
  slug?: string; // simpleicons slug
  color?: string; // brand hex without '#'
  bg?: string;
  fg?: string;
  label?: string; // fallback label
  description?: string;
};

// Map of logos ordered by importance. If slug exists we fetch from Simple Icons CDN and use brand color.
const logos: Logo[] = [
  { name: "Next.js", slug: "nextdotjs", color: "000000", description: "Production-ready React framework for server rendering and static sites." },
  { name: "React", slug: "react", color: "61DAFB", description: "A declarative UI library for building component-based interfaces." },
  { name: "TypeScript", slug: "typescript", color: "3178C6", description: "Typed superset of JavaScript for safer, scalable code." },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E", description: "The language of the web — dynamic, flexible, and ubiquitous." },
  { name: "HTML", slug: "html5", color: "E34F26", description: "Standard markup language for structuring web pages." },
  { name: "Node.js", slug: "nodedotjs", color: "339933", description: "JavaScript runtime for building fast, scalable network applications." },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4", description: "Utility-first CSS framework for rapid UI development." },
  { name: "PHP", slug: "php", color: "777BB4", description: "Widely-used server-side scripting language for web development." },
  { name: "Nginx", slug: "nginx", color: "009639", description: "High-performance HTTP server, reverse proxy and load balancer." },
  { name: "Docker", slug: "docker", color: "2496ED", description: "Containerization platform for packaging and running applications." },
  { name: "PostgreSQL", slug: "postgresql", color: "336791", description: "Advanced open-source relational database." },
  { name: "Supabase", slug: "supabase", color: "3ECF8E", description: "Open-source Firebase alternative: Postgres, auth, and realtime." },
  { name: "web3.js", slug: "web3dotjs", color: "143CFB", description: "JavaScript library to interact with the Ethereum blockchain." },
  { name: "Remix", slug: "remix", color: "B4282E", description: "Full stack web framework focused on web fundamentals and UX." },
  { name: "Solidity", slug: "solidity", color: "363636", description: "Contract-oriented language for writing smart contracts on Ethereum." },
  { name: "Python", slug: "python", color: "3776AB", description: "Versatile high-level programming language for many domains." },
  { name: "GitHub", slug: "github", color: "181717", description: "Code hosting and collaboration platform." },
  { name: "Git", slug: "git", color: "F05032", description: "Distributed version control system." },
  { name: "Vercel", slug: "vercel", color: "000000", description: "Deployment platform optimized for front-end frameworks." },
  { name: "UNIX", label: "UNIX", bg: "#0f172a", fg: "#34D399", description: "POSIX-like operating systems and command line tools." },
];

const SIMPLE_ICONS = (slug: string, color = "ffffff") => `https://cdn.simpleicons.org/${slug}/${color}`;

export default function TechLogos() {
  return (
    <div className="w-full mb-6">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tech I work with</p>
      <div className="flex flex-wrap items-center gap-3 opacity-95">
        {logos.map((l) => (
          <div key={l.name} className="relative group">
            <div
              className="flex items-center gap-3 rounded-lg transition px-3 py-2 bg-gray-800/30 hover:bg-gray-800/40"
              aria-describedby={`tech-${l.name.replace(/\s+/g, '-')}`}
            >
              <div className="logo-tile flex-shrink-0">
                {l.src ? (
                  <img src={l.src} alt={l.name} width={20} height={20} />
                ) : l.slug ? (
                  // fetch colored SVG from Simple Icons CDN using brand color when available
                  <img src={SIMPLE_ICONS(l.slug, l.color || 'ffffff')} alt={l.name} width={20} height={20} />
                ) : (
                  <span className="text-[11px] font-semibold px-2 py-1" style={{ background: l.bg || '#111827', color: l.fg || '#E5E7EB' }}>
                    {l.label || l.name}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-300 hidden sm:inline">{l.name}</span>
            </div>

            {/* Tooltip */}
            {l.description && (
              <div
                id={`tech-${l.name.replace(/\s+/g, '-')}`}
                role="tooltip"
                className="pointer-events-none absolute left-1/2 transform -translate-x-1/2 -bottom-10 mb-2 w-64 max-w-xs rounded-md bg-gray-900/90 text-xs text-gray-100 p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                aria-hidden="true"
              >
                {l.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
