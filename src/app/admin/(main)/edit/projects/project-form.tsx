
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/lib/definitions';
import { Trash, FolderKanban, ArrowUp, ArrowDown, Star, Sparkles, X, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProjectForm({ projects: initialProjects }: { projects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [newTechInputs, setNewTechInputs] = useState<{ [id: string]: string }>({});
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAddProject = () => {
    const newId = `new-${Date.now()}`;
    setProjects([
      ...projects,
      {
        id: newId,
        title: '',
        subtitle: '',
        description: '',
        image: 'https://picsum.photos/seed/placeholder/400/250',
        link: '',
        liveLink: '',
        isVisible: true,
        isFeatured: false,
        technologies: [],
      },
    ]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleProjectChange = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleMoveUp = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index <= 0) return;
    const newProjects = [...projects];
    const temp = newProjects[index - 1];
    newProjects[index - 1] = newProjects[index];
    newProjects[index] = temp;
    setProjects(newProjects);
  };

  const handleMoveDown = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index >= projects.length - 1) return;
    const newProjects = [...projects];
    const temp = newProjects[index + 1];
    newProjects[index + 1] = newProjects[index];
    newProjects[index] = temp;
    setProjects(newProjects);
  };

  const handleMoveFeaturedUp = (id: string) => {
    const featuredIndices: number[] = [];
    projects.forEach((p, idx) => {
      if (p.isFeatured) featuredIndices.push(idx);
    });

    const currentFeaturedPos = featuredIndices.findIndex(idx => projects[idx].id === id);
    if (currentFeaturedPos <= 0) return;

    const prevProjIdx = featuredIndices[currentFeaturedPos - 1];
    const currProjIdx = featuredIndices[currentFeaturedPos];

    const newProjects = [...projects];
    const temp = newProjects[prevProjIdx];
    newProjects[prevProjIdx] = newProjects[currProjIdx];
    newProjects[currProjIdx] = temp;
    setProjects(newProjects);
  };

  const handleMoveFeaturedDown = (id: string) => {
    const featuredIndices: number[] = [];
    projects.forEach((p, idx) => {
      if (p.isFeatured) featuredIndices.push(idx);
    });

    const currentFeaturedPos = featuredIndices.findIndex(idx => projects[idx].id === id);
    if (currentFeaturedPos < 0 || currentFeaturedPos >= featuredIndices.length - 1) return;

    const currProjIdx = featuredIndices[currentFeaturedPos];
    const nextProjIdx = featuredIndices[currentFeaturedPos + 1];

    const newProjects = [...projects];
    const temp = newProjects[nextProjIdx];
    newProjects[nextProjIdx] = newProjects[currProjIdx];
    newProjects[currProjIdx] = temp;
    setProjects(newProjects);
  };

  const handleAddTech = (projectId: string) => {
    const techName = (newTechInputs[projectId] || '').trim();
    if (!techName) return;

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const existingTechs = project.technologies || [];
    if (!existingTechs.includes(techName)) {
      handleProjectChange(projectId, 'technologies', [...existingTechs, techName]);
    }
    setNewTechInputs({ ...newTechInputs, [projectId]: '' });
  };

  const handleRemoveTech = (projectId: string, techToRemove: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    handleProjectChange(
      projectId,
      'technologies',
      (project.technologies || []).filter(t => t !== techToRemove)
    );
  };

  const handleSave = async () => {
    const projectsWithIds = projects.map((p, index) => ({
      ...p,
      id: p.id.startsWith('new-') ? `${index + 1}` : p.id,
    }));

    try {
      const response = await fetch('/api/data?file=projects.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectsWithIds),
      });
      if (!response.ok) throw new Error('Failed to save projects.');
      toast({ title: 'Success', description: 'Projects saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save projects. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    setIsVerifying(true);
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Incorrect password.');
      }

      const { success } = await response.json();
      if (success) {
        setIsPasswordDialogOpen(false);
        await handleSave();
      } else {
        throw new Error('Incorrect password.');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Password verification failed.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Featured Project Carousel Management Card */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-primary fill-primary/30" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">
                Featured Carousel Order (Homepage // Max 3)
              </span>
            </div>
            <span className="text-[9px] font-code font-bold uppercase tracking-widest text-muted-foreground">
              {featuredProjects.length}/3 Slots Used
            </span>
          </div>

          {featuredProjects.length === 0 ? (
            <p className="text-[11px] text-muted-foreground italic py-2">
              No projects currently marked as featured. Toggle "Featured on Carousel" on any project below.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {featuredProjects.map((fp, fIdx) => (
                <div
                  key={`feat-${fp.id}`}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-card/80 border border-border text-xs shadow-sm"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[8px] font-code font-black uppercase bg-primary text-primary-foreground px-1.5 py-0.2 rounded">
                        Slot #{fIdx + 1}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-foreground truncate uppercase">
                      {fp.title || 'Untitled'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded hover:bg-primary/20 text-muted-foreground hover:text-primary"
                      disabled={fIdx === 0}
                      onClick={() => handleMoveFeaturedUp(fp.id)}
                      title="Move Up in Carousel"
                    >
                      <ArrowUp size={12} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded hover:bg-primary/20 text-muted-foreground hover:text-primary"
                      disabled={fIdx === featuredProjects.length - 1}
                      onClick={() => handleMoveFeaturedDown(fp.id)}
                      title="Move Down in Carousel"
                    >
                      <ArrowDown size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Full Project List with Reordering Controls */}
        <div className="flex items-center justify-between pt-2">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            All Projects ({projects.length}) — Order for Gallery Page
          </Label>
          <span className="text-[9px] font-code text-muted-foreground">
            Use ▲ ▼ buttons to reorder gallery display sequence
          </span>
        </div>

        <Accordion type="multiple" className="space-y-3">
          {projects.map((project, index) => {
            const featuredPos = featuredProjects.findIndex(p => p.id === project.id);

            return (
              <AccordionItem
                key={project.id}
                value={project.id}
                className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4"
              >
                <div className="flex items-center justify-between py-2">
                  <AccordionTrigger className="hover:no-underline py-2 flex-1">
                    <div className="flex items-center gap-3 text-left min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <FolderKanban size={14} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-black uppercase tracking-wider text-foreground truncate">
                          {project.title || `Untitled Project ${index + 1}`}
                        </h3>
                        <div className="text-[10px] text-muted-foreground font-code uppercase tracking-widest flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="bg-muted px-1.5 py-0.5 rounded text-[9px] font-bold text-foreground">
                            #{index + 1}
                          </span>
                          <span>{project.isVisible ? '// Visible' : '// Hidden'}</span>
                          {project.isFeatured && (
                            <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 flex items-center gap-1">
                              ★ Carousel Slot #{featuredPos + 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  {/* Reordering Controls Right on Item Header */}
                  <div className="flex items-center gap-1 pl-2 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary border-border/60"
                      disabled={index === 0}
                      onClick={(e) => handleMoveUp(index, e)}
                      title="Move Up in Gallery Order"
                    >
                      <ArrowUp size={13} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary border-border/60"
                      disabled={index === projects.length - 1}
                      onClick={(e) => handleMoveDown(index, e)}
                      title="Move Down in Gallery Order"
                    >
                      <ArrowDown size={13} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-3">
                        <Switch
                          id={`project-visible-${project.id}`}
                          checked={project.isVisible}
                          onCheckedChange={(checked) => handleProjectChange(project.id, 'isVisible', checked)}
                        />
                        <Label htmlFor={`project-visible-${project.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          Visibility Status
                        </Label>
                      </div>

                      <div className="flex items-center gap-3">
                        <Switch
                          id={`project-featured-${project.id}`}
                          checked={!!project.isFeatured}
                          onCheckedChange={(checked) => {
                            const featuredCount = projects.filter((p) => p.isFeatured && p.id !== project.id).length;
                            if (checked && featuredCount >= 3) {
                              toast({
                                title: 'Limit Reached',
                                description: 'Maximum 3 projects can be featured on the homepage carousel.',
                                variant: 'destructive',
                              });
                              return;
                            }
                            handleProjectChange(project.id, 'isFeatured', checked);
                          }}
                        />
                        <Label htmlFor={`project-featured-${project.id}`} className="text-[10px] font-black uppercase tracking-widest text-primary">
                          Featured on Carousel (Max 3)
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                      onClick={() => handleRemoveProject(project.id)}
                    >
                      <Trash className="h-3 w-3 mr-2" /> Delete Project
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
                      <Input
                        className="bg-background/50 rounded-xl h-11"
                        value={project.title}
                        onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                        placeholder="Project Title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subtitle / Tagline</Label>
                      <Input
                        className="bg-background/50 rounded-xl h-11"
                        value={project.subtitle || ''}
                        onChange={(e) => handleProjectChange(project.id, 'subtitle', e.target.value)}
                        placeholder="e.g. AI Study Platform"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                    <Textarea
                      className="bg-background/50 rounded-xl min-h-[100px] resize-none"
                      value={project.description}
                      onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                      placeholder="Describe the technical challenges and outcomes..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL</Label>
                      <Input
                        className="bg-background/50 rounded-xl h-10"
                        value={project.image}
                        onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)}
                        placeholder="Direct image link"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Live Link</Label>
                      <Input
                        className="bg-background/50 rounded-xl h-10"
                        value={project.liveLink || ''}
                        onChange={(e) => handleProjectChange(project.id, 'liveLink', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Source Code URL</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-10"
                      value={project.link}
                      onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                      placeholder="GitHub repository link"
                    />
                  </div>

                  {/* Technologies / Tags */}
                  <div className="space-y-3 pt-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Technologies & Tools
                    </Label>
                    <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                      {(project.technologies || []).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[9px] bg-muted/60 hover:bg-muted text-foreground uppercase font-bold tracking-wider px-2 py-0.5 flex items-center gap-1.5 rounded-lg border border-border"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTech(project.id, tech)}
                            className="hover:text-destructive transition-colors ml-0.5"
                          >
                            <X size={10} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 max-w-sm">
                      <Input
                        className="bg-background/50 rounded-xl h-9 text-xs"
                        placeholder="Add technology (e.g. Next.js)..."
                        value={newTechInputs[project.id] || ''}
                        onChange={(e) => setNewTechInputs({ ...newTechInputs, [project.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTech(project.id);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider"
                        onClick={() => handleAddTech(project.id)}
                      >
                        <Plus size={12} className="mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddProject} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            New Production
          </Button>
          <Button type="submit" className="h-11 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
            Sync Changes
          </Button>
        </div>
      </form>
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onConfirm={handlePasswordConfirm}
        isVerifying={isVerifying}
      />
    </>
  );
}

