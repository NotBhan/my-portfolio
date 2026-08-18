
import type { Metadata } from 'next';
import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Spotlight from '@/components/spotlight';
import { Toaster } from '@/components/ui/toaster';
import { getProfile, getSettings } from '@/lib/data';
import LayoutShell from '@/components/layout-shell';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://chandrabhan.dev'),
  title: 'Chandrabhan - Portfolio',
  description: 'A personal portfolio website with a celestial theme.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', rel: 'icon' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png', rel: 'icon' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png', rel: 'icon' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png', rel: 'apple-touch-icon' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased min-w-[320px]',
          fontBody.variable,
          fontCode.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Spotlight />
          <LayoutShell profile={profile} settings={settings}>
            {children}
          </LayoutShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
