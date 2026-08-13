'use client';
import BentoCard from '@/components/bento-card';
import { FolderKanban, ExternalLink, Github, Code2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/definitions';
import { Badge } from '../ui/badge';

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
      title="Featured Projects"
      icon={<FolderKanban size={20} className="text-primary/70" />}
      className="h-full bg-[#151921]/60 p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {projects.map((project) => (
          <div key={project.id} className="glass-card flex flex-col border-[#ffffff08] bg-[#1c222d]/60 group overflow-hidden transition-all duration-300 hover:shadow-primary/10 hover:shadow-2xl">
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] to-transparent opacity-60" />
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-2xl text-white">{project.title}</h4>
                {project.subtitle && (
                  <p className="text-sm font-semibold text-primary/90">{project.subtitle}</p>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 py-2">
                {project.technologies?.map(tech => (
                  <Badge key={tech} variant="secondary" className="bg-secondary/20 text-[10px] uppercase tracking-wider font-code">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {project.liveLink && (
                  <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-xl font-bold" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} className="mr-2" /> Live Demo
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 rounded-xl font-bold" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github size={14} className="mr-2" /> GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
