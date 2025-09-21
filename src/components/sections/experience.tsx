import { Briefcase } from 'lucide-react';
import BentoCard from '../bento-card';
import { getExperiences } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function Experiences() {
  const allExperiences = await getExperiences();
  const experiences = allExperiences.filter((e) => e.isVisible);

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">My Experiences</h3>
        </div>
      }
      showButtons={true}
    >
      {experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Dialog key={exp.id}>
              <DialogTrigger asChild>
                <Card className="bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm font-semibold">{exp.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">{exp.company}</p>
                      </div>
                      <p className="text-xs text-muted-foreground text-right shrink-0">{exp.duration}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{exp.description}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{exp.title}</DialogTitle>
                  <DialogDescription>
                    {exp.company} - {exp.duration}
                  </DialogDescription>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                    <p>{exp.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center font-mono text-sm">
            No Experiences Found Yet.
          </p>
        </div>
      )}
    </BentoCard>
  );
}
