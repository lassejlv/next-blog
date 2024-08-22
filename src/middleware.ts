import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { adminSessionsTable } from './db/schema';

export const middleware = async (req: NextRequest) => {
  const url = new URL(req.url);
  const redirectTo = new URL('/admin/login', url.origin);

  // make sure we dont redirect to login page infinitely lol
  if (url.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const hasCookie = cookies().get('session');

  if (!hasCookie) return NextResponse.redirect(redirectTo.href);

  const validSession = await db.query.adminSessionsTable.findFirst({
    where: eq(adminSessionsTable.token, hasCookie.value),
  });

  // if session is invalid or expired, redirect to login page
  const now = Date.now();
  if (!validSession || validSession.expiresAt < now) {
    return NextResponse.redirect(redirectTo.href);
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/admin/:path*',
};
