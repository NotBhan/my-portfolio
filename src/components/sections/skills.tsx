import BentoCard from '@/components/bento-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSkills } from '@/lib/data';
import { Star } from 'lucide-react';

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
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-headline font-bold mb-4">
          {'const mySkills = {'}
        </h2>
        <ScrollArea className="flex-grow">
          <div className="space-y-6 font-code text-sm pr-4">
            {skillData.length > 0 ? (
              skillData.map((category) => (
                <div key={category.category}>
                  <h3 className="font-bold text-primary mb-2">
                    {`  '${category.category}': [`}
                  </h3>
                  <div className="space-y-2 pl-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>{`    '${skill.name}'`}</span>
                          <span className="text-xs font-mono bg-muted px-2 py-1 rounded-md">{`${skill.level} months`}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <h3 className="font-bold text-primary mt-2">{`  ],`}</h3>
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
        <h2 className="text-xl font-headline font-bold mt-4">{'}'}</h2>
      </div>
    </BentoCard>
  );
}
