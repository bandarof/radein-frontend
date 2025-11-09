'use client';

import { motion } from 'framer-motion';
import TechLogos from './TechLogos';

export default function Hero() {
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
              href="https://cloud.radein.com/index.php/apps/appointments/pub/EGzq4vzE7lBVQwVy/form"
              target="_blank"
              rel="noopener noreferrer"
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
    </section>
  );
}
