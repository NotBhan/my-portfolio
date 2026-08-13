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
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
          <FolderKanban size={20} />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground uppercase tracking-tight">Full Project Gallery</h1>
          <p className="text-[11px] text-muted-foreground font-medium">An exhaustive list of my builds, tools, and prototypes.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-12">
        {visibleProjects.map((project) => (
          <div key={project.id} className="bento-card flex flex-col md:flex-row overflow-hidden group min-h-[160px] bg-card/30 hover:bg-card/60 transition-colors">
            {/* Image Section - Compact & Horizontal */}
            <div className="relative w-full md:w-[220px] h-40 md:h-auto shrink-0 overflow-hidden border-r border-border/50">
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
            <div className="p-5 flex flex-col flex-1 justify-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h2 className="text-base font-black text-foreground uppercase tracking-tight">{project.title}</h2>
                    {project.subtitle && (
                      <span className="text-[9px] font-code text-primary uppercase font-bold tracking-widest bg-primary/10 px-1.5 py-0.5 rounded-md">
                        {project.subtitle}
                      </span>
                    )}
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed font-medium line-clamp-2 max-w-2xl">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {project.technologies?.slice(0, 5).map(tech => (
                  <Badge key={tech} variant="secondary" className="text-[8px] bg-muted/50 border-border text-muted-foreground uppercase font-bold tracking-wider px-2 py-0">
                    {tech}
                  </Badge>
                ))}
                {project.technologies?.length > 5 && (
                  <Badge variant="outline" className="text-[8px] border-border text-muted-foreground uppercase font-bold px-2 py-0">
                    +{project.technologies.length - 5} More
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 pt-1">
                {project.liveLink && (
                  <Button variant="default" size="sm" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest rounded-lg" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      Live Demo <ExternalLink size={10} className="ml-1.5" />
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" className="h-7 px-3 text-[9px] font-black uppercase tracking-widest rounded-lg border-border bg-muted/30" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Source <Github size={10} className="ml-1.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
