import BentoCard from '@/components/bento-card';
import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Music } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <div className="bento-card p-5 flex flex-col gap-2 bg-[#11141b]/40">
      <div className="flex items-center gap-2">
        <Music size={12} className="text-primary/70" />
        <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Beyond Code</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[9px] text-muted-foreground italic">Music production, sound design, and creative experimentation.</p>
        <div className="flex flex-wrap gap-1.5">
          {creativeSkills.map((skill) => (
            <Badge key={skill.id} variant="outline" className="text-[8px] uppercase border-white/10 opacity-60 px-1.5 h-4 font-code">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}