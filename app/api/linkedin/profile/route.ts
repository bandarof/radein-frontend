import { NextResponse } from 'next/server';
import fs from 'fs/promises';

async function readToken() {
  if (process.env.LINKEDIN_ACCESS_TOKEN) return process.env.LINKEDIN_ACCESS_TOKEN;
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
    // Basic member data
    const meRes = await fetch('https://api.linkedin.com/v2/me', { headers: { Authorization: `Bearer ${token}` } });
    if (!meRes.ok) {
      const txt = await meRes.text();
      return NextResponse.json({ error: 'Failed to fetch /me', status: meRes.status, detail: txt }, { status: 502 });
    }
    const me = await meRes.json();

    // Attempt to fetch profile fields including positions via projection
    // Note: this may require additional LinkedIn API permissions and may fail with 403.
    let profile: any = null;
    try {
      // Use projection to request positions and summary if available
      // This endpoint may not be available for all apps; handle errors gracefully
      const projection = encodeURIComponent('(id,localizedFirstName,localizedLastName,headline,summary,positions*(title,company,description,location,startDate,endDate))');
      const profileUrl = `https://api.linkedin.com/v2/people/(id:${me.id})?projection=${projection}`;
      const profileRes = await fetch(profileUrl, { headers: { Authorization: `Bearer ${token}` } });
      if (profileRes.ok) {
        profile = await profileRes.json();
      } else {
        // Try alternate projection that some accounts support
        const altUrl = `https://api.linkedin.com/v2/people/(id:${me.id})`;
        const altRes = await fetch(altUrl, { headers: { Authorization: `Bearer ${token}` } });
        if (altRes.ok) profile = await altRes.json();
        else {
          const txt = await profileRes.text();
          profile = { error: 'Profile projection failed', status: profileRes.status, detail: txt };
        }
      }
    } catch (err: any) {
      profile = { error: 'Profile fetch error', detail: String(err) };
    }

    return NextResponse.json({ me, profile });
  } catch (err: any) {
    console.error('Error fetching LinkedIn profile:', err);
    return NextResponse.json({ error: 'Internal server error', detail: String(err) }, { status: 500 });
  }
}
