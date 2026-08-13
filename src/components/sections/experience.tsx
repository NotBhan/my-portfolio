import { History, Calendar } from 'lucide-react';
import { getExperiences } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <div className="bento-card p-5 flex flex-col gap-3 group relative overflow-hidden backdrop-blur-xl bg-[#11141b]/95 border-white/5 h-[82px] justify-center">
      <div className="flex items-center gap-2">
         <History size={12} className="text-primary" />
         <span className="text-[9px] font-code text-primary uppercase tracking-[0.2em] font-black">Latest Experience</span>
      </div>

      <div className="grid grid-cols-2 gap-10 flex-1 items-center">
        {experiences.slice(0, 2).map((exp) => (
          <div key={exp.id} className="space-y-1 border-l border-white/5 pl-4 min-w-0">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wide leading-none truncate">{exp.title}</h4>
            <div className="flex items-center justify-between text-[9px] text-muted-foreground font-code uppercase mt-1">
              <span className="truncate max-w-[140px] font-medium">{exp.company}</span>
              <span className="flex items-center gap-1.5 shrink-0 opacity-70"><Calendar size={8} /> {exp.duration.split('–')[0].trim()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}