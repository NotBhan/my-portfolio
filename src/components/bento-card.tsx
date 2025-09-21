import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  as?: React.ElementType;
  showButtons?: boolean;
};

export default function BentoCard({ children, className, title, as: Component = 'div', showButtons = false }: BentoCardProps) {
  return (
    <Component
      className={cn(
        'relative flex w-full flex-col rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      <div className="flex-1 p-4 md:p-6 flex flex-col">
        {title && (
            <div className="relative -mx-4 -mt-4 mb-4 flex items-center justify-center gap-2 border-b p-4 md:-mx-6 md:-mt-6">
                {showButtons && (
                    <div className="absolute left-4 top-1/2 flex -translate-y-1/2 gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                )}
                <div className="flex-grow flex justify-center">
                    {typeof title === 'string' ? (
                        <p className="font-code text-sm font-bold text-muted-foreground">{title}</p>
                    ) : (
                        title
                    )}
                </div>
            </div>
        )}
        <div className="flex flex-col">{children}</div>
      </div>
    </Component>
  );
}
