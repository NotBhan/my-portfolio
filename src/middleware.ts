import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import type { SessionData } from '@/lib/auth';
import { sessionOptions } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getIronSession<SessionData>(request.cookies, sessionOptions);

  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isLoginRoute = pathname === '/admin/login';
  const isLoggedIn = session.isLoggedIn === true;

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};
