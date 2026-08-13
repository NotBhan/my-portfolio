'use client';

import { usePathname } from 'next/navigation';
import { Github, Linkedin } from 'lucide-react';
import SidebarRail from '@/components/navbar';
import type { Profile } from '@/lib/definitions';
import { ReactNode } from 'react';

type LayoutShellProps = {
  children: ReactNode;
  profile: Profile;
};

export default function LayoutShell({ children, profile }: LayoutShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-2">
      <div className="interface-shell">
        {/* Top Header Rail */}
        <header className="h-[64px] col-start-2 row-start-1 flex items-center px-4 z-20 gap-3 bg-transparent">
          <div className="flex-1 h-[48px] bg-card/60 dark:bg-card/40 border border-border rounded-2xl flex items-center px-8 relative group">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-[10px] font-code text-foreground dark:text-muted-foreground uppercase tracking-[0.25em] font-black">
                Available for New Projects
              </span>
            </div>
          </div>

          <div className="h-[48px] bg-card border border-border rounded-2xl flex items-center gap-6 px-6 shadow-2xl relative transition-all hover:border-primary/20">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="text-foreground dark:text-muted-foreground hover:text-primary transition-all hover:scale-110"
            >
              <Github size={18} strokeWidth={1.5} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="text-foreground dark:text-muted-foreground hover:text-primary transition-all hover:scale-110"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
            <div className="w-px h-4 bg-border" />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-code text-foreground dark:text-muted-foreground hover:text-primary transition-all uppercase tracking-widest font-bold border border-border px-5 py-2 rounded-xl bg-muted/50 hover:bg-muted"
            >
              Resume
            </a>
          </div>
        </header>

        {/* Sidebar Rail */}
        <aside className="col-start-1 row-start-1 row-end-3 border-r border-border bg-background flex flex-col items-center min-h-full">
          <div className="px-2 w-full h-full">
            <SidebarRail />
          </div>
        </aside>

        {/* Content surface */}
        <div className="col-start-2 row-start-2 px-4 pt-0 pb-2 bg-background overflow-y-auto custom-scrollbar min-h-[600px]">
          {children}
        </div>
      </div>
    </main>
  );
}
