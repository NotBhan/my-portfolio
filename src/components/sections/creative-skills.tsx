import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Music } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <div className="bento-card p-6 flex flex-col gap-3 bg-[#11141b]/40 min-h-[95px] justify-center">
      <div className="flex items-center gap-3">
        <Music size={14} className="text-primary/80" />
        <h3 className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Beyond Code</h3>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-[11px] text-muted-foreground font-medium italic opacity-80">Music production, sound design, and creative experimentation.</p>
        <div className="flex flex-wrap gap-2">
          {creativeSkills.map((skill) => (
            <Badge key={skill.id} variant="outline" className="text-[9px] uppercase border-white/10 opacity-70 px-3 py-1 font-code font-bold hover:opacity-100 transition-opacity">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
