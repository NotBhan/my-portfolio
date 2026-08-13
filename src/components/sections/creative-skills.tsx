import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Music } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <div className="bento-card p-6 flex flex-col gap-6 bg-[#11141b]/40 flex-1 justify-center items-center text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary/80 border border-primary/10">
          <Music size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Beyond Code</h3>
          <p className="text-[10px] text-muted-foreground font-medium max-w-[220px] mx-auto leading-relaxed">
            Exploring the intersection of technology and creativity through music production and sound design.
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 max-w-[280px]">
        {creativeSkills.map((skill) => (
          <Badge 
            key={skill.id} 
            variant="outline" 
            className="text-[9px] uppercase border-white/5 bg-white/[0.03] px-3 py-1.5 font-code font-bold hover:bg-primary/20 hover:border-primary/30 hover:text-white transition-all duration-300"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
