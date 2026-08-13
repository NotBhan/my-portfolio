'use client';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type CapabilityCardProps = {
  title: string;
  skills: { name: string; progress?: number }[];
  icon: string;
  className?: string;
  carve?: 'bottom-right';
};

export default function CapabilityCard({ title, skills, icon, className, carve }: CapabilityCardProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Sparkles;

  return (
    <div className={cn(
      "bento-card p-5 flex flex-col gap-3 relative group",
      carve === 'bottom-right' && "carve-bottom-right",
      className
    )}>
      <div className="flex items-center justify-between relative z-20">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
          <Icon size={16} />
        </div>
        <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{title}</h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-end gap-2 relative z-20">
        <div className="space-y-2">
          {skills.map((skill, i) => (
            <div key={skill.name} className="flex flex-col gap-1">
              <div className="flex justify-between text-[8px] font-code text-muted-foreground uppercase tracking-wider">
                <span>{skill.name}</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/40 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.progress || (85 - (i * 12))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
