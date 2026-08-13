import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Music } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <div className="bento-card p-5 flex flex-col justify-center gap-3 bg-card flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Music size={14} className="text-primary/80" />
        <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Beyond Code</h3>
      </div>
      
      <p className="text-[10px] text-muted-foreground font-medium leading-relaxed mb-1">
        Merging technology with music production and sound design.
      </p>
      
      <div className="flex flex-wrap gap-1.5">
        {creativeSkills.map((skill) => (
          <Badge 
            key={skill.id} 
            variant="outline" 
            className="text-[9px] uppercase border-border bg-muted/20 px-2.5 py-1 font-code font-bold hover:bg-primary/20 hover:border-primary/30 hover:text-foreground transition-all duration-300"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
