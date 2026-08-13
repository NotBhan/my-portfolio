'use client';
import { Home, User, Briefcase, Activity, Star, Calendar, Mail, Globe, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
    <div className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 glass-card rounded-none rounded-r-3xl border-l-0 z-50">
      <div className="mb-12">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl glow-purple">
          C
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "sidebar-icon",
              item.active && "active"
            )}
            title={item.label}
          >
            <item.icon size={24} />
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4 items-center">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="sidebar-icon"
        >
          {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="w-10 h-10 rounded-full bg-secondary border border-border" />
      </div>
    </div>
  );
}