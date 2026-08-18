'use client';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type CapabilityCardProps = {
  title: string;
  skills: { name: string; isVisible?: boolean }[];
  icon: string;
  className?: string;
};

export default function CapabilityCard({ title, skills, icon, className }: CapabilityCardProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Sparkles;

  return (
    <div className={cn(
      "bento-card flex flex-col relative group h-full",
      className
    )}>
      <div className="flex flex-col p-5 px-6 h-full z-20 justify-start">
        {/* Top Header */}
        <div className="flex items-center gap-3 mb-3.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
            <Icon size={14} />
          </div>
          <h3 className="text-[13px] font-black text-foreground uppercase tracking-[0.2em]">{title}</h3>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 content-start flex-1">
          {skills.filter(s => s.isVisible !== false).map((skill) => (
            <p key={skill.name} className="text-[11px] font-bold text-foreground uppercase tracking-wide truncate">
              {skill.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
