'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-96px)] flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8"
      >
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-sm text-cyan-300 font-medium">Hi, my name is</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight text-white">
            Bander Radein
          </h1>

          <p className="mt-4 text-gray-300 text-lg">
            I build high-tech, modern web applications and integrate cutting-edge AI and blockchain solutions.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
            <a
              href="https://cloud.radein.com/index.php/apps/appointments/pub/EGzq4vzE7lBVQwVy/form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-md bg-cyan-400 text-gray-900 font-semibold hover:bg-cyan-300 transition"
            >
              Hire me!
            </a>

            <a
              href="/portfolio"
              className="inline-block px-6 py-3 rounded-md border border-gray-700 text-gray-200 hover:border-gray-600 hover:text-white transition text-center"
            >
              View portfolio
            </a>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img
            src="/profile.png"
            alt="Bander Radein"
            className="w-44 h-44 rounded-full border-4 border-cyan-400 shadow-2xl mx-auto md:mx-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
