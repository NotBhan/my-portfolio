import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Music } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <div className="bento-card p-4 flex flex-col gap-1.5 bg-[#11141b]/40 min-h-[90px]">
      <div className="flex items-center gap-1.5">
        <Music size={10} className="text-primary/70" />
        <h3 className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Beyond Code</h3>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[8px] text-muted-foreground italic">Music production, sound design, and creative experimentation.</p>
        <div className="flex flex-wrap gap-1">
          {creativeSkills.map((skill) => (
            <Badge key={skill.id} variant="outline" className="text-[7px] uppercase border-white/10 opacity-60 px-1.5 h-3.5 font-code">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}