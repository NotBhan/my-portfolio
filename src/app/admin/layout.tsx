import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login',
    description: 'Login to manage your portfolio.',
};

export default function AdminRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
