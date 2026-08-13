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
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <FolderKanban size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Full Project Gallery</h1>
          <p className="text-sm text-muted-foreground font-medium">An exhaustive list of my builds, tools, and prototypes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {visibleProjects.map((project) => (
          <div key={project.id} className="bento-card flex flex-col overflow-hidden group">
            <div className="relative h-56 overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="project screenshot"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-xl font-black text-white uppercase tracking-tight">{project.title}</h2>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 gap-4 bg-card/95">
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies?.map(tech => (
                  <Badge key={tech} variant="secondary" className="text-[10px] bg-muted/50 border-border text-muted-foreground uppercase font-bold tracking-wider">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                {project.liveLink && (
                  <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-xl flex-1" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} className="mr-2" /> Live Demo
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" className="bg-muted/50 border-border hover:bg-muted text-foreground rounded-xl flex-1" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github size={14} className="mr-2" /> Source
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