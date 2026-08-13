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
      "bento-card flex flex-col relative group min-h-[140px]",
      className
    )}>
      <div className="flex flex-col p-5 pb-7 z-20">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                <Icon size={14} />
            </div>
            <h3 className="text-[13px] font-black text-white uppercase tracking-[0.2em]">{title}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 content-start">
          {skills.filter(s => s.isVisible !== false).map((skill) => (
            <p key={skill.name} className="text-[11px] font-bold text-white uppercase tracking-wide truncate">
              {skill.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
