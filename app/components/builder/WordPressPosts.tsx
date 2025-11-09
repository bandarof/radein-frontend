// app/components/builder/WordPressPosts.tsx
'use client';

import { builder } from '@builder.io/react';
import { useEffect, useState } from 'react';

export function WordPressPosts({ category = 'uncategorized', postCount = 5 }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch from your WordPress backend
    fetch(`https://radein.com/wp-json/wp/v2/posts?categories=${category}&per_page=${postCount}`)
      .then(res => res.json())
      .then(setPosts);
  }, [category, postCount]);

  return (
    <div className="wordpress-posts">
      {posts.map((post: any) => (
        <article key={post.id}>
          <h3>{post.title.rendered}</h3>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </article>
      ))}
    </div>
  );
}

// FIX: Use Builder.registerComponent (static method)
/*
Builder.registerComponent(WordPressPosts, {
  name: 'WordPressPosts',
  inputs: [
    { name: 'category', type: 'string', defaultValue: 'uncategorized' },
    { name: 'postCount', type: 'number', defaultValue: 5 }
  ]
});
*/
