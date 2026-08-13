import { getExperiences } from '@/lib/data';
import { History, Calendar, Building2, MapPin } from 'lucide-react';

export default async function ExperiencePage() {
  const experiences = await getExperiences();
  const visibleExperiences = experiences.filter(e => e.isVisible);

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <History size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Professional Path</h1>
          <p className="text-sm text-muted-foreground font-medium">My journey through roles, internships, and research.</p>
        </div>
      </div>

      <div className="space-y-8 pb-12">
        {visibleExperiences.map((exp, index) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Line */}
            {index !== visibleExperiences.length - 1 && (
              <div className="absolute left-6 top-12 bottom-[-32px] w-[1px] bg-white/5 group-hover:bg-primary/20 transition-colors" />
            )}
            
            <div className="flex gap-8">
              <div className="w-12 h-12 rounded-full bg-[#11141b] border border-white/10 flex items-center justify-center shrink-0 z-10 text-muted-foreground group-hover:text-primary transition-colors group-hover:border-primary/30">
                <Building2 size={18} />
              </div>
              
              <div className="flex-1 bento-card p-6 bg-[#11141b]/50 hover:bg-[#11141b]/80 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-wide">{exp.title}</h2>
                    <p className="text-primary font-bold text-sm tracking-tight">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-code text-muted-foreground uppercase bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <span className="flex items-center gap-2"><Calendar size={12} /> {exp.duration}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
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
