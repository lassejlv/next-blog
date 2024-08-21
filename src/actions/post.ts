'use server';

import { db } from '@/db';
import { postsTable } from '@/db/schema';
import { ActionResponse } from '@/lib/types';
import { eq } from 'drizzle-orm';
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

export const updatePost = async (id: number, data: any): Promise<ActionResponse> => {
  try {
    if (!id) throw new Error('id is required');
    if (isNaN(id)) throw new Error('id must be a number');

    const validatedData = schema.parse(data);

    const post = await db.query.postsTable.findFirst({ where: eq(postsTable.id, id) });
    if (!post) throw new Error('post not found');

    await db
      .update(postsTable)
      .set({
        title: validatedData.title,
        plot: validatedData.plot,
        content: validatedData.content,
        image: validatedData.image,
        isFeatured: validatedData.isFeatured === 'on' ? true : false,
      })
      .where(eq(postsTable.id, id));

    return { error: false, message: 'post updated' };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};

export const delPost = async (id: number): Promise<ActionResponse> => {
  try {
    if (!id) throw new Error('id is required');
    if (isNaN(id)) throw new Error('id must be a number');

    const post = await db.query.postsTable.findFirst({ where: eq(postsTable.id, id) });
    if (!post) throw new Error('post not found');

    await db.delete(postsTable).where(eq(postsTable.id, id));

    return { error: false, message: 'post deleted' };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};
