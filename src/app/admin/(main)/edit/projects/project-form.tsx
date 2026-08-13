
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/lib/definitions';
import { Trash, ChevronRight, FolderKanban } from 'lucide-react';
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
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        id: `new-${Date.now()}`,
        title: '',
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

  const handleProjectChange = (id: string, field: keyof Project, value: string | boolean | string[]) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion type="multiple" className="space-y-4">
          {projects.map((project, index) => (
            <AccordionItem key={project.id} value={project.id} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FolderKanban size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {project.title || `Untitled Project ${index + 1}`}
                    </h3>
                    <div className="text-[10px] text-muted-foreground font-code uppercase tracking-widest flex items-center gap-2 mt-0.5">
                      <span>Project #{index + 1} {project.isVisible ? '// Visible' : '// Hidden'}</span>
                      {project.isFeatured && (
                        <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                          ★ Carousel Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <Switch
                        id={`project-visible-${project.id}`}
                        checked={project.isVisible}
                        onCheckedChange={(checked) => handleProjectChange(project.id, 'isVisible', checked)}
                      />
                      <Label htmlFor={`project-visible-${project.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visibility Status</Label>
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
              </AccordionContent>
            </AccordionItem>
          ))}
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
