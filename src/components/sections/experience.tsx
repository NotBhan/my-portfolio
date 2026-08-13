import { Briefcase, Calendar } from 'lucide-react';
import { getExperiences } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <div className="nested-module p-4 flex flex-col gap-3 group relative overflow-hidden backdrop-blur-xl bg-[#1a1f29]/80 border-white/10">
      <div className="flex items-center gap-2">
         <Briefcase size={14} className="text-primary" />
         <span className="text-[9px] font-code text-primary uppercase tracking-[0.2em] font-bold">Latest Exp</span>
      </div>

      <div className="space-y-3">
        {experiences.slice(0, 2).map((exp) => (
          <div key={exp.id} className="space-y-1">
            <h4 className="text-[10px] font-bold text-white truncate">{exp.title}</h4>
            <div className="flex items-center justify-between text-[8px] text-muted-foreground font-code uppercase tracking-wider">
              <span>{exp.company}</span>
              <span className="flex items-center gap-1"><Calendar size={8} /> {exp.duration.split('–')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}