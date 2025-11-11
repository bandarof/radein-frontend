'use client';

import { useState } from 'react';

export default function LinkedInEmbed({ profileUrl, height = 640, posts }: { profileUrl: string; height?: number; posts?: any | null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  async function loadFeed() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/linkedin/posts');
      if (res.status === 401) {
        // Not authorized — surface error instead of redirecting
        setError('Not authorized to fetch LinkedIn posts');
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || 'Failed to load feed');
      } else {
        setData(json);
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  // if posts are provided from parent, use them
  const feed = posts || data;

  return (
    <div className="linkedin-embed w-full">
      <div style={{ minHeight: height }} className="mx-auto max-w-3xl bg-gray-900/60 border border-gray-800 rounded-md p-4">
        {!feed && (
          <div className="text-center py-12">
            <p className="text-gray-300 mb-4">Load posts from LinkedIn for {profileUrl}</p>
            <button onClick={loadFeed} disabled={loading} className="px-6 py-3 rounded-md bg-cyan-400 text-gray-900 font-semibold hover:bg-cyan-300 transition">
              {loading ? 'Loading...' : 'Load LinkedIn feed'}
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm mt-4">{error}</div>
        )}

        {feed && (
          <div className="space-y-6">
            {feed.shares?.elements?.length ? (
              feed.shares.elements.map((s: any, i: number) => (
                <article key={i} className="p-4 bg-gray-900/70 border border-gray-800 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm text-gray-200">{JSON.stringify(s, null, 2)}</pre>
                </article>
              ))
            ) : (
              <div className="text-gray-400 p-4">No posts available or insufficient permissions.</div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 text-center text-gray-300">
          <p className="mb-3">LinkedIn content cannot be embedded due to provider restrictions.</p>
          <a className="inline-block px-6 py-3 rounded-md bg-cyan-400 text-gray-900 font-semibold hover:bg-cyan-300 transition" href={profileUrl} target="_blank" rel="noopener noreferrer">View my LinkedIn profile</a>
        </div>
      )}
    </div>
  );
}
