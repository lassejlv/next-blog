'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { delPost } from '@/actions/post';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import Spinner from './spinner';

export default function PostButtonActions({ postId }: { postId: number }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const deletePost = async () => {
    const promise = new Promise(async (res, rej) => {
      const confirm = window.confirm('are you absolutely sure?');
      if (!confirm) return rej('cancelled');

      const response = await delPost(postId);

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

  return (
    <>
      <Button variant="destructive" onClick={deletePost}>
        Delete
      </Button>
      <Button variant="outline">Edit</Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">New Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Post</DialogTitle>
            <DialogDescription>
              <form className="flex flex-col gap-4" onSubmit={() => alert('ddd')}>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input name="title" type="text" required />
                </div>

                <div>
                  <Label htmlFor="plot">Plot</Label>
                  <Input name="plot" type="text" required />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea name="content" required />
                </div>

                <div>
                  <Label htmlFor="image">Image (not required)</Label>
                  <Input name="image" type="text" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch name="isFeatured" />
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
