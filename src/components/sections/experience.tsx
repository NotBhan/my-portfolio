import { History } from 'lucide-react';
import BentoCard from '../bento-card';
import { getExperiences } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <BentoCard
      title="My Experiences"
      icon={<History size={16} />}
    >
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="glass-card p-4 flex items-center justify-between border-[#30363d]/20 bg-secondary/10">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-primary/40 glow-purple" />
              <div>
                <h4 className="font-bold">{exp.title}</h4>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </div>
            </div>
            <div className="glass-card py-1 px-3 text-xs text-muted-foreground bg-secondary/30 rounded-full">
              {exp.duration}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}