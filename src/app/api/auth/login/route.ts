import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/auth';
import users from '@/data/users.json';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Find user in the mock database
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Get session and set user data
    const session = await getIronSession<SessionData>(request.cookies, sessionOptions);
    session.isLoggedIn = true;
    session.email = user.email;
    await session.save();
    
    // The response needs to be manipulated to set the cookie.
    const res = NextResponse.json({ ok: true });
    res.cookies.set(sessionOptions.cookieName, session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });


    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
