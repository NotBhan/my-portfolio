import BentoCard from '@/components/bento-card';
import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Music } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <BentoCard
      title="Beyond Code"
      icon={<Music size={20} className="text-muted-foreground" />}
      className="bg-[#151921]/40 p-8 h-full"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground italic">Music production & sound design</p>
        <div className="flex flex-wrap gap-2">
          {creativeSkills.map((skill) => (
            <Badge key={skill.id} variant="outline" className="text-[10px] uppercase border-white/10 opacity-60">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
