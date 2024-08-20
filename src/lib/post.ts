import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type PostData = {
  id: string;
  title: string;
  slug: string;
  date: string;
  image?: string;
  published?: boolean;
};

type Response = {
  id: string;
  published: boolean;
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((filename) => {
    const id = filename.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by their date
  return allPostsData as PostData[];
}

export async function getPost(slug: string): Promise<Response | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id: slug,
    published: matterResult.data.published ?? false,
    contentHtml,
  };
}
