import BentoCard from '@/components/bento-card';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects } from '@/lib/data';
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

export default async function Projects() {
  const allProjects = await getProjects();
  const projects = allProjects.filter((p) => p.isVisible);

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
                <div className="p-1 h-full">
                    <Card className="bg-card/50 border-border/50 overflow-hidden h-full flex flex-col">
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
                        <p className='line-clamp-2'>{project.description}</p>
                        </CardContent>
                        <CardFooter className='gap-4'>
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
                        </CardFooter>
                    </Card>
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-16px] top-1/2 -translate-y-1/2 size-8" />
        <CarouselNext className="absolute right-[-16px] top-1/2 -translate-y-1/2 size-8" />
      </Carousel>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center font-mono text-sm">
                No projects yet.
            </p>
        </div>
      )}
    </BentoCard>
  );
}
