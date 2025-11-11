export default function SocialLinks({ className = '' }: { className?: string }) {
  const SIMPLE = (slug: string, color = 'ffffff') => `https://cdn.simpleicons.org/${slug}/${color}`;

  // Social links: LinkedIn added, icons colored cyan for better visibility on dark background
  const CYAN = '06B6D4'; // cyan hex
  const links = [
    { name: 'X', href: 'https://x.com/banderradein', slug: 'x' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/banderradein', slug: 'linkedin' },
    { name: 'GitHub', href: 'https://github.com/bandarof', slug: 'github' },
  ];

  return (
    <div className={"flex items-center gap-3 " + className}>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.name}
          title={l.name}
          className={
            "inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-800/40 hover:bg-gray-700/60 transition shadow-sm text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 " +
            (l.slug === 'github' ? 'ring-2 ring-cyan-500/30 hover:scale-105 hover:shadow-[0_10px_30px_rgba(34,211,238,0.12)] bg-white/5 text-white' : 'hover:ring-4 hover:ring-cyan-400/60 hover:shadow-[0_0_12px_rgba(6,182,212,0.45)]')
          }
        >
          {/* Render LinkedIn as inline SVG to avoid CDN issues and ensure correct coloring */}
          {l.slug === 'linkedin' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <rect width="24" height="24" rx="4" fill="transparent" />
              <path d="M6.94 8.5C6.94 7.39 7.86 6.5 8.99 6.5C10.12 6.5 11.04 7.39 11.04 8.5C11.04 9.61 10.12 10.5 8.99 10.5C7.86 10.5 6.94 9.61 6.94 8.5ZM6.5 20H9.5V11.5H6.5V20ZM12.5 20H15.5V14.3C15.5 12.6 16.9 11.9 18 11.9C19.1 11.9 19.5 12.6 19.5 14V20H22V13.2C22 10 20.1 8.5 17.6 8.5C15.9 8.5 15 9.6 14.6 10.2H14.5V9H12.5V20Z" fill="currentColor" />
            </svg>
          ) : l.slug === 'github' ? (
            // use white-filled github icon and stronger visual treatment
            <img src={SIMPLE(l.slug, 'ffffff')} alt={l.name} width={18} height={18} className="filter brightness-125 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]" />
          ) : (
            <img src={SIMPLE(l.slug, CYAN)} alt={l.name} width={18} height={18} className="filter brightness-110" />
          )}
        </a>
      ))}
    </div>
  );
}
