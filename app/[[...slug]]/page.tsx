// app/[[...slug]]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Page() {
  const params = useParams();
  const slug = params?.slug ? `/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}` : '/';

  const isHome = slug === '/';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="motion-wrapper"
    >
      {isHome ? (
        <section className="w-full" style={{ minHeight: 'calc(100vh - 96px)' }}>
          <div className="container mx-auto px-6 flex items-center justify-center h-full" style={{ transform: 'translateY(8vh)' }}>
            <div className="text-center max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-cyan-400 mb-4">Hi! I'm Bander Radein</h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                I build high-tech, modern web applications and integrate cutting-edge AI and blockchain solutions.
              </p>
              <a
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-md"
                href="https://cloud.radein.com/index.php/apps/appointments/pub/EGzq4vzE7lBVQwVy/form"
                target="_blank"
                rel="noreferrer"
              >
                Hire me!
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-cyan-400">Page not found in local content</h2>
            <p className="text-gray-400 mt-2">Requested URL: {slug}</p>
            <p className="text-gray-400 mt-4">This project no longer uses Builder.io. Please add content for this route locally.</p>
          </div>
        </section>
      )}
    </motion.div>
  );
}
