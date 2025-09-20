'use client';
import {
  createProject,
  deleteProject,
  updateProject,
} from '@/lib/actions';
import { Project } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/data.client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, PlusCircle, Trash } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    }
    fetchProjects();
  }, []);
  
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      link: formData.get('link') as string,
    };

    if (currentProject) {
      await updateProject({ ...projectData, id: currentProject.id });
    } else {
      await createProject(projectData);
    }
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
    setDialogOpen(false);
    setCurrentProject(null);
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
        await deleteProject(id);
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manage Projects</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setCurrentProject(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                <DialogDescription>
                  Fill in the details below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={currentProject?.title} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={currentProject?.description} required />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" name="image" defaultValue={currentProject?.image} placeholder="https://picsum.photos/seed/..." required />
                </div>
                <div>
                  <Label htmlFor="link">Project Link</Label>
                  <Input id="link" name="link" defaultValue={currentProject?.link} required />
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => { setCurrentProject(project); setDialogOpen(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
