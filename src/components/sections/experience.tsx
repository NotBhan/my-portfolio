import { History, Calendar } from 'lucide-react';
import { getExperiences } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <div className="bento-card p-3 flex flex-col gap-1.5 group relative overflow-hidden backdrop-blur-xl bg-[#11141b]/95 border-white/5 h-[68px]">
      <div className="flex items-center gap-1.5">
         <History size={10} className="text-primary" />
         <span className="text-[7px] font-code text-primary uppercase tracking-[0.2em] font-bold">Latest Experience</span>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 items-center content-center">
        {experiences.slice(0, 2).map((exp) => (
          <div key={exp.id} className="space-y-0.5 border-l border-white/5 pl-2.5">
            <h4 className="text-[8px] font-bold text-white truncate leading-none">{exp.title}</h4>
            <div className="flex items-center justify-between text-[6px] text-muted-foreground font-code uppercase mt-0.5">
              <span className="truncate max-w-[120px]">{exp.company}</span>
              <span className="flex items-center gap-1 shrink-0"><Calendar size={5} /> {exp.duration.split('–')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}