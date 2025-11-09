import { NextResponse } from 'next/server';

// Simple in-memory rate limiter. For production use Redis or another persistent store.
const RATE_LIMIT_MAP = new Map<string, number[]>();
const RATE_LIMIT_MAX = 6; // max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const MIN_DELAY_MS = 3000; // require user to stay on page at least 3s
const BOT_UA_REGEX = /bot|spider|crawler|curl|wget|python-requests|libwww-perl|httpclient|scan|scrap/i;

async function verifyTurnstile(secret: string, token: string, remoteip?: string) {
  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);
  if (remoteip) params.append('remoteip', remoteip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) return false;
  const json = await res.json();
  return json && json.success;
}

export async function POST(req: Request) {
  const now = Date.now();
  const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
  const ua = req.headers.get('user-agent') || '';

  // parse body
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { embedUrl, startedAt, honeypot, token } = body;

  // honeypot must be empty
  if (honeypot && honeypot !== '') {
    return NextResponse.json({ ok: false, error: 'honeypot_triggered' }, { status: 400 });
  }

  // basic UA bot detection
  if (ua && BOT_UA_REGEX.test(ua)) {
    return NextResponse.json({ ok: false, error: 'bot_detected' }, { status: 403 });
  }

  // require minimum dwell time
  if (!startedAt || typeof startedAt !== 'number' || now - startedAt < MIN_DELAY_MS) {
    return NextResponse.json({ ok: false, error: 'too_soon' }, { status: 429 });
  }

  // rate limit per IP
  const arr = RATE_LIMIT_MAP.get(ip) || [];
  const filtered = arr.filter((ts) => now - ts < RATE_LIMIT_WINDOW);
  if (filtered.length >= RATE_LIMIT_MAX) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  filtered.push(now);
  RATE_LIMIT_MAP.set(ip, filtered);

  // Optional Cloudflare Turnstile verification if secret is provided
  const TURNSTILE_SECRET = process.env.CF_TURNSTILE_SECRET || process.env.TURNSTILE_SECRET || '';
  if (TURNSTILE_SECRET) {
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ ok: false, error: 'captcha_required' }, { status: 400 });
    }
    try {
      const ok = await verifyTurnstile(TURNSTILE_SECRET, token, ip === 'unknown' ? undefined : ip);
      if (!ok) return NextResponse.json({ ok: false, error: 'captcha_failed' }, { status: 403 });
    } catch (e) {
      return NextResponse.json({ ok: false, error: 'captcha_error' }, { status: 500 });
    }
  }

  // All checks passed: return the embed URL (server does not redirect to allow client-side embed checks)
  return NextResponse.json({ ok: true, embedUrl: embedUrl || '' });
}
