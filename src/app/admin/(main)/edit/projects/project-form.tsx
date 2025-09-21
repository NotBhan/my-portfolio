
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/lib/definitions';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';

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
      },
    ]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleProjectChange = (id: string, field: keyof Project, value: string | boolean) => {
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`project-visible-${project.id}`}
                    checked={project.isVisible}
                    onCheckedChange={(checked) => handleProjectChange(project.id, 'isVisible', checked)}
                  />
                  <Label htmlFor={`project-visible-${project.id}`}>Visible</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveProject(project.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-title-${project.id}`}>Title</Label>
                <Input
                  id={`project-title-${project.id}`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                  placeholder="Project Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-desc-${project.id}`}>Description</Label>
                <Textarea
                  id={`project-desc-${project.id}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                  placeholder="Project Description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-image-${project.id}`}>Image URL</Label>
                <Input
                  id={`project-image-${project.id}`}
                  value={project.image}
                  onChange={(e) => handleProjectChange(project.id, 'image', e.target.value)}
                  placeholder="Image URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-link-${project.id}`}>Source Code URL</Label>
                <Input
                  id={`project-link-${project.id}`}
                  value={project.link}
                  onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-live-link-${project.id}`}>Live Link</Label>
                <Input
                  id={`project-live-link-${project.id}`}
                  value={project.liveLink || ''}
                  onChange={(e) => handleProjectChange(project.id, 'liveLink', e.target.value)}
                  placeholder="https://vercel.app/..."
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={handleAddProject}>
            Add Project
          </Button>
          <Button type="submit">Save All Projects</Button>
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
