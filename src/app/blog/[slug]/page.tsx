import { getPost } from '@/lib/post';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default async function page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return notFound();
  if (!post.published) return notFound();

  const markup = { __html: post.contentHtml };

  return (
    <>
      <Breadcrumb className="mb-3">
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/blog/${post.id}`}>{post.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="prose prose-p:text-gray-400" dangerouslySetInnerHTML={markup} />
    </>
  );
}
