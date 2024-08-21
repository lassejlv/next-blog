'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { delPost, updatePost } from '@/actions/post';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import Spinner from './spinner';
import { SelectPost } from '@/db/schema';

export default function PostButtonActions({ post }: { post: SelectPost }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const deletePost = async () => {
    const promise = new Promise(async (res, rej) => {
      const confirm = window.confirm('are you absolutely sure?');
      if (!confirm) return rej('cancelled');

      const response = await delPost(post.id);

      router.refresh();

      if (response.error) return rej(response.message);

      return res(response.message);
    });

    toast.promise(promise, {
      loading: 'deleting post...',
      success: 'post deleted',
      error: (err) => err,
    });
  };

  const upDatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await updatePost(post.id, data);

    setLoading(false);
    router.refresh();

    if (response.error) return toast.error(response.message);

    toast.success(response.message);
  };

  return (
    <>
      <Button variant="destructive" onClick={deletePost}>
        Delete
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Post</DialogTitle>
            <DialogDescription>
              <form className="flex flex-col gap-4" onSubmit={upDatePost}>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input name="title" type="text" defaultValue={post.title} required />
                </div>

                <div>
                  <Label htmlFor="plot">Plot</Label>
                  <Input name="plot" type="text" defaultValue={post.plot} required />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea name="content" defaultValue={post.content} required />
                </div>

                <div>
                  <Label htmlFor="image">Image (not required)</Label>
                  <Input name="image" defaultValue={post.image!} type="text" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch name="isFeatured" defaultChecked={post.isFeatured ?? false} />
                  <Label htmlFor="isFeatured">Is Featured?</Label>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner size={18} /> : 'Update Post'}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
