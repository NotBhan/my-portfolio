'use client';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type CapabilityCardProps = {
  title: string;
  skills: { name: string; isVisible?: boolean }[];
  icon: string;
  className?: string;
  carve?: 'bottom-right';
};

export default function CapabilityCard({ title, skills, icon, className, carve }: CapabilityCardProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Sparkles;

  return (
    <div className={cn(
      "bento-card p-4 flex flex-col gap-2 relative group h-full",
      carve === 'bottom-right' && "carve-bottom-right",
      className
    )}>
      <div className="flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                <Icon size={12} />
            </div>
            <h3 className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{title}</h3>
        </div>
      </div>
      
      <div className="flex-1 flex flex-wrap gap-1 relative z-20 content-start">
          {skills.filter(s => s.isVisible !== false).map((skill) => (
            <Badge 
                key={skill.name} 
                variant="outline" 
                className="text-[7px] font-code border-white/10 text-muted-foreground hover:text-white hover:border-primary/40 transition-colors uppercase px-1.5 h-3.5"
            >
                {skill.name}
            </Badge>
          ))}
      </div>
    </div>
  );
}