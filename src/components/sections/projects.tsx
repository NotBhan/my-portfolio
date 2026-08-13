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
        <div className="animate-pulse flex flex-col items-center gap-3">
          <FolderKanban className="text-muted-foreground w-10 h-10" />
          <span className="text-[10px] font-code text-muted-foreground uppercase tracking-widest font-bold">Initializing...</span>
        </div>
      </div>
    );
  }

  if (!activeProject) return null;

  return (
    <div className="bento-card p-0 flex flex-col relative h-full group carve-top-right" id="projects">
      {/* Background Gradient for Header Readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none" />

      {/* Upper-left overlay heading */}
      <div className="absolute top-[22px] left-[24px] z-20 space-y-1.5">
        <div className="flex items-center gap-2 mb-1">
          <FolderKanban size={14} className="text-primary/90" />
          <span className="text-[9px] font-code text-primary uppercase tracking-[0.25em] font-black">Featured Production</span>
        </div>
        <h3 className="text-[22px] font-black text-white leading-none uppercase tracking-tight">{activeProject.title}</h3>
      </div>

      <div className="flex-1 relative">
        <Image 
          src={activeProject.image} 
          alt={activeProject.title} 
          fill 
          className="object-cover transition-all duration-1000 group-hover:scale-105 z-0 opacity-60 group-hover:opacity-80" 
          priority
          data-ai-hint="project screenshot"
        />
        
        {/* Structural Cut-out behind nested card */}
        <div className="featured-cutout" />

        {/* The Nested Info Card */}
        <div className="absolute bottom-[12px] left-[12px] z-[4] bg-[#11141b]/95 backdrop-blur-xl border border-white/5 rounded-[16px] p-4 w-[46%] min-h-[78px] shadow-2xl flex flex-col justify-center gap-4">
          <p className="text-[12px] text-white/90 font-medium leading-relaxed line-clamp-2">
              {activeProject.description}
          </p>
          <div className="flex gap-3">
            {activeProject.liveLink && (
              <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-xl h-8 px-4 text-[10px] font-bold tracking-wide" asChild>
                <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer">
                  LIVE DEMO <ExternalLink size={10} className="ml-2" />
                </a>
              </Button>
            )}
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-8 px-4 text-[10px] font-bold tracking-wide" asChild>
              <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                SOURCE <Github size={10} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Vertical Project Stack Navigation */}
        <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-1.5 w-[145px]">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-[34px] glass-card border-white/5 bg-white/5 px-3 flex items-center justify-between text-left transition-all hover:bg-white/10 rounded-[10px] backdrop-blur-xl",
                activeIndex === i ? "border-primary/50 bg-primary/20 -translate-x-2" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
              )}
            >
              <span className="text-[9px] font-bold text-white uppercase truncate tracking-wide">{p.title}</span>
              <div className={cn("w-1 h-1 rounded-full", activeIndex === i ? "bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]" : "bg-white/20")} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}