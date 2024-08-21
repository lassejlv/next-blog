'use client';
import React from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { delPost } from '@/actions/post';
import { useRouter } from 'next/navigation';

export default function PostButtonActions({ postId }: { postId: number }) {
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
    </>
  );
}
