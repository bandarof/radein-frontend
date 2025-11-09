'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TechLogos from './TechLogos';

const EMBED_URL = 'https://cloud.radein.com/index.php/apps/appointments/embed/EGzq4vzE7lBVQwVy/form';

export default function Hero() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

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

          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-80" aria-hidden />

          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl">
            I build high-tech, modern web applications and integrate cutting-edge AI and blockchain solutions.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
            <a
              href={EMBED_URL}
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch(`/api/embed/check?url=${encodeURIComponent(EMBED_URL)}`);
                  const json = await res.json();
                  const xfo = (json.headers && json.headers['x-frame-options']) || '';
                  const csp = (json.headers && json.headers['content-security-policy']) || '';

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
              }}
              className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-cyan-400 text-gray-900 font-semibold transition hero-cta neon-border"
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

        <div className="flex-shrink-0">
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
