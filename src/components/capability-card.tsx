'use client';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type CapabilityCardProps = {
  title: string;
  skills: { name: string; isVisible?: boolean }[];
  icon: string;
  className?: string;
  carve?: 'bottom-right';
};

export default function CapabilityCard({ title, skills, icon, className, carve }: CapabilityCardProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Sparkles;

  // Split skills into two curated groups for better visual scale
  const midPoint = Math.ceil(skills.length / 2);
  const coreSkills = skills.filter(s => s.isVisible !== false).slice(0, midPoint);
  const secondarySkills = skills.filter(s => s.isVisible !== false).slice(midPoint);

  return (
    <div className={cn(
      "bento-card p-6 flex flex-col gap-4 relative group h-full justify-between",
      carve === 'bottom-right' && "carve-bottom-right",
      className
    )}>
      <div className="flex items-center gap-3 relative z-20">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
              <Icon size={14} />
          </div>
          <h3 className="text-[13px] font-black text-white/70 uppercase tracking-[0.2em]">{title}</h3>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4 relative z-20 content-center mt-2">
          <div className="space-y-1.5">
            {coreSkills.map((skill) => (
              <p key={skill.name} className="text-[12px] font-bold text-white/90 uppercase tracking-wide">
                {skill.name}
              </p>
            ))}
          </div>
          <div className="space-y-1.5 opacity-60">
            {secondarySkills.map((skill) => (
              <p key={skill.name} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                {skill.name}
              </p>
            ))}
          </div>
      </div>
    </div>
  );
}
