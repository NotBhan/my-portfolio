import { History, Briefcase, Calendar } from 'lucide-react';
import { getExperiences } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <div className="glass-card p-8 flex flex-col gap-8 relative overflow-hidden">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">Professional History</span>
            <h3 className="text-2xl font-black text-white">Experience</h3>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="nested-module flex flex-col gap-3 group hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase size={16} />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-code text-muted-foreground uppercase">
                <Calendar size={12} />
                {exp.duration}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-primary transition-colors">{exp.title}</h4>
              <p className="text-xs text-muted-foreground font-medium">{exp.company}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Experience nested cut-out visual placeholder */}
      <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-[#0c0f16] rounded-tl-[2.5rem] border-t border-l border-white/[0.03]" />
    </div>
  );
}