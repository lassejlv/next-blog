import { db } from '@/db';
import { adminSessionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);

  const hasCookie = cookies().get('session');

  if (!hasCookie) return NextResponse.json({ error: 'Unauthorizedd' }, { status: 401 });

  const validSession = await db.query.adminSessionsTable.findFirst({
    where: eq(adminSessionsTable.token, hasCookie.value),
  });

  // if session is invalid or expired, redirect to login page
  const now = Date.now();

  const isExpired = validSession && validSession.expiresAt < now;

  if (isExpired) {
    await db.delete(adminSessionsTable).where(eq(adminSessionsTable.token, hasCookie.value));
    cookies().delete('session');
    return NextResponse.json({ error: 'Session Expired' }, { status: 401 });
  }

  if (!validSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ message: 'Authorized' });
};
