import BentoCard from '@/components/bento-card';
import { getSkills } from '@/lib/data';
import { Code2, Server, BrainCircuit, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

export default async function Skills() {
  const allSkillData = await getSkills();

  const getIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Code2 size={22} />;
      case 'Backend': return <Server size={22} />;
      case 'AI': return <BrainCircuit size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <BentoCard 
      title="Technology Stack"
      icon={<Code2 size={20} className="text-primary/70" />}
      className="p-8 bg-[#151921]/60 h-full"
    >
      <div className="space-y-8 mt-4">
        {allSkillData.map((category) => (
          <div key={category.category} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                {getIcon(category.category)}
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">{category.category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.filter(s => s.isVisible).map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant="secondary" 
                  className="px-4 py-2 bg-secondary/20 hover:bg-secondary/40 text-muted-foreground hover:text-white transition-colors text-sm font-medium border-white/5 rounded-xl"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
