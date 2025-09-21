import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { LayoutDashboard, User, FolderKanban, Star, MessageSquare, BarChart3, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Manage your portfolio content.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/1/200/200" alt="Admin" />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Admin</span>
              <span className="text-xs text-muted-foreground">Portfolio CMS</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin" isActive>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <User />
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <FolderKanban />
                Projects
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <Star />
                Skills
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <MessageSquare />
                Testimonials
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <BarChart3 />
                Stats
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenuButton href="/">
              <Settings />
              Go to Site
            </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
