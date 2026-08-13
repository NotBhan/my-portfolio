import { History, Calendar } from 'lucide-react';
import { getExperiences } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <div className="bento-card p-3 flex flex-col gap-2 group relative overflow-hidden backdrop-blur-xl bg-[#11141b]/95 border-white/5 h-full">
      <div className="flex items-center gap-2">
         <History size={10} className="text-primary" />
         <span className="text-[7px] font-code text-primary uppercase tracking-[0.2em] font-bold">Timeline</span>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 items-center">
        {experiences.slice(0, 2).map((exp) => (
          <div key={exp.id} className="space-y-0.5">
            <h4 className="text-[9px] font-bold text-white truncate leading-none">{exp.title}</h4>
            <div className="flex items-center justify-between text-[7px] text-muted-foreground font-code uppercase">
              <span className="truncate max-w-[80px]">{exp.company}</span>
              <span className="flex items-center gap-1 shrink-0"><Calendar size={6} /> {exp.duration.split('–')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}