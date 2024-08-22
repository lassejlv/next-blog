import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { postsTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import Link from 'next/link';

export const revalidate = 0;

export default async function Home() {
  const posts = await db.query.postsTable.findMany({
    where: and(eq(postsTable.published, true), eq(postsTable.isFeatured, true)),
  });

  return (
    <main className="flex-1">
      <section className="bg-primary py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">Discover the best blog</h1>
          <p className="text-lg md:text-xl text-primary-foreground mb-8">
            This is a blog where you can find the best articles about web development, programming, and more.
          </p>
          <Button variant="secondary">Explore the Blog</Button>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>
    </main>
  );
}
