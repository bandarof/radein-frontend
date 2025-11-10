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
          className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-800/40 hover:bg-gray-700/60 transition shadow-sm"
        >
          {/* fetch cyan icon for higher contrast on dark background */}
          <img src={SIMPLE(l.slug, CYAN)} alt={l.name} width={18} height={18} className="filter brightness-110" />
        </a>
      ))}
    </div>
  );
}
