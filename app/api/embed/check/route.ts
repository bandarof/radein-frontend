import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const target = url.searchParams.get('url');
    if (!target) {
      return NextResponse.json({ ok: false, error: 'missing url' }, { status: 400 });
    }

    // Try HEAD first, fallback to GET
    let res: Response;
    try {
      res = await fetch(target, { method: 'HEAD' });
    } catch (e) {
      res = await fetch(target, { method: 'GET' });
    }

    const xfo = res.headers.get('x-frame-options');
    const csp = res.headers.get('content-security-policy');

    return NextResponse.json({ ok: true, headers: { 'x-frame-options': xfo, 'content-security-policy': csp } });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
