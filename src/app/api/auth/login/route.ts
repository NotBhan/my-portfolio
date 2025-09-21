import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/auth';
import users from '@/data/users.json';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Find a user with the given password, but don't check email for testing
    const user = users.find(
      (u) => u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Get session and set user data
    const session = await getIronSession<SessionData>(request.cookies, sessionOptions);
    session.isLoggedIn = true;
    session.email = email; // Use the provided email for the session
    await session.save();
    
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
