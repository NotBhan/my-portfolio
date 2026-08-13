import { getProjects } from '@/lib/data';
import Image from 'next/image';
import { ExternalLink, Github, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const visibleProjects = projects.filter(p => p.isVisible);

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
          <FolderKanban size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Full Project Gallery</h1>
          <p className="text-sm text-muted-foreground font-medium">An exhaustive list of my builds, tools, and prototypes.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-20">
        {visibleProjects.map((project) => (
          <div key={project.id} className="bento-card flex flex-col md:flex-row overflow-hidden group min-h-[220px] bg-card/30 hover:bg-card/60 transition-colors">
            {/* Image Section - Compact & Horizontal */}
            <div className="relative w-full md:w-[320px] h-52 md:h-auto shrink-0 overflow-hidden border-r border-border/50">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="project screenshot"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:hidden" />
            </div>
            
            {/* Content Section */}
            <div className="p-8 flex flex-col flex-1 justify-center gap-5">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-foreground uppercase tracking-tight">{project.title}</h2>
                    {project.subtitle && (
                      <span className="text-[10px] font-code text-primary uppercase font-bold tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">
                        {project.subtitle}
                      </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2 max-w-2xl">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map(tech => (
                  <Badge key={tech} variant="secondary" className="text-[9px] bg-muted/50 border-border text-muted-foreground uppercase font-bold tracking-wider px-2.5">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-6 pt-2">
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Live Demo <ExternalLink size={12} className="ml-1.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                )}
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group/link"
                >
                  Source Code <Github size={12} className="ml-1.5 transition-transform group-hover/link:scale-110" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}