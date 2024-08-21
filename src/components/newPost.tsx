'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import Spinner from './spinner';
import { createPost } from '@/actions/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await createPost(data);

    setLoading(false);
    router.refresh();

    if (response.error) return toast.error(response.message);

    toast.success(response.message);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">New Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Post</DialogTitle>
            <DialogDescription>
              <form className="flex flex-col gap-4" onSubmit={submit}>
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
                  {loading ? <Spinner size={18} /> : 'Create Post'}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
