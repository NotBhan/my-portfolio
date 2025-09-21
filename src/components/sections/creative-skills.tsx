import BentoCard from '@/components/bento-card';
import { Badge } from '@/components/ui/badge';
import { getCreativeSkills } from '@/lib/data';
import { Brush } from 'lucide-react';

export default async function CreativeSkills() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Brush className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Creative Skills</h3>
        </div>
      }
    >
      {creativeSkills.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {creativeSkills.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="text-center">
              {skill.name}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center font-mono text-sm">
            Coming Soon...
          </p>
        </div>
      )}
    </BentoCard>
  );
}
