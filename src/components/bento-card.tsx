
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  icon?: ReactNode;
  headerAction?: ReactNode;
};

export default function BentoCard({
  children,
  className,
  title,
  icon,
  headerAction,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        'bento-card p-8 flex flex-col bg-card/40 border-border/60 shadow-xl backdrop-blur-md',
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            {icon && <div className="text-primary p-2 bg-primary/10 rounded-xl">{icon}</div>}
            {title && (
              <h3 className="text-[12px] font-black tracking-[0.2em] text-foreground uppercase">
                {title}
              </h3>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
