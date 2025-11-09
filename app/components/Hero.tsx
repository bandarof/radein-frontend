'use client';

import { motion } from 'framer-motion';
import TechLogos from './TechLogos';

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-96px)] flex items-center overflow-hidden">
      {/* decorative orbs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-10 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10"
      >
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-sm text-cyan-300 font-medium tracking-widest uppercase">Hi, my name is</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-cyan-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(34,211,238,0.35)]">
            Bander Radein
          </h1>

          <p className="mt-5 text-gray-300 text-lg md:text-xl">
            I build high-tech, modern web applications and integrate cutting-edge AI and blockchain solutions.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
            <a
              href="https://cloud.radein.com/index.php/apps/appointments/pub/EGzq4vzE7lBVQwVy/form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-md bg-cyan-400 text-gray-900 font-semibold hover:bg-cyan-300 transition shadow-[0_0_24px_rgba(34,211,238,0.35)] neon-border"
            >
              Hire me!
            </a>

            <a
              href="/portfolio"
              className="inline-flex items-center justify-center px-7 py-3 rounded-md border border-gray-700 text-gray-200 hover:border-cyan-400/60 hover:text-white transition backdrop-blur-sm"
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
              className="w-44 h-44 rounded-full border-4 border-cyan-400/70 shadow-2xl"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-400/10 to-indigo-400/10" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
