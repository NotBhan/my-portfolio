import BentoCard from '@/components/bento-card';
import { getSkills } from '@/lib/data';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Skills() {
  const skillData = await getSkills();

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Tech I Use</h3>
        </div>
      }
      className="h-full"
      showButtons={true}
    >
      <ScrollArea className="h-full">
        <div className="space-y-6 pr-4">
          {skillData.length > 0 ? (
            skillData.map((category) => (
              <div key={category.category}>
                <h3 className="font-semibold text-sm text-foreground mb-3">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-muted-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center font-mono text-sm">
                No skills added yet.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </BentoCard>
  );
}
