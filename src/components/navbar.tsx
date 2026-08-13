'use client';
import { Home, User, Briefcase, Activity, Star, Calendar, Mail, Globe, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: User, label: 'Profile' },
  { icon: Briefcase, label: 'Projects' },
  { icon: Activity, label: 'Experience' },
  { icon: Star, label: 'Skills' },
  { icon: Calendar, label: 'Activities' },
  { icon: Mail, label: 'Contact' },
  { icon: Globe, label: 'Social' },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="fixed left-6 top-6 bottom-6 w-24 flex flex-col items-center py-10 glass-card bg-[#151921]/90 z-50">
      <div className="mb-14">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl glow-purple shadow-primary/40">
          C
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-6">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "sidebar-icon",
              item.active && "active"
            )}
            title={item.label}
          >
            <item.icon size={28} strokeWidth={1.5} />
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-6 items-center">
        <div className="flex flex-col bg-secondary/20 rounded-2xl p-1 gap-1">
          <button 
            onClick={() => setTheme('light')}
            className={cn("p-2 rounded-xl transition-colors", mounted && theme === 'light' ? "bg-white/10 text-primary" : "text-muted-foreground")}
          >
            <Sun size={20} />
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={cn("p-2 rounded-xl transition-colors", mounted && theme === 'dark' ? "bg-white/10 text-primary" : "text-muted-foreground")}
          >
            <Moon size={20} />
          </button>
        </div>
        <div className="w-12 h-12 rounded-full bg-secondary/50 border border-white/5" />
      </div>
    </div>
  );
}