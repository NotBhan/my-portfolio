'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = (filename: string) => path.join(process.cwd(), 'src', 'data', filename);

const SESSION_COOKIE_NAME = 'chandrabhan-portfolio-session';

type User = {
  email: string;
  password?: string; // In a real app, this should be a hashed password
};

async function getAllowedUsers(): Promise<User[]> {
    try {
        const filePath = dataFilePath('users.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(jsonData) as User[];
        
        // Augment with environment variables if they exist
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (adminEmail && !users.some(u => u.email === adminEmail)) {
            users.push({ email: adminEmail, password: adminPassword || 'password123' });
        }
        
        return users;
    } catch (error) {
        // If file doesn't exist or is invalid, fallback to env vars or default
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
        return [{ email: adminEmail, password: adminPassword }];
    }
}


export async function getSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;
  // In a real app, you'd verify a session token here.
  // For this example, we'll just check if the cookie value contains a valid email.
  try {
    const user = JSON.parse(sessionCookie.value);
    if (user && user.email) {
      return user;
    }
  } catch {
    return null;
  }
  return null;
}

export async function signIn(email: string, password?: string) {
  const allowedUsers = await getAllowedUsers();
  const user = allowedUsers.find(u => u.email === email);

  // In a real app, you would use a library like bcrypt to compare hashed passwords.
  // For this project, we are comparing plain text passwords for simplicity.
  if (user && user.password && password === user.password) {
    const sessionData = JSON.stringify({ email: user.email, name: user.email });
    cookies().set(SESSION_COOKIE_NAME, sessionData, {
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
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}
