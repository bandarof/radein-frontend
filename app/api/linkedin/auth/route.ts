import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'missing config' }, { status: 500 });
  }

  const state = Math.random().toString(36).slice(2);
  const scope = encodeURIComponent('r_liteprofile r_emailaddress');
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&scope=${scope}`;

  const res = NextResponse.redirect(authUrl);
  // set state cookie for verification (short lived)
  res.cookies.set('linkedin_oauth_state', state, { httpOnly: true, path: '/', maxAge: 300 });
  return res;
}
