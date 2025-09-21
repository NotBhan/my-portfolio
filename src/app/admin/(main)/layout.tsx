'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import {
  Briefcase,
  Brush,
  Home,
  MessageSquare,
  Star,
  User,
  History,
  Share2,
  Flame,
  LineChart
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/edit/profile', label: 'Profile', icon: User },
  { href: '/admin/edit/experiences', label: 'Experiences', icon: History },
  { href: '/admin/edit/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/edit/skills', label: 'Tech Skills', icon: Star },
  {
    href: '/admin/edit/creative-skills',
    label: 'Creative Skills',
    icon: Brush,
  },
  {
    href: '/admin/edit/testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
  },
  {
    href: '/admin/edit/social-links',
    label: 'Social Links',
    icon: Share2,
  },
  {
    href: '/admin/edit/activities',
    label: 'Activities',
    icon: Flame,
  },
  {
    href: '/admin/edit/stats',
    label: 'Stats',
    icon: LineChart,
  }
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-10 items-center gap-2 p-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold group-data-[collapsible=icon]:hidden">
              Portfolio
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    as="a"
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="justify-start"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/" passHref>
                <SidebarMenuButton as="a" tooltip="Back to Home" className="justify-start">
                  <Home className="h-5 w-5" />
                  <span>Back to Home</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarTrigger className="w-full justify-start">
                    <User className="h-5 w-5" />
                    <span>Collapse</span>
                </SidebarTrigger>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="flex justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl">
                {children}
            </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
