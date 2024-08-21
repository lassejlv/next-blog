import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const generateToken = () => {
  return crypto.randomUUID();
};

const generateExpiry = () => {
  const now = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;
  return now + oneDay;
};

export const postsTable = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  plot: text('plot').notNull(),
  content: text('content').notNull(),
  date: text('date').notNull(),
  image: text('image'),
  published: integer('published', { mode: 'boolean' }).default(true),
  isFeatured: integer('isFeatured', { mode: 'boolean' }).default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

export const adminSessionsTable = sqliteTable('admin_sessions', {
  id: integer('id').primaryKey(),
  token: text('token').notNull().$defaultFn(generateToken),
  expiresAt: integer('expires_at').notNull().$defaultFn(generateExpiry),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});

// export post types
export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

// export admin session types
export type InsertAdminSession = typeof adminSessionsTable.$inferInsert;
export type SelectAdminSession = typeof adminSessionsTable.$inferSelect;
