import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  if (!clientId) return NextResponse.json({ error: 'LINKEDIN_CLIENT_ID not configured' }, { status: 500 });

  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/linkedin/callback`;
  const state = Math.random().toString(36).slice(2);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'r_liteprofile r_emailaddress w_member_social r_organization_social',
    state,
  });

  const url = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  return NextResponse.redirect(url);
}
