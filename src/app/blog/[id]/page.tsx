import { getPost, renderMarkdown } from '@/lib/post';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { postsTable } from '@/db/schema';

export default async function page({ params }: { params: { id: string } }) {
  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.id, parseInt(params.id)),
  });

  console.log(params);

  if (!post) return notFound();
  if (!post.published) return notFound();

  const markup = { __html: await renderMarkdown(post.content) };

  return (
    <>
      <Breadcrumb className="mb-3">
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/blog/${post.id}`}>{post.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="prose prose-p:text-gray-400" dangerouslySetInnerHTML={markup} />
    </>
  );
}
