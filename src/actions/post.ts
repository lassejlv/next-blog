'use server';

import { db } from '@/db';
import { postsTable } from '@/db/schema';
import { ActionResponse } from '@/lib/types';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(3).max(155),
  plot: z.string().min(3).max(100),
  content: z.string().min(20).max(30000),
  image: z.string().optional(),
  isFeatured: z.string().optional(),
});

export const createPost = async (data: any): Promise<ActionResponse> => {
  try {
    const validatedData = schema.parse(data);

    const newPost = await db
      .insert(postsTable)
      .values({
        title: validatedData.title,
        plot: validatedData.plot,
        content: validatedData.content,
        date: `${new Date().toISOString()}`,
        image: validatedData.image,
        isFeatured: validatedData.isFeatured === 'on' ? true : false,
      })
      .returning();

    return { error: false, message: 'post created', data: newPost[0] };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};
