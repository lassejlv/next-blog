import NewPost from '@/components/newPost';
import PostButtonActions from '@/components/postButtonActions';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusIcon, SearchIcon, TrashIcon, PencilIcon } from 'lucide-react';

import { db } from '@/db';
import { Button } from '@/components/ui/button';

export const revalidate = 0;

export default async function page() {
  const posts = await db.query.postsTable.findMany();

  return (
    <div>
      <NewPost />

      <h1 className="text-lg font-bold my-3">Posts</h1>
      {posts.length === 0 && <p>No posts found</p>}

      <Table>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="text-right space-x-3">
                <PostButtonActions post={post} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
