import { checkAuth, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, LogOut, Package, Star, Users, BarChart } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4" />
            <span>Public Site</span>
          </Link>
          <Link
            href="/admin"
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Package className="h-4 w-4" />
            <span>Projects</span>
          </Link>
          <Link
            href="/admin/skills"
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Star className="h-4 w-4" />
            <span>Skills</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="h-4 w-4" />
            <span>Testimonials</span>
          </Link>
           <Link
            href="/admin/stats"
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <BarChart className="h-4 w-4" />
            <span>Stats</span>
          </Link>
        </nav>
        <div className="mt-auto p-4">
          <form action={signOut}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>
      <main className="flex flex-1 flex-col p-4 sm:p-6">{children}</main>
    </div>
  );
}
