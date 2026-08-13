'use client';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type CapabilityCardProps = {
  title: string;
  skills: string[];
  icon: string;
  extension?: 'left' | 'right' | 'bottom';
};

export default function CapabilityCard({ title, skills, icon, extension }: CapabilityCardProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Sparkles;

  return (
    <div className="glass-card p-5 flex flex-col gap-4 relative group overflow-hidden h-full min-h-[160px]">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon size={18} />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-end">
        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3 opacity-60">{title}</h3>
        <div className="space-y-2.5">
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

      {/* Reference extension cutout geometry */}
      {extension === 'right' && (
        <div className="absolute -bottom-1 -right-1 w-14 h-6 bg-[#0c0f16] rounded-tl-xl border-t border-l border-white/[0.03]" />
      )}
      {extension === 'bottom' && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0c0f16] rounded-t-xl border-t border-x border-white/[0.03]" />
      )}
      {extension === 'left' && (
        <div className="absolute -bottom-1 -left-1 w-14 h-6 bg-[#0c0f16] rounded-tr-xl border-t border-r border-white/[0.03]" />
      )}
    </div>
  );
}