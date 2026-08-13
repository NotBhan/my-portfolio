import BentoCard from '@/components/bento-card';
import { getSkills } from '@/lib/data';
import { Code2, Braces, Music } from 'lucide-react';

export default async function Skills() {
  const allSkillData = await getSkills();

  return (
    <div className="flex flex-col gap-6 h-full">
      {allSkillData.map((category, idx) => (
        <BentoCard 
          key={category.category}
          className="p-8 bg-[#151921]/60"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              {idx === 0 ? <Code2 size={24} /> : <Braces size={24} />}
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">{category.category}</h3>
          </div>
          
          <div className="space-y-6">
            {category.skills.map((skill) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-white/80">
                  <span>{skill.name}</span>
                </div>
                <div className="skill-progress-bar h-2 bg-secondary/30">
                  <div 
                    className="skill-progress-fill bg-primary h-full" 
                    style={{ width: `${skill.level * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      ))}

      <BentoCard className="p-8 bg-[#151921]/60">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Music size={24} />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Creative Skills</h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium text-white/80">
              <span>Music Production</span>
            </div>
            <div className="skill-progress-bar h-2 bg-secondary/30">
              <div className="skill-progress-fill bg-primary h-full" style={{ width: '85%' }} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium text-white/80">
              <span>Sound Design</span>
            </div>
            <div className="skill-progress-bar h-2 bg-secondary/30">
              <div className="skill-progress-fill bg-primary h-full" style={{ width: '70%' }} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium text-white/80">
              <span>Song Writing</span>
            </div>
            <div className="skill-progress-bar h-2 bg-secondary/30">
              <div className="skill-progress-fill bg-primary h-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}