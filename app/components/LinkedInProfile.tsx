'use client';

import { useState } from 'react';
import Timeline from './Timeline';

export default function LinkedInProfile({ profileUrl, onSummary, initialSummary }: { profileUrl: string; onSummary?: (s: string) => void; initialSummary?: string; }) {
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
        setError(json?.error || 'Failed to load profile');
      } else {
        setData(json);
        // call parent callback with best-effort summary
        const fetchedSummary = json?.profile?.summary || json?.me?.summary || json?.profile?.headline || json?.me?.localizedHeadline || null;
        if (fetchedSummary && typeof onSummary === 'function') {
          try { onSummary(fetchedSummary); } catch (e) {}
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

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
          <div className="text-center py-8">
            <p className="text-gray-300 mb-4">Load profile summary and experience from LinkedIn for {profileUrl}</p>
            <div className="flex justify-center gap-3">
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
