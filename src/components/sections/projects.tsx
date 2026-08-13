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
      icon={<FolderKanban size={20} className="text-primary/70" />}
      headerAction={<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white bg-secondary/20 rounded-xl px-4">View all</Button>}
      className="h-full bg-[#151921]/60 p-8"
    >
      <div className="relative group mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass-card p-6 border-[#ffffff08] bg-[#1c222d]/60 flex flex-col gap-6 group/item hover:bg-[#252c39] transition-all duration-300">
              <div className="space-y-2 mb-2">
                <h4 className="font-bold text-xl text-white">{project.title}</h4>
              </div>
              <div className="aspect-[16/10] relative rounded-2xl overflow-hidden bg-black/40">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover opacity-90 group-hover/item:opacity-100 transition-opacity" 
                />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {project.description}
              </p>
              <Button className="mt-auto bg-primary text-white hover:bg-primary/80 rounded-2xl h-12 w-full transition-all font-semibold">
                View details
              </Button>
            </div>
          ))}
        </div>
        
        <button className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-[#1c222d]/80 border-white/10">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-[#1c222d]/80 border-white/10">
          <ChevronRight size={24} />
        </button>
      </div>
    </BentoCard>
  );
}