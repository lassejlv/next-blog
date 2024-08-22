import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/db';
import { adminSessionsTable } from '@/db/schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export default function login() {
  const submit = async (formData: FormData) => {
    'use server';

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

    if (!username || !password) return Response.json({ error: 'missing username or password' }, { status: 400 });
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD)
      return Response.json({ error: 'invalid username or password' }, { status: 401 });

    const session = await db.insert(adminSessionsTable).values({}).returning();
    cookies().set('session', session[0].token, { httpOnly: true, secure: true, path: '/', sameSite: 'strict', maxAge: 60 * 60 * 24 });
    console.log(session);
    return redirect('/admin');
  };

  return (
    <form action={submit} className="flex flex-col gap-5">
      <Label htmlFor="username">Username</Label>
      <Input type="text" name="username" id="username" />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" id="password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
