'use client';
import { FolderKanban, Github, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/definitions';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/data?file=projects.json');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProjects(data.filter((p: Project) => p.isVisible));
        }
      } catch (error) {
        console.error('Projects fetch error:', error);
      }
    }
    fetchProjects();
  }, []);

  const activeProject = projects[activeIndex];

  if (projects.length === 0) {
    return (
      <div className="glass-card flex items-center justify-center min-h-[500px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <FolderKanban className="text-muted-foreground w-12 h-12" />
          <span className="text-xs font-code text-muted-foreground uppercase tracking-widest">Synthesizing Showcase...</span>
        </div>
      </div>
    );
  }

  if (!activeProject) return null;

  return (
    <div className="glass-card p-0 flex flex-col relative overflow-hidden group min-h-[500px] h-full shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      <div className="absolute top-6 left-8 z-20">
        <div className="flex items-center gap-2 mb-2">
          <FolderKanban size={16} className="text-primary/70" />
          <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">Featured Production</span>
        </div>
        <h3 className="text-3xl font-black text-white">{activeProject.title}</h3>
      </div>

      <div className="flex-1 relative mt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src={activeProject.image} 
            alt={activeProject.title} 
            fill 
            className="object-cover transition-all duration-700 group-hover:scale-105" 
            data-ai-hint="project screenshot"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f16] via-[#0c0f16]/60 to-transparent" />
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-md space-y-4">
            <p className="text-lg text-white/90 font-medium leading-relaxed">
              {activeProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies?.map(tech => (
                <Badge key={tech} variant="secondary" className="bg-white/5 border-white/5 text-[10px] uppercase tracking-wider font-code">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-3">
              {activeProject.liveLink && (
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-white rounded-xl font-bold px-8 transition-transform hover:scale-105" asChild>
                  <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer">
                    Live Demo <ArrowRight size={14} className="ml-2" />
                  </a>
                </Button>
              )}
              <Button variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-xl font-bold" asChild>
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                  <Github size={18} className="mr-2" /> Source Code
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-48 h-12 glass-card border-white/5 bg-white/5 px-4 flex items-center justify-between text-left transition-all hover:bg-white/10 group/btn rounded-xl",
                  activeIndex === i ? "border-primary/50 bg-primary/10 ring-1 ring-primary/20" : "opacity-60 grayscale hover:grayscale-0"
                )}
              >
                <span className="text-[10px] font-bold text-white uppercase truncate">{p.title}</span>
                <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", activeIndex === i ? "bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]" : "bg-white/20")} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
