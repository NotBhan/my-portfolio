'use client';

import { usePathname } from 'next/navigation';
import { Github, Linkedin } from 'lucide-react';
import Navbar from '@/components/navbar';
import type { Profile } from '@/lib/definitions';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
    <main className="min-h-screen flex items-center justify-center p-0 md:p-2">
      <div className="interface-shell">
        {/* Top Header Rail */}
        <header className={cn(
          "flex items-center px-4 z-20 gap-3 bg-transparent shrink-0 w-full md:w-auto",
          "h-[56px] border-b border-border/50 bg-background/80 backdrop-blur-md md:h-[64px] md:col-start-2 md:row-start-1 md:border-b-0 md:bg-transparent md:backdrop-blur-none"
        )}>
          <div className={cn(
            "flex-1 bg-card/60 dark:bg-card/40 border border-border flex items-center relative group",
            "h-[36px] rounded-xl px-4 md:h-[48px] rounded-2xl md:px-8"
          )}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-[8px] md:text-[10px] font-code text-foreground dark:text-muted-foreground uppercase tracking-[0.2em] md:tracking-[0.25em] font-black truncate">
                <span className="md:hidden">Open for work</span>
                <span className="hidden md:inline">Available for New Projects</span>
              </span>
            </div>
          </div>

          <div className={cn(
            "bg-card border border-border flex items-center shadow-2xl relative transition-all hover:border-primary/20",
            "h-[36px] rounded-xl px-3 gap-3 md:h-[48px] md:rounded-2xl md:px-6 md:gap-6"
          )}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="text-foreground dark:text-muted-foreground hover:text-primary transition-all hover:scale-110"
            >
              <Github className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="text-foreground dark:text-muted-foreground hover:text-primary transition-all hover:scale-110"
            >
              <Linkedin className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
            </a>
            <div className="w-px h-3 md:h-4 bg-border" />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[9px] md:text-[11px] font-code text-foreground dark:text-muted-foreground hover:text-primary transition-all uppercase tracking-widest font-bold border border-border px-3 md:px-5 py-1 md:py-2 rounded-lg md:rounded-xl bg-muted/50 hover:bg-muted"
            >
              PDF
            </a>
          </div>
        </header>

        {/* Navigation - Sidebar on Desktop, Magic bar on Mobile */}
        <aside className={cn(
          "bg-background z-30 shrink-0",
          "fixed bottom-0 left-0 right-0 h-[70px] z-[50] md:static md:col-start-1 md:row-start-1 md:row-end-3 md:border-r md:border-border md:min-h-full md:h-auto"
        )}>
          <Navbar />
        </aside>

        {/* Content surface */}
        <div className={cn(
          "bg-background overflow-y-auto custom-scrollbar",
          "flex-1 px-4 pt-4 pb-[100px] md:col-start-2 md:row-start-2 md:px-4 md:pt-0 md:min-h-[600px] md:pb-2"
        )}>
          {children}
        </div>
      </div>
    </main>
  );
}
