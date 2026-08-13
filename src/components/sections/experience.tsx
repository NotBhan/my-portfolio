import { History, Briefcase } from 'lucide-react';
import BentoCard from '../bento-card';
import { getExperiences } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <BentoCard
      title="My Experiences"
      icon={<Briefcase size={20} className="text-primary/70" />}
      className="bg-[#151921]/60 p-8"
    >
      <div className="space-y-6 mt-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="glass-card p-6 flex items-center justify-between border-white/5 bg-[#1c222d]/40 group hover:bg-[#252c39]/60 transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-6 h-6 rounded-full bg-primary/40 glow-purple flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">{exp.title}</h4>
                <p className="text-base text-muted-foreground opacity-80">{exp.description}</p>
              </div>
            </div>
            <div className="glass-card py-2 px-6 text-sm font-medium text-muted-foreground bg-secondary/40 rounded-2xl border-white/5">
              {exp.duration}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}