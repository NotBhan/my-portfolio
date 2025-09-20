import BentoCard from '@/components/bento-card';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects } from '@/lib/data';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default async function Projects() {
  const projects = await getProjects();

  return (
    <BentoCard title="projects/index.js">
      <h2 className="text-xl font-headline font-bold mb-4">My Work</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1 h-full">
                    <Card className="bg-card/50 border-border/50 overflow-hidden h-full flex flex-col">
                        <CardHeader>
                        <CardTitle className="font-code text-lg">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="font-code text-sm text-muted-foreground flex-grow">
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
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2" />
      </Carousel>
    </BentoCard>
  );
}
