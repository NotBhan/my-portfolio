'use client';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type CapabilityCardProps = {
  title: string;
  skills: string[];
  icon: string;
};

export default function CapabilityCard({ title, skills, icon }: CapabilityCardProps) {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Sparkles;

  return (
    <div className="glass-card p-6 flex flex-col gap-6 relative group overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon size={20} />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">{title}</h3>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <div key={skill} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] font-code text-muted-foreground uppercase tracking-wider">
                <span>{skill}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/40 rounded-full transition-all duration-1000"
                  style={{ width: `${90 - (i * 10)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative extension cutout look */}
      <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-[#0c0f16] rounded-tl-3xl border-t border-l border-white/[0.03]" />
    </div>
  );
}