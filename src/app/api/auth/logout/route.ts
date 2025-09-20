import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(request.cookies, sessionOptions);
    session.destroy();
    
    const response = NextResponse.redirect(new URL('/admin/login', request.url), { status: 302 });
    
    // Clear the cookie on the client
    response.cookies.set(sessionOptions.cookieName, '', { maxAge: -1 });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
