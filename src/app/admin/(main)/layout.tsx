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
  LineChart,
  LogOut,
  LayoutGrid,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/admin/edit/profile', label: 'Profile', icon: User },
  { href: '/admin/edit/home-cards', label: 'Home Cards', icon: LayoutGrid },
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
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast({ title: 'Logged Out', description: 'Session terminated.' });
      router.push('/admin/login');
    } catch (error) {
      toast({ title: 'Error', description: 'Logout failed.', variant: 'destructive' });
    }
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border bg-card/50 backdrop-blur-xl">
        <SidebarHeader className="p-3 group-data-[collapsible=icon]:p-2 transition-all">
          <div className="flex h-10 items-center justify-between group-data-[collapsible=icon]:justify-center mb-2">
            <div className="flex items-center gap-2.5 min-w-0 group-data-[collapsible=icon]:hidden">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black shadow-[0_0_15px_rgba(139,92,246,0.4)] shrink-0">
                C
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] truncate">
                Terminal
              </h2>
            </div>
            <SidebarTrigger className="h-8 w-8 rounded-xl hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors shrink-0" />
          </div>
          
          <div className="mb-4 px-2 [writing-mode:vertical-lr] rotate-180 text-[9px] font-black text-muted-foreground/20 uppercase pointer-events-none select-none font-code transform scale-y-[2.5] scale-x-[0.8] tracking-tighter group-data-[collapsible=icon]:hidden">
            ADMINISTRATION
          </div>

          <SidebarSeparator className="bg-border/50" />
          
          <SidebarMenu className="mt-2">
            <SidebarMenuItem>
              <Link href="/" passHref>
                <SidebarMenuButton as="a" tooltip="Back to Home" className="h-10 px-3.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group">
                  <Home className="h-4 w-4 shrink-0" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Portal Home</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        
        <SidebarContent className="px-2 group-data-[collapsible=icon]:px-1.5 pb-4">
          <SidebarMenu className="gap-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    as="a"
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className={cn(
                      "h-10 px-3.5 rounded-xl transition-all font-bold uppercase tracking-widest text-[10px]",
                      pathname === item.href 
                        ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:bg-primary/90" 
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            
            <SidebarSeparator className="my-3 bg-border/30" />
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleLogout}
                tooltip="Logout"
                className="h-10 px-3.5 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all font-bold uppercase tracking-widest text-[10px]"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Logout Session</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      
      <SidebarInset className="bg-background">
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 flex justify-center">
            <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger className="md:hidden h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground" />
                    <div className="flex items-center gap-2 opacity-60">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-code text-muted-foreground uppercase tracking-[0.3em] font-black">Configuration Mode // System Live</span>
                    </div>
                  </div>
                </header>
                {children}
            </div>
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

