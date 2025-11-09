'use client';

import { useEffect, useState } from 'react';

export function WordPressPosts({ category = 'uncategorized', postCount = 5 }: { category?: string; postCount?: number }) {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch from your WordPress backend
    fetch(`https://radein.com/wp-json/wp/v2/posts?categories=${category}&per_page=${postCount}`)
      .then(res => res.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, [category, postCount]);

  return (
    <div className="wordpress-posts">
      {posts.map((post: any) => (
        <article key={post.id} className="mb-6">
          <h3 className="text-lg font-semibold">{post.title?.rendered || post.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
        </article>
      ))}
    </div>
  );
}
