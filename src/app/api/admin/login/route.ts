import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sessionOptions, SessionData } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    if (password === adminPassword) {
      const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
      session.isLoggedIn = true;
      await session.save();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Incorrect password.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
