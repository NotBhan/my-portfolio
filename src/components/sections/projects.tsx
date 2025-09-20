import BentoCard from '@/components/bento-card';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects } from '@/lib/data';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default async function Projects() {
  const projects = await getProjects();

  return (
    <BentoCard title="projects/index.js">
      <h2 className="text-xl font-headline font-bold mb-4">My Work</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card/50 border-border/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="font-code text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="font-code text-sm text-muted-foreground">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full rounded-md mb-4 aspect-video object-cover"
                />
              <p>{project.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" asChild className="p-0 h-auto font-code">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </BentoCard>
  );
}
