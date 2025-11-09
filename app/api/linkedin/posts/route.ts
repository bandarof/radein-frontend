import { NextResponse } from 'next/server';
import fs from 'fs/promises';

async function readToken() {
  // First try environment variable
  if (process.env.LINKEDIN_ACCESS_TOKEN) return process.env.LINKEDIN_ACCESS_TOKEN;

  // Then try persisted file
  try {
    const raw = await fs.readFile('.data/linkedin-token.json', 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed?.token?.access_token || null;
  } catch (err) {
    return null;
  }
}

export async function GET() {
  const token = await readToken();
  if (!token) return NextResponse.json({ error: 'No access token available. Please authorize the app via /api/linkedin/auth' }, { status: 401 });

  try {
    // Fetch member id
    const meRes = await fetch('https://api.linkedin.com/v2/me', { headers: { Authorization: `Bearer ${token}` } });
    if (!meRes.ok) {
      const txt = await meRes.text();
      return NextResponse.json({ error: 'Failed to fetch /me', status: meRes.status, detail: txt }, { status: 502 });
    }
    const me = await meRes.json();

    const urn = me.id ? `urn:li:person:${me.id}` : null;
    if (!urn) return NextResponse.json({ error: 'Could not determine member URN', me }, { status: 502 });

    // Try fetching shares/posts for the member
    const sharesUrl = `https://api.linkedin.com/v2/shares?q=owners&owners=${encodeURIComponent(urn)}&sharesPerOwner=10`;
    const sharesRes = await fetch(sharesUrl, { headers: { Authorization: `Bearer ${token}` } });

    if (!sharesRes.ok) {
      const txt = await sharesRes.text();
      return NextResponse.json({ error: 'Failed to fetch shares', status: sharesRes.status, detail: txt }, { status: 502 });
    }

    const shares = await sharesRes.json();
    return NextResponse.json({ me, shares });
  } catch (err) {
    console.error('Error fetching LinkedIn posts:', err);
    return NextResponse.json({ error: 'Internal server error', detail: String(err) }, { status: 500 });
  }
}
