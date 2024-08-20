import NewPost from '@/components/newPost';
import { Button } from '@/components/ui/button';
import { db } from '@/db';
import React from 'react';

export default async function page() {
  const posts = await db.query.postsTable.findMany();

  console.log(posts);

  return (
    <div>
      <NewPost />

      <h1 className="text-lg font-bold">Posts</h1>
      {posts.length === 0 && <p>No posts found</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <Button variant="destructive">Delete</Button>
            <Button variant="outline">Edit</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
