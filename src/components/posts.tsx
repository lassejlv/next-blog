'use client';
import { SelectPost } from '@/db/schema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function Posts({ posts }: { posts: SelectPost[] }) {
  const [filteredPosts, setFilteredPosts] = React.useState<SelectPost[]>(posts);

  return (
    <>
      <div className="my-3">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search posts"
          onChange={(e) => {
            const { value } = e.target;
            setFilteredPosts(
              posts.filter(
                (post) => post.title.toLowerCase().includes(value.toLowerCase()) || post.plot.toLowerCase().includes(value.toLowerCase())
              )
            );
          }}
        />

        {/* filter by views */}
        <Label htmlFor="views">Filter by views</Label>
        <select
          id="views"
          className="w-full p-2 border rounded-md bg-none outline-none bg-transparent"
          onChange={(e) => {
            const { value } = e.target;
            if (value === 'all') {
              setFilteredPosts(posts);
            } else {
              setFilteredPosts(posts.filter((post) => post.views && post.views > Number(value)));
            }
          }}
        >
          <option value="all">All</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="400">400</option>
          <option value="2000">2,000</option>
          <option value="5000">5,000</option>
          <option value="10000">10,000</option>
        </select>

        <p className="text-sm text-gray-500 mt-4">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPosts
          .filter((post) => post.published)
          .map((post) => (
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
          ))}
      </div>
    </>
  );
}
