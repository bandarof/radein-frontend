import { NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET() {
  try {
    const raw = await fs.readFile('.data/linkedin-token.json', 'utf-8');
    const parsed = JSON.parse(raw);
    const token = parsed?.token || parsed;
    const access_token = token?.access_token || null;
    const expires_in = token?.expires_in || null;

    return NextResponse.json({ exists: true, access_token: access_token ? '***REDACTED***' : null, expires_in, fetchedAt: parsed.fetchedAt || null });
  } catch (err: any) {
    return NextResponse.json({ exists: false, error: String(err) }, { status: 404 });
  }
}
