import { NextResponse } from 'next/server';

function pickProfilePicture(data: any) {
  try {
    const display = data['profilePicture']?.['displayImage~'];
    const elements = display?.elements;
    if (Array.isArray(elements)) {
      // choose the largest by width in identifiers
      let best = null;
      let bestWidth = 0;
      for (const el of elements) {
        const ids = el?.identifiers;
        if (!Array.isArray(ids)) continue;
        for (const id of ids) {
          const w = id?.data?.com.linkedin.digitalmedia.mediaartifact.StillImage?.attributes?.width || id?.width || 0;
          const url = id?.identifier || id?.file || id?.uri;
          if (!url) continue;
          if (w > bestWidth) {
            bestWidth = w;
            best = url;
          } else if (!best) {
            best = url;
          }
        }
      }
      return best;
    }
  } catch (e) {}
  return null;
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const tokenMatch = cookieHeader.match(/linkedin_access_token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  if (!token) return NextResponse.json({ error: 'no_token' }, { status: 401 });

  // Fetch profile with picture projection
  const profileRes = await fetch(
    'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!profileRes.ok) {
    const t = await profileRes.text();
    return NextResponse.json({ error: 'profile_fetch_failed', detail: t }, { status: 500 });
  }

  const profileJson = await profileRes.json();
  const picture = pickProfilePicture(profileJson) || null;

  // Optionally fetch email
  let email = null;
  try {
    const eRes = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (eRes.ok) {
      const eJson = await eRes.json();
      email = eJson?.elements?.[0]?.['handle~']?.emailAddress || null;
    }
  } catch (e) {}

  return NextResponse.json({ profile: profileJson, picture, email });
}
