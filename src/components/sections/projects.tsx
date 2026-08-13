'use client';
import BentoCard from '@/components/bento-card';
import { FolderKanban, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/definitions';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/data?file=projects.json');
        const data = await response.json();
        setProjects(data.filter((p: Project) => p.isVisible));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <BentoCard
      title="My Projects"
      icon={<FolderKanban size={16} />}
      headerAction={<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">View all</Button>}
      className="h-full"
    >
      <div className="relative group">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass-card p-4 border-[#30363d]/30 bg-secondary/20 flex flex-col gap-4 group/item hover:bg-secondary/40 transition-colors">
              <div className="aspect-video relative rounded-xl overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover" 
                  data-ai-hint="project screenshot"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-lg">{project.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
              <Button className="mt-auto bg-primary/20 text-primary hover:bg-primary hover:text-white rounded-xl h-10 w-full transition-all">
                View details
              </Button>
            </div>
          ))}
        </div>
        
        <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={20} />
        </button>
      </div>
    </BentoCard>
  );
}