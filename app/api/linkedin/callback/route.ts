import { NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/linkedin/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'LinkedIn client credentials not configured' }, { status: 500 });
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  try {
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const tokenJson = await tokenRes.json();

    // store token to .data/linkedin-token.json for server-side usage
    try {
      await fs.mkdir('.data', { recursive: true });
      await fs.writeFile('.data/linkedin-token.json', JSON.stringify({ token: tokenJson, fetchedAt: Date.now() }, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist token:', err);
    }

    const successHtml = `<!doctype html><html><head><meta charset="utf-8"><title>LinkedIn Connected</title></head><body style="background:#0b1220;color:#e6eef8;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif"><div style="max-width:760px;text-align:center;padding:24px;border-radius:8px;background:#07122666;border:1px solid rgba(255,255,255,0.03)"><h1 style="margin:0 0 12px">LinkedIn connected</h1><p style="margin:0 0 18px">Your LinkedIn app has been authorized and the access token was saved to the server. You can now return to the site and view the feed.</p><p style="font-size:13px;color:#9fb2c9;margin-bottom:0.5rem">If you see errors when fetching the feed, check the server logs for token exchange details.</p></div></body></html>`;

    return new Response(successHtml, { status: 200, headers: { 'Content-Type': 'text/html' } });
  } catch (err) {
    console.error('Token exchange error:', err);
    return NextResponse.json({ error: 'Token exchange failed', detail: String(err) }, { status: 500 });
  }
}
