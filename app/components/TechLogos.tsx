"use client";

import { useState } from 'react';

type Logo = {
  name: string;
  src?: string; // local public path
  slug?: string; // simpleicons slug
  color?: string; // brand hex without '#'
  bg?: string;
  fg?: string;
  label?: string; // fallback label
  desc: string;
};

// Map of logos ordered by importance. If slug exists we fetch from Simple Icons CDN and use brand color.
const logos: Logo[] = [
  { name: "Next.js", slug: "nextdotjs", color: "000000", desc: "React framework for production: routing, SSR/SSG, edge/server functions, and great DX." },
  { name: "React", slug: "react", color: "61DAFB", desc: "Component-based UI library for building interactive web apps with state and hooks." },
  { name: "TypeScript", slug: "typescript", color: "3178C6", desc: "Typed superset of JavaScript that improves safety, tooling, and maintainability." },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E", desc: "The language of the web for dynamic, interactive experiences across browsers and servers." },
  { name: "HTML", slug: "html5", color: "E34F26", desc: "Markup language that structures content and semantics on the web." },
  { name: "Node.js", slug: "nodedotjs", color: "339933", desc: "V8-powered JavaScript runtime for building scalable backends and tooling." },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4", desc: "Utility-first CSS framework for rapidly building modern, responsive UIs." },
  { name: "PHP", slug: "php", color: "777BB4", desc: "Server-side scripting language widely used for web applications and APIs." },
  { name: "Nginx", slug: "nginx", color: "009639", desc: "High‑performance web server, reverse proxy, and load balancer." },
  { name: "Docker", slug: "docker", color: "2496ED", desc: "Container platform to package, ship, and run applications reproducibly." },
  { name: "PostgreSQL", slug: "postgresql", color: "336791", desc: "Advanced open‑source relational database with strong SQL and extensibility." },
  { name: "Supabase", slug: "supabase", color: "3ECF8E", desc: "Open source Firebase alternative: Postgres, Auth, Storage, and real‑time APIs." },
  { name: "web3.js", slug: "web3dotjs", color: "143CFB", desc: "JavaScript libraries for interacting with Ethereum and EVM-compatible blockchains." },
  { name: "BNB Smart Chain", slug: "binance", color: "F3BA2F", desc: "EVM-compatible blockchain (BNB Smart Chain) for fast, low-cost transactions and scalable dApps." },
  { name: "Postman", slug: "postman", color: "FF6C37", desc: "API development environment for building, testing, and documenting APIs with collaboration." },
  { name: "Builder.io", src: "https://cdn.builder.io/api/v1/image/assets%2F16fe0aa9fbed403f8fb856fe14742033%2F5cedf6b893bb41b5af30ce60412824ba?format=webp&width=800", color: "6200EA", desc: "Visual headless CMS and page builder for composing and delivering content-driven experiences." },
  { name: "Remix", slug: "remix", color: "B4282E", desc: "Full‑stack web framework focusing on web standards, forms, and nested routing." },
  { name: "ArcGIS", src: "https://cdn.builder.io/api/v1/image/assets%2F16fe0aa9fbed403f8fb856fe14742033%2Fbe535e6a481f4abb8371761ed42d1c71?format=webp&width=800", color: "006BAD", desc: "Platform for mapping and spatial analytics; build, manage, and analyze geospatial data." },
  { name: "SketchUp", slug: "sketchup", color: "E92930", desc: "3D modeling software used for architectural, interior, and product design." },
  { name: "SAP", slug: "sap", color: "006BB8", desc: "Enterprise software for ERP, analytics, and business process management." },
  { name: "cPanel", slug: "cpanel", color: "FF6C2C", desc: "Web hosting control panel for managing servers, domains, and email via a graphical interface." },
  { name: "Avaya", src: "https://cdn.builder.io/api/v1/image/assets%2F16fe0aa9fbed403f8fb856fe14742033%2Fe2a2ce935ed649d290cbc9e1af451d3d?format=webp&width=800", desc: "Provider of business communications and collaboration solutions, including VoIP and unified communications." },
  { name: "Solidity", slug: "solidity", color: "363636", desc: "Contract‑oriented language for writing smart contracts on Ethereum." },
  { name: "Python", slug: "python", color: "3776AB", desc: "Versatile programming language for scripting, data, and backend services." },
  { name: "Visual Studio", src: "https://visualstudio.microsoft.com/wp-content/uploads/2021/10/Product-Icon.svg", color: "5C2D91", desc: "Integrated development environment by Microsoft for building apps and services." },
  { name: "ICD-10", src: "https://cdn.builder.io/api/v1/image/assets%2F16fe0aa9fbed403f8fb856fe14742033%2Fbfb69800f8ab4019a6fa20d99c43c1fd?format=webp&width=800", desc: "International Classification of Diseases, 10th Revision medical coding standard." },
  { name: "GitHub", slug: "github", color: "181717", desc: "Code hosting platform for collaboration, CI/CD, issues, and code review." },
  { name: "Git", slug: "git", color: "F05032", desc: "Distributed version control system for branching, merging, and history." },
  { name: "Vercel", slug: "vercel", color: "000000", desc: "Cloud platform for deploying frontends and serverless functions—ideal for Next.js." },
  { name: "Linux", src: "https://cdn.builder.io/api/v1/image/assets%2F16fe0aa9fbed403f8fb856fe14742033%2F0317244a793643bfa681c568a5208840?format=webp&width=800", desc: "Open-source family of Unix-like operating systems, widely used on servers, embedded systems, and desktops." },
];

const SIMPLE_ICONS = (slug: string, color = "ffffff") => `https://cdn.simpleicons.org/${slug}/${color}`;

export default function TechLogos() {
  const [active, setActive] = useState<Logo | null>(null);

  function toggleActive(logo: Logo) {
    setActive((curr) => (curr?.name === logo.name ? null : logo));
  }

  function onKey(e: React.KeyboardEvent<HTMLDivElement>, logo: Logo) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleActive(logo);
    }
  }

  // Stable pseudo-random generator based on logo name
  function hashCode(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  return (
    <div className="w-full mb-6">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tech I work with</p>

      {/* Single container (flex) with relative positioning to avoid changing DOM structure between server and client */}
      <div className="flex flex-wrap items-center gap-3 opacity-95 relative">
        {logos.map((l) => {
          const h = hashCode(l.name);
          const delay = (h % 2200) / 1000; // 0 - 2.199s
          const dur = 3.2 + ((hashCode(l.name + 'x') % 2400) / 1000); // 3.2 - 5.599s
          const brighten = l.name === 'Next.js' || l.name === 'GitHub';
          return (
            <div
              key={l.name}
              className="flex items-center gap-3 rounded-lg transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/60 logo-glow logo-pulse"
              title={l.name}
              role="button"
              tabIndex={0}
              aria-pressed={active?.name === l.name}
              aria-expanded={active?.name === l.name}
              aria-controls={active?.name === l.name ? 'tech-desc-panel' : undefined}
              onClick={() => toggleActive(l)}
              onKeyDown={(e) => onKey(e, l)}
              style={{ animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
            >
              <div className="logo-tile" style={{ boxShadow: l.color ? `0 12px 36px ${'#' + l.color}22` : undefined, background: brighten ? 'rgba(255,255,255,0.04)' : undefined }}>
                {l.src ? (
                  <img src={l.src} alt={l.name} width={20} height={20} style={brighten ? { filter: 'brightness(1.22)' } : undefined} />
                ) : l.slug ? (
                  // fetch colored SVG from Simple Icons CDN using brand color when available
                  <img src={SIMPLE_ICONS(l.slug, l.color || 'ffffff')} alt={l.name} width={20} height={20} style={brighten ? { filter: 'brightness(1.22)' } : undefined} />
                ) : (
                  <span className="text-[11px] font-semibold" style={{ background: l.bg || "#111827", color: l.fg || "#E5E7EB" }}>
                    {l.label || l.name}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-300 hidden sm:inline">{l.name}</span>
            </div>
          );
        })}

        {/* Absolutely positioned description panel to avoid pushing other content (like the profile picture) */}
        {active && (
          <div className="absolute left-0 right-0 mt-2 z-20 flex justify-center pointer-events-auto">
            <div
              id="tech-desc-panel"
              className="w-full sm:w-[min(48rem,calc(100%-1rem))] rounded-lg border border-emerald-500/30 bg-gray-800/60 p-4 shadow-lg backdrop-blur-sm"
              role="region"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div className="logo-tile shrink-0 mt-0.5">
                  {active.src ? (
                    <img src={active.src} alt={active.name} width={20} height={20} style={active.name === 'Next.js' || active.name === 'GitHub' ? { filter: 'brightness(1.22)' } : undefined} />
                  ) : active.slug ? (
                    <img src={SIMPLE_ICONS(active.slug, active.color || 'ffffff')} alt={active.name} width={20} height={20} style={active.name === 'Next.js' || active.name === 'GitHub' ? { filter: 'brightness(1.22)' } : undefined} />
                  ) : (
                    <span className="text-[11px] font-semibold" style={{ background: active.bg || "#111827", color: active.fg || "#E5E7EB" }}>
                      {active.label || active.name}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-100">{active.name}</p>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{active.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="ml-auto text-gray-400 hover:text-gray-200 transition"
                  aria-label="Close description"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
