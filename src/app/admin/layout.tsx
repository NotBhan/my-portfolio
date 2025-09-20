import { checkAuth, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, LogOut, Package, Star, Users, BarChart, User, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
    { href: "/admin/profile", label: "Profile", icon: User },
    { href: "/admin/projects", label: "Projects", icon: Package },
    { href: "/admin/skills", label: "Skills", icon: Star },
    { href: "/admin/testimonials", label: "Testimonials", icon: Users },
    { href: "/admin/stats", label: "Stats", icon: BarChart },
];


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span className="sr-only">My Portfolio</span>
          </Link>
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
           <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Public Site
            </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <span className="sr-only">My Portfolio</span>
              </Link>
              {navLinks.map(link => (
                 <Link key={link.label}  href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.label}
                </Link>
              ))}
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Public Site
            </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial" />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>{session?.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session?.name || session?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form action={signOut} className='w-full'>
                <DropdownMenuItem asChild>
                    <button type="submit" className="w-full text-left">Sign Out</button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
