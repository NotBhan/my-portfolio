'use client';
import BentoCard from '@/components/bento-card';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/lib/definitions';
import Image from 'next/image';
import { Button } from '../ui/button';
import { FolderKanban } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/data?file=projects.json');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const allProjects = await response.json();
        const visibleProjects = allProjects.filter((p: Project) => p.isVisible);
        setProjects(visibleProjects);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
        <BentoCard
        title={
            <div className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">My Projects</h3>
            </div>
        }
        >
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center font-mono text-sm">
                    Loading projects...
                </p>
            </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <FolderKanban className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">My Projects</h3>
        </div>
      }
    >
      {projects.length > 0 ? (
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="p-1 h-full">
                      <Card className="bg-card/50 border-border/50 overflow-hidden h-full flex flex-col cursor-pointer hover:border-primary/50 transition-colors">
                        <CardHeader>
                          <CardTitle className="font-code text-base">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="font-code text-xs text-muted-foreground flex-grow">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={400}
                            height={250}
                            className="w-full rounded-md mb-2 aspect-video object-cover"
                          />
                          <p className="line-clamp-2">{project.description}</p>
                        </CardContent>
                        <CardFooter>
                          <p className='text-xs font-code text-primary'>Click to see more</p>
                        </CardFooter>
                      </Card>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-code">{project.title}</DialogTitle>
                      <DialogDescription className="font-code text-sm text-muted-foreground pt-2">
                         <Image
                            src={project.image}
                            alt={project.title}
                            width={400}
                            height={250}
                            className="w-full rounded-md mb-4 aspect-video object-cover"
                        />
                        {project.description}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='gap-2 sm:justify-start'>
                      {project.link && (
                        <Button variant="secondary" size="sm" asChild className="font-code text-xs">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            Source Code
                          </a>
                        </Button>
                      )}
                      {project.liveLink && (
                        <Button variant="default" size="sm" asChild className="font-code text-xs">
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            Live Link
                          </a>
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-16px] top-1/2 -translate-y-1/2 size-8" />
          <CarouselNext className="absolute right-[-16px] top-1/2 -translate-y-1/2 size-8" />
        </Carousel>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center font-mono text-sm">No projects yet.</p>
        </div>
      )}
    </BentoCard>
  );
}
