'use client';

import { useState, useEffect } from 'react';
import Timeline from './Timeline';

export default function LinkedInProfile({ profileUrl, onSummary, initialSummary, onPosts }: { profileUrl: string; onSummary?: (s: string) => void; initialSummary?: string; onPosts?: (p: any) => void; }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  async function loadProfile() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/linkedin/profile');
      if (res.status === 401) {
        // Not authorized — redirect user to auth flow
        window.location.href = '/api/linkedin/auth';
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        // don't auto-redirect; surface the status to the UI
        setError(json?.error || 'Failed to load profile');
      } else {
        setData(json);
        // call parent callback with best-effort summary
        const fetchedSummary = json?.profile?.summary || json?.me?.summary || json?.profile?.headline || json?.me?.localizedHeadline || null;
        if (fetchedSummary && typeof onSummary === 'function') {
          try { onSummary(fetchedSummary); } catch (e) {}
        }

        // try to fetch posts and notify parent
        if (typeof onPosts === 'function') {
          try {
            const postsRes = await fetch('/api/linkedin/posts');
            if (postsRes.ok) {
              const postsJson = await postsRes.json();
              try { onPosts(postsJson); } catch (e) {}
            } else {
              // if unauthorized or other, ignore here
            }
          } catch (e) {}
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // attempt to load profile automatically; if not authorized this will setError but won't redirect
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Extract summary and experiences from response
  function extractExperience(profileData: any) {
    // LinkedIn returns different shapes; try common patterns
    const p = profileData?.profile || profileData?.me || profileData;
    const experiences: any[] = [];

    // 1) positions.*elements or positions if projection used
    if (p?.positions?.elements && Array.isArray(p.positions.elements)) {
      p.positions.elements.forEach((pos: any) => experiences.push(pos));
    } else if (p?.positions && Array.isArray(p.positions)) {
      p.positions.forEach((pos: any) => experiences.push(pos));
    } else if (p?.profile && p.profile.positions && Array.isArray(p.profile.positions)) {
      p.profile.positions.forEach((pos: any) => experiences.push(pos));
    }

    // 2) fallback: look at 'experience' or 'jobs'
    if (p?.experience && Array.isArray(p.experience)) experiences.push(...p.experience);
    if (p?.jobs && Array.isArray(p.jobs)) experiences.push(...p.jobs);

    return experiences;
  }

  const summary = data?.profile?.summary || data?.me?.summary || data?.profile?.headline || data?.me?.localizedHeadline || null;
  const experiences = data ? extractExperience(data) : [];

  return (
    <div className="linkedin-profile">
      <div className="mx-auto max-w-3xl bg-gray-900/60 border border-gray-800 rounded-md p-6">
        {!data && (
          <div className="py-6">
            {initialSummary ? (
              <div className="mb-4">
                <p className="mt-2 text-gray-300 text-sm leading-relaxed">{initialSummary}</p>
              </div>
            ) : (
              <p className="text-gray-300 mb-4 text-center">Load profile summary and experience from LinkedIn for {profileUrl}</p>
            )}

            <div className="flex justify-center gap-3 mt-4">
              <button onClick={loadProfile} disabled={loading} className="px-6 py-3 rounded-md bg-cyan-400 text-gray-900 font-semibold hover:bg-cyan-300 transition">
                {loading ? 'Loading...' : 'Load LinkedIn profile'}
              </button>
              <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-md border border-gray-700 text-gray-200 hover:text-white">Open LinkedIn</a>
            </div>
          </div>
        )}

        {error && <div className="text-red-400 text-sm">{error}</div>}

        {data && (
          <div>
            {summary && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Summary</h3>
                <p className="mt-2 text-gray-300">{summary}</p>
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <Timeline items={experiences} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
