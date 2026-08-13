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
      <div className="bento-card flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <FolderKanban className="text-muted-foreground w-8 h-8" />
          <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Loading...</span>
        </div>
      </div>
    );
  }

  if (!activeProject) return null;

  return (
    <div className="bento-card p-0 flex flex-col relative h-full group carve-bottom-left">
      {/* Absolute top label */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center gap-2 mb-1">
          <FolderKanban size={12} className="text-primary/70" />
          <span className="text-[8px] font-code text-primary uppercase tracking-[0.2em] font-bold">Featured Production</span>
        </div>
        <h3 className="text-xl font-black text-white">{activeProject.title}</h3>
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

        {/* The Nested Info Card - Physically breaking into the project surface */}
        <div className="absolute bottom-2 left-2 right-2 z-30 flex items-end justify-between">
          <div className="bg-[#11141b] border border-white/5 rounded-xl p-4 max-w-[50%] shadow-2xl">
            <p className="text-[11px] text-white/90 font-medium leading-relaxed mb-3 line-clamp-2">
              {activeProject.description}
            </p>
            <div className="flex gap-2">
              {activeProject.liveLink && (
                <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-lg h-7 px-3 text-[9px] font-bold" asChild>
                  <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer">
                    Demo <ArrowRight size={10} className="ml-1" />
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-lg h-7 px-3 text-[9px] font-bold" asChild>
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                  <Github size={10} className="mr-1" /> Code
                </a>
              </Button>
            </div>
          </div>

          {/* Mini Project Stack Navigation */}
          <div className="flex flex-col gap-1 pb-2 pr-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-32 h-8 glass-card border-white/5 bg-white/5 px-2 flex items-center justify-between text-left transition-all hover:bg-white/10 rounded-lg",
                  activeIndex === i ? "border-primary/50 bg-primary/10" : "opacity-40 grayscale"
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
