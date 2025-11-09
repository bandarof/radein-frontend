'use client';

import { useRef, useState } from 'react';

export default function LinkedInEmbed({ profileUrl, height = 640 }: { profileUrl: string; height?: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function ensurePlatformScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return reject(new Error('no-window'));
      if ((window as any).IN) return resolve();

      // Avoid adding duplicate script
      const existing = document.querySelector('script[src*="platform.linkedin.com/in.js"]');
      if (existing) {
        const check = () => {
          if ((window as any).IN) return resolve();
          setTimeout(check, 50);
        };
        check();
        return;
      }

      const s = document.createElement('script');
      s.src = 'https://platform.linkedin.com/in.js';
      // Load synchronously to avoid race conditions with parse
      s.async = false;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('failed to load platform script'));
      // Required config text for LinkedIn platform script
      s.text = 'lang: en_US';
      document.body.appendChild(s);
    });
  }

  async function loadEmbed() {
    if (loaded || loading) return;
    setLoading(true);
    setFailed(false);

    try {
      await ensurePlatformScript();

      // Create the MemberProfile script element that LinkedIn will parse
      const node = document.createElement('script');
      node.type = 'IN/MemberProfile';
      node.setAttribute('data-id', profileUrl);
      node.setAttribute('data-format', 'inline');

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(node);
      }

      if ((window as any).IN && typeof (window as any).IN.parse === 'function') {
        try {
          (window as any).IN.parse(containerRef.current);
        } catch (err) {
          // Parsing may still fail in restrictive environments
          console.warn('LinkedIn parse failed:', err);
        }
      }

      setLoaded(true);
    } catch (err) {
      console.error('LinkedIn embed error:', err);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="linkedin-embed w-full">
      <div
        ref={containerRef}
        style={{ minHeight: height }}
        className="mx-auto max-w-3xl bg-gray-900/60 border border-gray-800 rounded-md p-4"
        aria-hidden={failed}
      />

      {!loaded && (
        <div className="mt-4 text-center">
          <button
            onClick={loadEmbed}
            disabled={loading}
            className="inline-block px-6 py-3 rounded-md bg-cyan-400 text-gray-900 font-semibold hover:bg-cyan-300 transition"
          >
            {loading ? 'Loading...' : 'Load LinkedIn feed'}
          </button>
        </div>
      )}

      {failed && (
        <div className="mt-4 text-center text-gray-300">
          <p className="mb-3">LinkedIn content cannot be embedded due to provider restrictions.</p>
          <a
            className="inline-block px-6 py-3 rounded-md bg-cyan-400 text-gray-900 font-semibold hover:bg-cyan-300 transition"
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View my LinkedIn profile
          </a>
        </div>
      )}
    </div>
  );
}
