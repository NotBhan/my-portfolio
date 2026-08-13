'use client';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type CapabilityCardProps = {
  title: string;
  skills: string[];
  icon: string;
  carve?: 'bottom-right';
};

export default function CapabilityCard({ title, skills, icon, carve }: CapabilityCardProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Sparkles;

  return (
    <div className={cn(
      "bento-card p-5 flex flex-col gap-4 relative group",
      carve === 'bottom-right' && "carve-bottom-right"
    )}>
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
          <Icon size={16} />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-end">
        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3 opacity-60">{title}</h3>
        <div className="space-y-2">
          {skills.map((skill, i) => (
            <div key={skill} className="flex flex-col gap-1">
              <div className="flex justify-between text-[9px] font-code text-muted-foreground uppercase tracking-wider">
                <span>{skill}</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/40 rounded-full transition-all duration-1000"
                  style={{ width: `${85 - (i * 12)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
