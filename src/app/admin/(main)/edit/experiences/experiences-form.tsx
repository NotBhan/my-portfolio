
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Experience } from '@/lib/definitions';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';

export default function ExperiencesForm({ experiences: initialExperiences }: { experiences: Experience[] }) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: `new-${Date.now()}`,
        title: '',
        company: '',
        duration: '',
        description: '',
        isVisible: true,
      },
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter((p) => p.id !== id));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSave = async () => {
    const experiencesWithIds = experiences.map((p, index) => ({
      ...p,
      id: p.id.startsWith('new-') ? `${index + 1}` : p.id,
    }));

    try {
      const response = await fetch('/api/data?file=experiences.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experiencesWithIds),
      });
      if (!response.ok) throw new Error('Failed to save experiences.');
      toast({ title: 'Success', description: 'Experiences saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save experiences. Please try again.',
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
          {experiences.map((experience, index) => (
            <div key={experience.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`experience-visible-${experience.id}`}
                    checked={experience.isVisible}
                    onCheckedChange={(checked) => handleExperienceChange(experience.id, 'isVisible', checked)}
                  />
                  <Label htmlFor={`experience-visible-${experience.id}`}>Visible</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveExperience(experience.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`experience-title-${experience.id}`}>Title</Label>
                <Input
                  id={`experience-title-${experience.id}`}
                  value={experience.title}
                  onChange={(e) => handleExperienceChange(experience.id, 'title', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`experience-company-${experience.id}`}>Company</Label>
                <Input
                  id={`experience-company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`experience-duration-${experience.id}`}>Duration</Label>
                <Input
                  id={`experience-duration-${experience.id}`}
                  value={experience.duration}
                  onChange={(e) => handleExperienceChange(experience.id, 'duration', e.target.value)}
                  placeholder="e.g., Jan 2022 - Present"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`experience-desc-${experience.id}`}>Description</Label>
                <Textarea
                  id={`experience-desc-${experience.id}`}
                  value={experience.description}
                  onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                  placeholder="Job Description"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={handleAddExperience}>
            Add Experience
          </Button>
          <Button type="submit">Save All Experiences</Button>
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
