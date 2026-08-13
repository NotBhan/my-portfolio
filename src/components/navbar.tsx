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
    <div className="flex flex-col items-center h-full">
      <div className="mb-8">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-primary/20">
          C
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative p-2 text-muted-foreground transition-all duration-200 hover:text-primary group",
                isActive && "text-white"
              )}
              title={item.label}
            >
              {isActive && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-l-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              )}
              <item.icon size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4 items-center">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          {mounted && theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
}