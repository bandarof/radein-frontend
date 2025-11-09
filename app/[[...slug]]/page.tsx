// app/[[...slug]]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Page() {
  const params = useParams();
  const [pageJson, setPageJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [BuilderModule, setBuilderModule] = useState<any>(null);

  const slug = params?.slug ? `/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}` : '/';

  useEffect(() => {
    let mounted = true;

    async function loadBuilder() {
      if (typeof window === 'undefined') {
        // Prevent any builder/client code from running during server-side build
        setLoading(false);
        return;
      }

      try {
        const mod = await import('@builder.io/react');
        if (!mounted) return;

        setBuilderModule(mod);

        try {
          // Use public env var if provided, otherwise fall back to the existing key
          const apiKey = (process?.env?.NEXT_PUBLIC_BUILDER_API_KEY as string) || '5a0f3ce2c5134179a3d3a7972a6778ef';
          if (mod?.builder && typeof mod.builder.init === 'function') {
            mod.builder.init(apiKey);
          }
        } catch (initErr) {
          // Don't let init errors break the build
          // Log for diagnostics in the browser console
          // eslint-disable-next-line no-console
          console.warn('builder.init failed or skipped:', initErr);
        }

        try {
          const content = await mod.builder.get('page', { url: slug });
          if (!mounted) return;
          setPageJson(content);
        } catch (fetchErr) {
          console.error('❌ Builder.io fetch error:', fetchErr);
        }
      } catch (err) {
        console.error('Error loading @builder.io/react dynamically:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadBuilder();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!pageJson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-cyan-400 text-xl">No Builder.io content found</div>
          <p className="text-gray-400 mt-2">URL: {slug}</p>
          <p className="text-gray-400 mt-4">
            {slug === '/' ? 'Create the homepage in Builder.io with URL "/"' : `Create this page in Builder.io with URL "${slug}"`}
          </p>
        </div>
      </div>
    );
  }

  const BuilderComponent = BuilderModule?.BuilderComponent ?? null;

  return (
    <motion.div
      key={pageJson?.id || 'builder-page'}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.4, ease: 'easeOut' } }}
      onAnimationStart={() => console.log('motion: animation started')}
      onAnimationComplete={() => console.log('motion: animation complete')}
      className="motion-wrapper"
    >
      {slug === '/' ? (
        <div className="w-full" style={{ minHeight: 'calc(100vh - 96px)' }}>
          <div className="container mx-auto px-6 flex items-center justify-center h-full" style={{ transform: 'translateY(8vh)' }}>
            {BuilderComponent ? <BuilderComponent model="page" content={pageJson} /> : null}
          </div>
        </div>
      ) : (
        BuilderComponent ? <BuilderComponent model="page" content={pageJson} /> : null
      )}
    </motion.div>
  );
}
