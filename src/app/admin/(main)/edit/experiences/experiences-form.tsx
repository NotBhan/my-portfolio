
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Experience } from '@/lib/definitions';
import { Trash, History, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion type="multiple" className="space-y-4">
          {experiences.map((experience, index) => (
            <AccordionItem key={experience.id} value={experience.id} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <History size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {experience.title || `Untitled Role ${index + 1}`}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-code uppercase tracking-widest">
                      {experience.company || 'Unknown Company'} {experience.isVisible ? '// Active' : '// Hidden'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-3">
                      <Switch
                        id={`exp-visible-${experience.id}`}
                        checked={experience.isVisible}
                        onCheckedChange={(checked) => handleExperienceChange(experience.id, 'isVisible', checked)}
                      />
                      <Label htmlFor={`exp-visible-${experience.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visibility Status</Label>
                   </div>
                   <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                    onClick={() => handleRemoveExperience(experience.id)}
                  >
                    <Trash className="h-3 w-3 mr-2" /> Delete Role
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Job Title</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={experience.title}
                      onChange={(e) => handleExperienceChange(experience.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Company</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={experience.company}
                      onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Duration</Label>
                  <div className="relative">
                    <Input
                      className="bg-background/50 rounded-xl h-11 pl-10"
                      value={experience.duration}
                      onChange={(e) => handleExperienceChange(experience.id, 'duration', e.target.value)}
                      placeholder="e.g., Jan 2022 - Present"
                    />
                    <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Responsibilities</Label>
                  <Textarea
                    className="bg-background/50 rounded-xl min-h-[100px] resize-none"
                    value={experience.description}
                    onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddExperience} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            Log New Milestone
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
