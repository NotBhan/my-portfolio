'use client';
import { FolderKanban, Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/definitions';
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
          <FolderKanban className="text-muted-foreground w-6 h-6" />
          <span className="text-[8px] font-code text-muted-foreground uppercase tracking-widest">Loading...</span>
        </div>
      </div>
    );
  }

  if (!activeProject) return null;

  return (
    <div className="bento-card p-0 flex flex-col relative h-full group carve-top-right carve-bottom-left-nested" id="projects">
      {/* Upper-left structural heading */}
      <div className="absolute top-5 left-5 z-20 space-y-0.5">
        <div className="flex items-center gap-2 mb-0.5">
          <FolderKanban size={10} className="text-primary/70" />
          <span className="text-[7px] font-code text-primary uppercase tracking-[0.2em] font-bold">Featured Production</span>
        </div>
        <h3 className="text-[14px] font-black text-white leading-none">{activeProject.title}</h3>
      </div>

      <div className="flex-1 relative">
        <Image 
          src={activeProject.image} 
          alt={activeProject.title} 
          fill 
          className="object-cover transition-all duration-700 group-hover:scale-105 z-0 opacity-40 group-hover:opacity-60" 
          data-ai-hint="project screenshot"
        />
        
        {/* The Nested Info Card - Physically Carved Into Corner */}
        <div className="absolute bottom-[10px] left-[10px] z-30 bg-[#11141b]/95 backdrop-blur-md border border-white/5 rounded-[13px] p-3 w-[min(430px,52%)] min-h-[70px] max-h-[85px] shadow-2xl flex flex-col justify-center gap-2">
          <p className="text-[8px] text-white/90 font-medium leading-relaxed line-clamp-2">
              {activeProject.description}
          </p>
          <div className="flex gap-2">
            {activeProject.liveLink && (
              <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-lg h-5 px-2 text-[7px] font-bold" asChild>
                <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer">
                  LIVE DEMO <ExternalLink size={7} className="ml-1" />
                </a>
              </Button>
            )}
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-lg h-5 px-2 text-[7px] font-bold" asChild>
              <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                SOURCE <Github size={7} className="ml-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Mini Project Stack Navigation - Lower Right Selector */}
        <div className="absolute right-3 bottom-3 z-30 flex flex-col gap-1 w-[135px]">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-6 glass-card border-white/5 bg-white/5 px-2.5 flex items-center justify-between text-left transition-all hover:bg-white/10 rounded-[8px] backdrop-blur-md",
                activeIndex === i ? "border-primary/50 bg-primary/20 -translate-x-2" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
              )}
            >
              <span className="text-[7px] font-bold text-white uppercase truncate">{p.title}</span>
              <div className={cn("w-0.5 h-0.5 rounded-full", activeIndex === i ? "bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]" : "bg-white/20")} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}