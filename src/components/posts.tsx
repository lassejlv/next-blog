'use client';
import { SelectPost } from '@/db/schema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';

export default function Posts({ posts }: { posts: SelectPost[] }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts
          .filter((post) => post.published)
          .map((post) => {
            return (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.plot}</p>

                  <p className="text-sm text-gray-500 mt-4">Published on {new Date(post.date).toDateString()}</p>
                </CardContent>
                {post.image && <img loading="lazy" src={post.image} alt={post.title} className="w-full h-48 p-3 object-cover" />}
                <CardFooter className="flex justify-between items-center">
                  <Button>
                    <Link href={`/blog/${post.id}`}>Read Post</Link>
                  </Button>

                  <p className="text-sm text-gray-500 mt-4">Views: {post.views?.toLocaleString()}</p>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </>
  );
}
