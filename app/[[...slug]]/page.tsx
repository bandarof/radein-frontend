'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

export default function Page() {
  const params = useParams();
  const slug = params?.slug ? `/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}` : '/';

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
      className="motion-wrapper"
    >
      {slug === '/' ? (
        <Hero />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-2xl font-semibold">Page</h1>
            <p className="text-gray-400 mt-2">This site no longer uses Builder.io.</p>
            <p className="text-gray-400 mt-4">Requested path: <span className="font-mono">{slug}</span></p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
