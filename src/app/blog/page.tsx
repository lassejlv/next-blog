import Posts from '@/components/posts';
import { db } from '@/db';
import React from 'react';

export const revalidate = 0;

export default async function page() {
  const posts = await db.query.postsTable.findMany();

  return (
    <div>
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <p className="text-gray-400 text-lg">Here you find blog posts. Select one down below.</p>

      <Posts posts={posts} />
    </div>
  );
}
