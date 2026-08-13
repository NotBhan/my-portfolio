'use client';

import { usePathname } from 'next/navigation';
import { Github, Linkedin } from 'lucide-react';
import Navbar from '@/components/navbar';
import type { Profile } from '@/lib/definitions';
import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type LayoutShellProps = {
  children: ReactNode;
  profile: Profile;
};

export default function LayoutShell({ children, profile }: LayoutShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isMobile = useIsMobile();

  if (isAdmin) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-0 md:p-2">
      <div className="interface-shell">
        {/* Top Header Rail */}
        <header className={cn(
          "flex items-center px-4 z-20 gap-3 bg-transparent shrink-0",
          isMobile ? "h-[56px] w-full border-b border-border/50 bg-background/80 backdrop-blur-md" : "h-[64px] col-start-2 row-start-1"
        )}>
          <div className={cn(
            "flex-1 bg-card/60 dark:bg-card/40 border border-border flex items-center relative group",
            isMobile ? "h-[36px] rounded-xl px-4" : "h-[48px] rounded-2xl px-8"
          )}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-[8px] md:text-[10px] font-code text-foreground dark:text-muted-foreground uppercase tracking-[0.2em] md:tracking-[0.25em] font-black truncate">
                {isMobile ? "Open for work" : "Available for New Projects"}
              </span>
            </div>
          </div>

          <div className={cn(
            "bg-card border border-border flex items-center shadow-2xl relative transition-all hover:border-primary/20",
            isMobile ? "h-[36px] rounded-xl px-3 gap-3" : "h-[48px] rounded-2xl px-6 gap-6"
          )}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="text-foreground dark:text-muted-foreground hover:text-primary transition-all hover:scale-110"
            >
              <Github size={isMobile ? 14 : 18} strokeWidth={1.5} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="text-foreground dark:text-muted-foreground hover:text-primary transition-all hover:scale-110"
            >
              <Linkedin size={isMobile ? 14 : 18} strokeWidth={1.5} />
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

        {/* Navigation - Sidebar on Desktop, Bottom bar on Mobile */}
        <aside className={cn(
          "bg-background z-30 shrink-0",
          isMobile 
            ? "fixed bottom-0 left-0 right-0 h-[64px] border-t border-border" 
            : "col-start-1 row-start-1 row-end-3 border-r border-border min-h-full"
        )}>
          <Navbar />
        </aside>

        {/* Content surface */}
        <div className={cn(
          "bg-background overflow-y-auto custom-scrollbar pb-20 md:pb-2",
          isMobile 
            ? "flex-1 px-4 py-4" 
            : "col-start-2 row-start-2 px-4 pt-0 min-h-[600px]"
        )}>
          {children}
        </div>
      </div>
    </main>
  );
}