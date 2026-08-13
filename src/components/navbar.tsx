'use client';
import { Home, User, Briefcase, Activity, Star, Calendar, Mail, Globe, Download, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: User, label: 'About' },
  { icon: Briefcase, label: 'Projects' },
  { icon: Star, label: 'Skills' },
  { icon: Calendar, label: 'Achievements' },
  { icon: Globe, label: 'Creative' },
  { icon: Mail, label: 'Contact' },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="hidden lg:flex w-[88px] flex-col items-center h-full sidebar-panel z-50">
      <div className="mb-12">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl glow-purple shadow-primary/20">
          C
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-8 mt-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "relative p-2 text-muted-foreground transition-all duration-200 hover:text-primary",
              item.active && "text-white"
            )}
            title={item.label}
          >
            {item.active && <div className="active-indicator" />}
            <item.icon size={24} strokeWidth={1.5} />
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-8 items-center pb-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}