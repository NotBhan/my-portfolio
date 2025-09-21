import type { Metadata } from 'next';
import AdminDashboardLayout from './(main)/layout';

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Manage your portfolio.',
};

export default function AdminRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
