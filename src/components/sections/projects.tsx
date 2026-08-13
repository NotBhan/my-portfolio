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
      <div className="glass-card flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <FolderKanban className="text-muted-foreground w-10 h-10" />
          <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Synthesizing Showcase...</span>
        </div>
      </div>
    );
  }

  if (!activeProject) return null;

  return (
    <div className="glass-card p-0 flex flex-col relative overflow-hidden h-full min-h-[450px] group shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      <div className="absolute top-6 left-8 z-20">
        <div className="flex items-center gap-2 mb-1">
          <FolderKanban size={14} className="text-primary/70" />
          <span className="text-[9px] font-code text-primary uppercase tracking-[0.2em] font-bold">Featured Production</span>
        </div>
        <h3 className="text-2xl font-black text-white">{activeProject.title}</h3>
      </div>

      <div className="flex-1 relative">
        <Image 
          src={activeProject.image} 
          alt={activeProject.title} 
          fill 
          className="object-cover transition-all duration-700 group-hover:scale-105 z-0" 
          data-ai-hint="project screenshot"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f16] via-[#0c0f16]/40 to-transparent z-10" />

        <div className="absolute bottom-6 left-8 right-8 z-30 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="max-w-md space-y-3">
            <p className="text-sm text-white/90 font-medium leading-relaxed">
              {activeProject.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.technologies?.slice(0, 4).map(tech => (
                <Badge key={tech} variant="secondary" className="bg-white/5 border-white/5 text-[8px] uppercase tracking-wider font-code">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              {activeProject.liveLink && (
                <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-lg font-bold px-5 h-9 text-xs transition-transform" asChild>
                  <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer">
                    Demo <ArrowRight size={12} className="ml-1.5" />
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-lg font-bold h-9 text-xs" asChild>
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                  <Github size={14} className="mr-1.5" /> Code
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-36 h-9 glass-card border-white/5 bg-white/5 px-3 flex items-center justify-between text-left transition-all hover:bg-white/10 rounded-lg",
                  activeIndex === i ? "border-primary/50 bg-primary/10 ring-1 ring-primary/20" : "opacity-40 grayscale"
                )}
              >
                <span className="text-[8px] font-bold text-white uppercase truncate">{p.title}</span>
                <div className={cn("w-1 h-1 rounded-full", activeIndex === i ? "bg-primary" : "bg-white/20")} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}