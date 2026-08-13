import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Music } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <div className="bento-card p-5 flex flex-col gap-5 bg-[#11141b]/40 flex-1 justify-center items-center text-center">
      <div className="flex flex-col items-center gap-2.5">
        <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary/80 border border-primary/10">
          <Music size={18} />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Beyond Code</h3>
          <p className="text-[10px] text-muted-foreground font-medium max-w-[180px] mx-auto leading-tight">
            Merging technology with music production and sound design.
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-1.5 max-w-[260px]">
        {creativeSkills.map((skill) => (
          <Badge 
            key={skill.id} 
            variant="outline" 
            className="text-[9px] uppercase border-white/5 bg-white/[0.03] px-2.5 py-1.5 font-code font-bold hover:bg-primary/20 hover:border-primary/30 hover:text-white transition-all duration-300"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
