'use client';
import { Home, Briefcase, History, Star, Mail, Moon, Sun } from 'lucide-react';
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

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Briefcase, label: 'Projects', href: '/projects' },
  { icon: History, label: 'Experience', href: '/experience' },
  { icon: Star, label: 'Skills', href: '/skills' },
  { icon: Mail, label: 'Contact', href: '/contact' },
];

export default function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex flex-col items-center h-full pt-3 pb-4">
      {/* Vertical Title Label - Architectural Branding */}
      <div className="mb-14 [writing-mode:vertical-lr] rotate-180 text-[11px] font-black text-muted-foreground/30 uppercase pointer-events-none select-none font-code transform scale-y-[2.5] scale-x-[0.8] origin-center tracking-tighter leading-none shrink-0">
        PORTFOLIO
      </div>

      {/* Branding / Logo */}
      <div className="h-[40px] flex items-center justify-center mb-10 shrink-0">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-black text-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          C
        </div>
      </div>
      
      {/* Primary Navigation Items */}
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

          {/* Theme Toggle integrated into the group - Hydration Safe */}
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
  );
}
