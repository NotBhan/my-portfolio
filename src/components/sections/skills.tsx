import BentoCard from '@/components/bento-card';
import { Progress } from '@/components/ui/progress';
import { getSkills } from '@/lib/data';

export default async function Skills() {
  const skillData = await getSkills();

  return (
    <BentoCard title="skills/config.json">
      <h2 className="text-xl font-headline font-bold mb-4">{'const mySkills = {'}</h2>
      <div className="space-y-6 font-code text-sm">
        {skillData.map((category) => (
          <div key={category.category}>
            <h3 className="font-bold text-primary mb-2">
              {`  '${category.category}': [`}
            </h3>
            <div className="space-y-3 pl-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1 text-muted-foreground">
                    <span>{`    '${skill.name}'`}</span>
                    <span>{`${skill.level}%`}</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
             <h3 className="font-bold text-primary mt-2">{`  ],`}</h3>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-headline font-bold mt-4">{'}'}</h2>
    </BentoCard>
  );
}
