import { CheckCircle, Circle, FileText, Pencil, Rocket } from 'lucide-react';
import BentoCard from '../bento-card';

const processSteps = [
    { name: 'Goals & Objectives', icon: CheckCircle },
    { name: 'Research', icon: FileText },
    { name: 'Wireframe', icon: Circle },
    { name: 'Prototyping', icon: Pencil },
    { name: 'Finalize Design', icon: Rocket },
]

export default function WorkProcess() {
  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Workflow Highlights</h3>
        </div>
      }
    >
      <div className="space-y-4">
        {processSteps.map(step => (
            <div key={step.name} className="flex items-center gap-4 bg-muted/50 p-3 rounded-lg">
                <step.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{step.name}</span>
            </div>
        ))}
      </div>
    </BentoCard>
  );
}
