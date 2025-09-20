'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'chandrabhan-portfolio-session';
// IMPORTANT: In a real application, use a secure, randomly generated password
// stored in environment variables (e.g., process.env.ADMIN_PASSWORD).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";

export async function getSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  return sessionCookie?.value === 'authenticated';
}

export async function signIn(password: string) {
  if (password === ADMIN_PASSWORD) {
    cookies().set(SESSION_COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return true;
  }
  return false;
}

export async function signOut() {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect('/admin/login');
}

export async function checkAuth() {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}
