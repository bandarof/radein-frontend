// app/[[...slug]]/page.tsx
'use client';
import { BuilderComponent, builder } from '@builder.io/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

builder.init('5a0f3ce2c5134179a3d3a7972a6778ef');

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Page() {
  const params = useParams();
  const [pageJson, setPageJson] = useState(null);
  const [loading, setLoading] = useState(true);

  const slug = params.slug ? `/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}` : '/';

  useEffect(() => {
    console.log('🔄 Fetching Builder.io content for:', slug);

    builder.get('page', {
      url: slug
    }).then(content => {
      console.log('✅ Builder.io response:', content ? 'CONTENT FOUND' : 'NO CONTENT');
      setPageJson(content);
      setLoading(false);
    }).catch(error => {
      console.error('❌ Builder.io error:', error);
      setLoading(false);
    });
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

  return (
    <motion.div
      key={pageJson?.id || 'builder-page'}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.4, ease: 'easeOut' } }}
      onAnimationStart={() => console.log('motion: animation started')}
      onAnimationComplete={() => console.log('motion: animation complete')}
      className="motion-wrapper"
    >
      <BuilderComponent model="page" content={pageJson} />
    </motion.div>
  );
}
