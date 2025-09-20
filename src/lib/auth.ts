import type { IronSessionOptions } from 'iron-session';

export interface SessionData {
  isLoggedIn: boolean;
  email: string;
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string || 'complex_password_at_least_32_characters_long',
  cookieName: 'portfolio-admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
