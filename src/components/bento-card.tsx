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
        'glass-card p-6 flex flex-col',
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            {title && (
              <h3 className="text-sm font-semibold tracking-wide text-foreground/90 uppercase">
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