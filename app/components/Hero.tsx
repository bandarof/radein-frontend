'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TechLogos from './TechLogos';

const EMBED_URL = 'https://cloud.radein.com/index.php/apps/appointments/embed/EGzq4vzE7lBVQwVy/form';

export default function Hero() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    startRef.current = Date.now();
  }, []);

  // close when clicking outside
  function handleBackdropClick(e: React.MouseEvent) {
    if (!dialogRef.current) return;
    if (e.target === dialogRef.current) setOpen(false);
  }

  // open a centered popup window (used as a fallback when embedding is blocked)
  function openPopup(url: string) {
    try {
      const w = 900;
      const h = 720;
      const left = typeof window.screenX === 'number' ? window.screenX + Math.max(0, (window.innerWidth - w) / 2) : Math.max(0, (window.innerWidth - w) / 2);
      const top = typeof window.screenY === 'number' ? window.screenY + Math.max(0, (window.innerHeight - h) / 2) : Math.max(0, (window.innerHeight - h) / 2);
      const features = `toolbar=0,location=0,status=0,menubar=0,resizable=1,scrollbars=1,width=${w},height=${h},left=${Math.round(left)},top=${Math.round(top)}`;
      const popup = window.open(url, '_blank', features);
      if (popup) popup.focus();
    } catch (e) {
      // fallback to default behavior
      window.open(url, '_blank');
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-96px)] flex items-center overflow-hidden">
      {/* decorative orbs */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-cyan-400/14 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-6 w-72 h-72 rounded-full bg-indigo-500/12 blur-2xl" />

      {/* tech background animation - data packets flowing between components */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <svg className="w-full h-full opacity-70" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="dataGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#00f5ff" stopOpacity="1" />
              <stop offset="1" stopColor="#7c3aed" stopOpacity="1" />
            </linearGradient>

            <filter id="bigGlow" x="-200%" y="-200%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="12" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <g id="chip">
              <rect x="0" y="0" width="120" height="80" rx="10" ry="10" fill="#071018" stroke="rgba(124,58,237,0.18)" strokeWidth="1" />
              <rect x="10" y="10" width="100" height="60" rx="6" ry="6" fill="#031018" />
            </g>
          </defs>

          {/* chips layout */}
          <g opacity="0.98">
            <use href="#chip" x="60" y="40" />
            <use href="#chip" x="300" y="30" />
            <use href="#chip" x="540" y="50" />
            <use href="#chip" x="760" y="120" />
            <use href="#chip" x="220" y="200" />
            <use href="#chip" x="480" y="200" />
            <use href="#chip" x="820" y="180" />
          </g>

          {/* traces */}
          <g stroke="url(#dataGrad)" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeOpacity="0.95">
            <path id="t1" d="M120 80 C200 60, 280 50, 360 70 C440 90, 520 110, 600 100" strokeDasharray="5 7">
              <animate attributeName="stroke-dashoffset" from="0" to="-160" dur="2s" repeatCount="indefinite" />
            </path>
            <path id="t2" d="M320 70 C380 80, 440 100, 520 120 C600 140, 680 160, 760 150" strokeDasharray="5 7" strokeOpacity="0.85">
              <animate attributeName="stroke-dashoffset" from="0" to="160" dur="2.2s" repeatCount="indefinite" />
            </path>
            <path id="t3" d="M200 220 C300 200, 420 190, 540 200 C660 210, 780 220, 880 200" strokeDasharray="5 7" strokeOpacity="0.8">
              <animate attributeName="stroke-dashoffset" from="0" to="-140" dur="2.6s" repeatCount="indefinite" />
            </path>
          </g>

          {/* data packets flowing along traces - staggered starts for continuous flow */}
          <g filter="url(#bigGlow)">
            {/* main fast stream on t1 */}
            <rect width="18" height="8" rx="3" fill="url(#dataGrad)">
              <animateMotion dur="1.2s" repeatCount="indefinite" rotate="auto">
                <mpath href="#t1" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
            </rect>
            <rect width="18" height="8" rx="3" fill="#00ffd1">
              <animateMotion dur="1.2s" begin="0.3s" repeatCount="indefinite" rotate="auto">
                <mpath href="#t1" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
            </rect>
            <rect width="18" height="8" rx="3" fill="#a78bfa">
              <animateMotion dur="1.2s" begin="0.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#t1" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
            </rect>

            {/* secondary stream on t2 */}
            <rect width="12" height="6" rx="2" fill="#00ffd1">
              <animateMotion dur="1.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#t2" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite" />
            </rect>
            <rect width="12" height="6" rx="2" fill="#a78bfa">
              <animateMotion dur="1.6s" begin="0.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#t2" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
            </rect>

            {/* tertiary stream on t3 */}
            <rect width="14" height="7" rx="3" fill="#7c3aed">
              <animateMotion dur="1.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#t3" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
            </rect>
            <rect width="14" height="7" rx="3" fill="#00f5ff">
              <animateMotion dur="1.4s" begin="0.5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#t3" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="0.5s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* faint circuitry grid for context */}
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
            <path d="M0 0 L1000 0 M0 80 L1000 80 M0 160 L1000 160 M0 240 L1000 240 M0 320 L1000 320" />
            <path d="M0 0 L0 500 M120 0 L120 500 M240 0 L240 500 M360 0 L360 500 M480 0 L480 500 M600 0 L600 500 M720 0 L720 500 M840 0 L840 500 M960 0 L960 500" />
          </g>
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
            <path d="M0 0 L1000 0 M0 80 L1000 80 M0 160 L1000 160 M0 240 L1000 240 M0 320 L1000 320" />
            <path d="M0 0 L0 500 M120 0 L120 500 M240 0 L240 500 M360 0 L360 500 M480 0 L480 500 M600 0 L600 500 M720 0 L720 500 M840 0 L840 500 M960 0 L960 500" />
          </g>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10"
      >
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-sm text-cyan-300 font-medium tracking-widest uppercase">Hi, my name is</p>

          <h1 className="mt-3 text-5xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-cyan-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_6px_48px_rgba(2,6,23,0.6)]">
            Bander Radein
          </h1>

          <div className="mt-3">
            <p className="ml-10 font-semibold text-lg leading-tight">Building Digital Powerhouses</p>
          </div>

          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-80" aria-hidden={true}></div>

          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl">
            I create scalable web apps & blockchain-ready platforms that drive business growth
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
            <a
              href={EMBED_URL}
              onClick={async (e) => {
                e.preventDefault();

                // Basic client-side anti-bot: require a short dwell time before allowing the request
                const minDelay = 3000; // ms
                const now = Date.now();
                if (now - startRef.current < minDelay) {
                  alert('Please stay on the page for a moment before booking to prevent spam.');
                  return;
                }

                try {
                  // Call protected server endpoint which applies rate-limiting and optional CAPTCHA verification
                  const res = await fetch('/api/hire', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ embedUrl: EMBED_URL, startedAt: startRef.current, honeypot: '' }),
                  });

                  const json = await res.json();
                  if (!res.ok) {
                    alert(json?.error || 'Could not open booking form. Please try again later.');
                    return;
                  }

                  // If server allowed, proceed to check whether the embed can be iframed
                  try {
                    const check = await fetch(`/api/embed/check?url=${encodeURIComponent(EMBED_URL)}`);
                    const checkJson = await check.json();
                    const xfo = (checkJson.headers && checkJson.headers['x-frame-options']) || '';
                    const csp = (checkJson.headers && checkJson.headers['content-security-policy']) || '';

                    const blockedByXFO = xfo && (xfo.toLowerCase().includes('deny') || xfo.toLowerCase().includes('sameorigin'));

                    let blockedByCSP = false;
                    const m = csp ? csp.match(/frame-ancestors\s+([^;]+)/i) : null;
                    if (m && m[1]) {
                      const fa = m[1];
                      if (!fa.includes('*') && !/self|'self'/.test(fa) && !fa.includes(window.location.origin)) blockedByCSP = true;
                    }

                    if (blockedByXFO || blockedByCSP) {
                      // fallback to opening a centered popup when embedding is blocked
                      openPopup(EMBED_URL);
                      return;
                    }

                    setOpen(true);
                  } catch (err) {
                    openPopup(EMBED_URL);
                  }
                } catch (err) {
                  // network or unexpected error
                  alert('An error occurred while contacting the booking service. Please try again.');
                }
              }}
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-cyan-400 text-gray-900 font-semibold transition hero-cta neon-border"
              rel="noopener noreferrer nofollow"
            >
              Hire me!
            </a>

            <a
              href="/portfolio"
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg border border-gray-700 text-gray-200 hover:border-cyan-400/60 hover:text-white transition backdrop-blur-sm"
            >
              View portfolio
            </a>
          </div>

          {/* tech logos */}
          <div className="mt-10">
            <TechLogos />
          </div>
        </div>

        <div className="hidden lg:block flex-shrink-0 transform lg:-translate-y-12 xl:-translate-y-20">
          <div className="relative mx-auto md:mx-0 w-56 h-56 rounded-2xl glass neon-border flex items-center justify-center overflow-hidden">
            <img
              src="/profile.png"
              alt="Bander Radein"
              className="w-44 h-44 rounded-full border-2 border-cyan-400/60 shadow-[0_10px_30px_rgba(2,6,23,0.6)] transform hover:scale-102 transition"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-400/8 to-indigo-400/8" />
          </div>
        </div>
      </motion.div>

      {/* Modal dialog for embed */}
      {open && (
        <div
          ref={dialogRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Hire me booking form"
        >
          <div className="relative w-full max-w-4xl h-[80vh] rounded-xl bg-gray-900/80 border border-gray-800 shadow-2xl overflow-hidden">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-30 inline-flex items-center justify-center w-9 h-9 rounded-md bg-gray-800/60 hover:bg-gray-800/80 text-gray-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe
              src={EMBED_URL}
              title="Booking form"
              className="w-full h-full bg-white"
              frameBorder={0}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
