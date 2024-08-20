import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getSortedPosts } from '@/lib/post';
import Link from 'next/link';
import React from 'react';

export default async function page() {
  const posts = getSortedPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold">Blog Posts</h1>
      <p className="text-gray-400 text-lg">Here you find blog posts. Select one down below.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts
          .filter((post) => post.published)
          .map((post) => {
            return (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>{new Date(post.date).toDateString()}</CardContent>
                {post.image && <img src={post.image} alt={post.title} className="w-full h-48 p-3 object-cover" />}
                <CardFooter>
                  <Button>
                    <Link href={`/blog/${post.id}`}>Read Post</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
