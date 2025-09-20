import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export default function BentoCard({ children, className, title }: BentoCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col w-full rounded-xl border bg-card/50 shadow-inner shadow-white/5 backdrop-blur-sm',
        'transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-primary/20',
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-2 border-b bg-black/10 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <p className="font-code text-sm text-muted-foreground">{title}</p>
        </div>
      )}
      <div className="p-4 md:p-6 flex-1">{children}</div>
    </div>
  );
}
