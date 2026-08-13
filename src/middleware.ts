import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect from login if already logged in
  if (pathname === '/admin/login') {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/edit/profile', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
