import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const storedState = req.headers.get('cookie')?.match(/linkedin_oauth_state=([^;]+)/)?.[1] || null;

  if (!code) return NextResponse.json({ error: 'missing code' }, { status: 400 });
  if (!state || !storedState || state !== storedState) {
    return NextResponse.json({ error: 'invalid state' }, { status: 400 });
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ error: 'missing config' }, { status: 500 });
  }

  // Exchange code for access token
  const params = new URLSearchParams();
  params.set('grant_type', 'authorization_code');
  params.set('code', code);
  params.set('redirect_uri', redirectUri);
  params.set('client_id', clientId);
  params.set('client_secret', clientSecret);

  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!tokenRes.ok) {
    const t = await tokenRes.text();
    return NextResponse.json({ error: 'token exchange failed', detail: t }, { status: 500 });
  }

  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token;
  const expiresIn = tokenJson.expires_in;

  const res = NextResponse.redirect('/');
  // set secure httpOnly cookie for access token (short lived)
  res.cookies.set('linkedin_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Number(expiresIn) || 3600,
  });
  // clear state cookie
  res.cookies.set('linkedin_oauth_state', '', { path: '/', maxAge: 0 });
  return res;
}
