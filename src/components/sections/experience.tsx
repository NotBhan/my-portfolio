import { Briefcase } from 'lucide-react';
import BentoCard from '../bento-card';
import { getProjects } from '@/lib/data';

export default async function Experiences() {
  const allExperiences = await getProjects();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">My Experiences</h3>
        </div>
      }
      className="h-full"
      showButtons={true}
    >
      {experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm">{exp.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center font-mono text-sm">
                Error 404 - No Experiences Found
            </p>
        </div>
      )}
    </BentoCard>
  );
}
