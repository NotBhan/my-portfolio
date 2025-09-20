import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import type { SessionData } from '@/lib/auth';
import { sessionOptions } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getIronSession<SessionData>(request.cookies, sessionOptions);

  // Apply this middleware to all routes under /admin, except /admin/login
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isLoginRoute = pathname === '/admin/login';
  const isLoggedIn = session.isLoggedIn === true;

  if (isAdminRoute && !isLoggedIn) {
    // If not logged in and trying to access a protected admin route, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && isLoggedIn) {
    // If logged in and trying to access the login page, redirect to the admin dashboard
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
