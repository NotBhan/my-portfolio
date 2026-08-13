
import { getExperiences } from '@/lib/data';
import { History, Calendar, Building2 } from 'lucide-react';

export default async function ExperiencePage() {
  const experiences = await getExperiences();
  const visibleExperiences = experiences.filter(e => e.isVisible);

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
          <History size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground uppercase tracking-tight">Professional Path</h1>
          <p className="text-[11px] text-muted-foreground font-medium">My journey through roles, internships, and research.</p>
        </div>
      </div>

      <div className="space-y-4 pb-10">
        {visibleExperiences.map((exp, index) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Line */}
            {index !== visibleExperiences.length - 1 && (
              <div className="absolute left-5 top-10 bottom-[-24px] w-[1px] bg-border group-hover:bg-primary/20 transition-colors" />
            )}
            
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shrink-0 z-10 text-muted-foreground group-hover:text-primary transition-colors group-hover:border-primary/30">
                <Building2 size={16} />
              </div>
              
              <div className="flex-1 bento-card p-5 bg-card/40 hover:bg-card/70 transition-all border-border/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-[15px] font-black text-foreground uppercase tracking-wide leading-tight">{exp.title}</h2>
                    <p className="text-primary font-bold text-[12px] tracking-tight">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-code text-muted-foreground uppercase bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
                    <span className="flex items-center gap-2"><Calendar size={11} /> {exp.duration}</span>
                  </div>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed font-medium">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
