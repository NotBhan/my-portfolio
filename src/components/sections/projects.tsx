'use client';
import { cn, optimizeImageUrl } from '@/lib/utils';
import { FolderKanban, Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/definitions';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/data?file=projects.json');
        const data = await response.json();
        if (Array.isArray(data)) {
          const visible = data.filter((p: Project) => p.isVisible);
          const featured = visible.filter((p: Project) => p.isFeatured);
          // Display only 3 chosen projects via admin (fallback to first 3 visible if none marked)
          const selectedProjects = (featured.length > 0 ? featured : visible).slice(0, 3);
          setProjects(selectedProjects);
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
      <div className="bento-card flex items-center justify-center h-[372px]">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <FolderKanban className="text-muted-foreground w-10 h-10" />
          <span className="text-[10px] font-code text-muted-foreground uppercase tracking-widest font-bold">Initializing...</span>
        </div>
      </div>
    );
  }

  if (!activeProject) return null;

  return (
    <div className="bento-card p-0 flex flex-col relative h-[372px] group" id="projects">
      {/* Upper-left overlay heading with backdrop blur */}
      <div className="absolute top-[16px] left-[16px] z-20 bg-card/90 backdrop-blur-xl border border-border/80 rounded-[14px] px-3.5 py-2 shadow-lg space-y-0.5 max-w-[calc(100%-32px)]">
        <div className="flex items-center gap-1.5">
          <FolderKanban size={13} className="text-primary/90" />
          <span className="text-[9px] font-code text-primary uppercase tracking-[0.25em] font-black">Featured Production</span>
        </div>
        <h3 className="text-[18px] sm:text-[20px] font-black text-foreground uppercase tracking-tight leading-snug truncate">
          {activeProject.title}
        </h3>
      </div>

      <div className="flex-1 relative">
        <Image 
          src={optimizeImageUrl(activeProject.image)} 
          alt={activeProject.title} 
          fill 
          className="object-cover transition-all duration-1000 group-hover:scale-105 z-0 opacity-80 dark:opacity-60" 
          priority
          data-ai-hint="project screenshot"
        />
        
        {/* The Nested Info Card */}
        <div className="absolute bottom-[12px] left-[12px] z-[4] bg-card/95 backdrop-blur-xl border border-border rounded-[16px] p-4 w-[calc(100%-24px)] md:w-[60%] lg:w-[46%] min-h-[78px] shadow-2xl flex flex-col justify-center gap-4">
          <p className="text-[12px] text-foreground font-medium leading-relaxed line-clamp-2">
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
            <Button variant="outline" size="sm" className="bg-muted/50 border-border hover:bg-muted rounded-xl h-8 px-4 text-[10px] font-bold tracking-wide" asChild>
              <a href={activeProject.link} target="_blank" rel="noopener noreferrer">
                SOURCE <Github size={10} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Vertical Project Stack Navigation */}
        <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-1.5 w-[145px] hidden sm:flex">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-[34px] px-3 flex items-center justify-between text-left transition-all rounded-[10px] backdrop-blur-xl border shadow-md",
                activeIndex === i 
                  ? "bg-primary text-white border-primary -translate-x-2 shadow-lg shadow-primary/25 font-black" 
                  : "bg-card/95 border-border/80 text-foreground hover:bg-card hover:border-primary/50 hover:text-primary font-bold"
              )}
            >
              <span className="text-[9px] uppercase truncate tracking-wide">{p.title}</span>
              <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", activeIndex === i ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" : "bg-muted-foreground/40")} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}