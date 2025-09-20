import BentoCard from '@/components/bento-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSkills } from '@/lib/data';

export default async function Skills() {
  const skillData = await getSkills();

  return (
    <BentoCard title="skills/config.json">
        <h2 className="text-xl font-headline font-bold mb-4">{'const mySkills = {'}</h2>
        <ScrollArea className="h-80">
            <div className="space-y-6 font-code text-sm pr-4">
                {skillData.map((category) => (
                <div key={category.category}>
                    <h3 className="font-bold text-primary mb-2">
                    {`  '${category.category}': [`}
                    </h3>
                    <div className="space-y-2 pl-4">
                    {category.skills.map((skill) => (
                        <div key={skill.name}>
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>{`    '${skill.name}'`}</span>
                            <span className='text-xs font-mono bg-muted px-2 py-1 rounded-md'>{`${skill.level} months`}</span>
                        </div>
                        </div>
                    ))}
                    </div>
                    <h3 className="font-bold text-primary mt-2">{`  ],`}</h3>
                </div>
                ))}
            </div>
        </ScrollArea>
        <h2 className="text-xl font-headline font-bold mt-4">{'}'}</h2>
    </BentoCard>
  );
}
