'use client';
import { Home, Briefcase, History, Star, Mail, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Briefcase, label: 'Projects', href: '#projects' },
  { icon: History, label: 'Experience', href: '#experience' },
  { icon: Star, label: 'Skills', href: '#skills' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col items-center h-full pt-3 pb-4">
      {/* Vertical Title Label - Tallboy aesthetic */}
      <div className="mb-14 [writing-mode:vertical-lr] rotate-180 text-[11px] font-black text-muted-foreground/30 uppercase pointer-events-none select-none font-code transform scale-y-[2.5] origin-center tracking-tighter">
        PORTFOLIO
      </div>

      {/* Branding / Logo - Representing Profile Identity */}
      <div className="h-[40px] flex items-center justify-center mb-10">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          C
        </div>
      </div>
      
      {/* Primary Navigation Items - Aligned from top */}
      <nav className="flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative p-2.5 text-muted-foreground transition-all duration-300 hover:text-primary group flex items-center justify-center",
                isActive && "text-primary"
              )}
              title={item.label}
            >
              {isActive && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-l-full shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
              )}
              <item.icon size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer: Theme Toggle - Pushed to bottom */}
      <div className="mt-auto">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 flex items-center justify-center rounded-xl hover:bg-white/5"
          title="Toggle Theme"
        >
          {mounted && theme === 'dark' ? (
            <Sun size={20} strokeWidth={1.5} />
          ) : (
            <Moon size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
}
