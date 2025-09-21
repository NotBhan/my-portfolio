import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Manage your portfolio.',
};

export default function AdminRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
