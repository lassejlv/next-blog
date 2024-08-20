import { NextRequest, NextResponse } from 'next/server';

const adminPassword = process.env.ADMIN_PASSWORD;
const adminUsername = process.env.ADMIN_USERNAME;

export const middleware = async (req: NextRequest) => {
  // add basic auth
  if (req.headers.get('authorization') !== `Basic ${btoa(`${adminUsername}:${adminPassword}`)}`) {
    return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/admin/:path*',
};
