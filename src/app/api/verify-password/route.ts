
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set.');
      // In a real app, you'd want more robust error handling and logging.
      // For this prototype, we'll send a generic error to the client.
      return NextResponse.json({ error: 'Server configuration error. Please contact the administrator.' }, { status: 500 });
    }

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Incorrect password.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Password verification failed:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
