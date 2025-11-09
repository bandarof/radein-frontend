export default function SocialLinks({ className = '' }: { className?: string }) {
  const SIMPLE = (slug: string, color = 'ffffff') => `https://cdn.simpleicons.org/${slug}/${color}`;

  const links = [
    { name: 'Twitter', href: 'https://twitter.com/banderradein', slug: 'twitter', color: '1DA1F2' },
    { name: 'Instagram', href: 'https://instagram.com/bandarof', slug: 'instagram', color: 'E4405F' },
    { name: 'GitHub', href: 'https://github.com/bandarof', slug: 'github', color: '181717' },
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
          className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-800/60 hover:bg-gray-800/80 transition"
        >
          <img src={SIMPLE(l.slug, l.color)} alt={l.name} width={18} height={18} />
        </a>
      ))}
    </div>
  );
}
