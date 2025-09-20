import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  as?: React.ElementType;
};

export default function BentoCard({ children, className, title, as: Component = 'div' }: BentoCardProps) {
  return (
    <Component
      className={cn(
        'relative flex flex-col w-full rounded-xl border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-2 border-b p-4">
            <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#EC6A5E]"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#F4BF4F]"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-[#61C554]"></div>
            </div>
            <div className="flex-grow flex justify-center">
                {typeof title === 'string' ? (
                    <p className="font-code text-sm font-bold text-muted-foreground">{title}</p>
                ) : (
                    title
                )}
            </div>
        </div>
      )}
      <div className="p-4 md:p-6 flex-1">{children}</div>
    </Component>
  );
}
