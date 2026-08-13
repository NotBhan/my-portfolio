'use client';
import { Home, User, Briefcase, Star, Calendar, Mail, Globe, Download, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: User, label: 'About', href: '#about' },
  { icon: Briefcase, label: 'Projects', href: '#projects' },
  { icon: Star, label: 'Skills', href: '#skills' },
  { icon: Globe, label: 'Creative', href: '#creative' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  return (
    <div className="hidden lg:flex w-[72px] flex-col items-center py-8 border-r border-white/[0.03] bg-[#0c0f16] shrink-0 z-50">
      <div className="mb-12">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl glow-purple shadow-primary/20">
          C
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-6">
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
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              )}
              <item.icon size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-6 items-center">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}