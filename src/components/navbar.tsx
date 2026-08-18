'use client';
import { Home, Briefcase, History, Star, Mail, Moon, Sun, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type NavbarProps = {
  showTestimonials?: boolean;
};

export default function Navbar({ showTestimonials = false }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Projects', href: '/projects' },
    { icon: History, label: 'Experience', href: '/experience' },
    { icon: Star, label: 'Skills', href: '/skills' },
    ...(showTestimonials ? [{ icon: MessageSquare, label: 'Reviews', href: '/testimonials' }] : []),
    { icon: Mail, label: 'Contact', href: '/contact' },
  ];

  const totalSlots = navItems.length + 1; // +1 for theme button

  useEffect(() => {
    setMounted(true);
    const index = navItems.findIndex(item => item.href === pathname);
    if (index !== -1) setActiveIndex(index);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Mobile Magic Navigation */}
      <div className="flex md:hidden justify-center w-full h-full items-center px-4 pb-4">
        <div className="relative w-full max-w-[420px] h-[64px] bg-card/60 backdrop-blur-xl flex justify-center items-center rounded-2xl border border-border/50 shadow-2xl px-2">
          <ul className="flex w-full relative">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label} className="relative list-none flex-1 h-[64px] z-10">
                  <Link
                    href={item.href}
                    className="relative flex flex-col justify-center items-center w-full h-full text-center"
                  >
                    <span className={cn(
                      "relative block transition-all duration-300",
                      isActive ? "text-primary scale-110" : "text-muted-foreground"
                    )}>
                      <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                    </span>
                    <span className={cn(
                      "text-primary text-[7px] font-black uppercase tracking-widest transition-all duration-300 opacity-0 transform translate-y-1",
                      isActive ? "opacity-100 translate-y-0.5" : ""
                    )}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
            
            <li className="relative list-none flex-1 h-[64px] z-10">
              <button
                onClick={toggleTheme}
                className="relative flex flex-col justify-center items-center w-full h-full text-center"
              >
                <span className="relative block text-muted-foreground transition-all duration-500">
                  {mounted ? (
                    resolvedTheme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />
                  ) : (
                    <div className="w-[20px] h-[20px]" />
                  )}
                </span>
                <span className="text-muted-foreground text-[7px] font-black uppercase tracking-widest translate-y-0.5 opacity-60">
                  Theme
                </span>
              </button>
            </li>

            {/* Indicator */}
            <div 
              className="absolute -top-[1px] w-[40px] h-[3px] transition-all duration-500 ease-in-out pointer-events-none"
              style={{
                left: `calc((100% / ${totalSlots}) * ${activeIndex} + (100% / (${totalSlots} * 2)) - 20px)`,
              }}
            >
              <div className="w-full h-full bg-primary rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse blur-[1px]" />
            </div>
          </ul>
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:flex flex-col items-center h-full pt-3 pb-4">
        <div className="mb-14 [writing-mode:vertical-lr] rotate-180 text-[11px] font-black text-muted-foreground/30 uppercase pointer-events-none select-none font-code transform scale-y-[1] scale-x-[0.8] origin-center tracking-tighter leading-none shrink-0">
          PORTFOLIO
        </div>

        <div className="h-[40px] flex items-center justify-center mb-10 shrink-0">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black text-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            C
          </div>
        </div>
        
        <TooltipProvider delayDuration={0}>
          <nav className="flex flex-col gap-6 items-center flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative p-2.5 text-muted-foreground transition-all duration-300 hover:text-primary group flex items-center justify-center",
                        isActive && "text-primary"
                      )}
                    >
                      {isActive && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-l-full shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
                      )}
                      <item.icon size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={15} className="bg-card border-border text-foreground font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}

            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleTheme}
                  className="relative p-2.5 text-muted-foreground hover:text-primary transition-all duration-300 group flex items-center justify-center h-[42px] w-[42px]"
                >
                  {mounted ? (
                    resolvedTheme === 'dark' ? (
                      <Sun size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                    ) : (
                      <Moon size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                    )
                  ) : (
                    <div className="w-[22px] h-[22px]" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={15} className="bg-card border-border text-foreground font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl">
                {resolvedTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </div>
    </>
  );
}
