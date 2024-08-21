import NewPost from '@/components/newPost';
import PostButtonActions from '@/components/postButtonActions';
import { db } from '@/db';
import React from 'react';

export const revalidate = 0;

export default async function page() {
  const posts = await db.query.postsTable.findMany();

  return (
    <div>
      <NewPost />

      <h1 className="text-lg font-bold">Posts</h1>
      {posts.length === 0 && <p>No posts found</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <PostButtonActions postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
