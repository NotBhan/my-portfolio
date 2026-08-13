import BentoCard from '@/components/bento-card';
import { getSkills, getCreativeSkills } from '@/lib/data';
import { Code2, Braces, Music } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default async function Skills() {
  const allSkillData = await getSkills();
  const creativeSkills = await getCreativeSkills();

  return (
    <div className="flex flex-col gap-4">
      {allSkillData.map((category, idx) => (
        <BentoCard 
          key={category.category}
          title={category.category}
          icon={idx === 0 ? <Code2 size={16} /> : <Braces size={16} />}
          className="p-6"
        >
          <div className="space-y-4">
            {category.skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase">
                  <span>{skill.name}</span>
                </div>
                <Progress value={skill.level * 80} className="h-2 bg-secondary" />
              </div>
            ))}
          </div>
        </BentoCard>
      ))}

      <BentoCard 
        title="Creative Skills"
        icon={<Music size={16} />}
        className="p-6"
      >
        <div className="space-y-4">
          {creativeSkills.slice(0, 3).map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase">
                <span>{skill.name}</span>
              </div>
              <Progress value={70} className="h-2 bg-secondary" />
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  );
}