
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { CreativeSkill } from '@/lib/definitions';
import { Trash, Brush, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function CreativeSkillsForm({ creativeSkills: initialSkills }: { creativeSkills: CreativeSkill[] }) {
  const [skills, setSkills] = useState<CreativeSkill[]>(initialSkills);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      {
        id: `new-${Date.now()}`,
        name: '',
        isVisible: true,
      },
    ]);
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleSkillChange = (id: string, field: keyof CreativeSkill, value: string | boolean) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    const skillsWithIds = skills.map((s, index) => ({
      ...s,
      id: s.id.startsWith('new-') ? `${index + 1}` : s.id,
    }));

    try {
      const response = await fetch('/api/data?file=creative-skills.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillsWithIds),
      });
      if (!response.ok) throw new Error('Failed to save creative skills.');
      toast({ title: 'Success', description: 'Creative skills saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save creative skills. Please try again.',
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
          {skills.map((skill, index) => (
            <AccordionItem key={skill.id} value={skill.id} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Brush size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {skill.name || `Unnamed Creative Skill ${index + 1}`}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-code uppercase tracking-widest">
                      {skill.isVisible ? '// Visible' : '// Hidden'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-3">
                      <Switch
                        id={`cskill-visible-${skill.id}`}
                        checked={skill.isVisible}
                        onCheckedChange={(checked) => handleSkillChange(skill.id, 'isVisible', checked)}
                      />
                      <Label htmlFor={`cskill-visible-${skill.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Status</Label>
                   </div>
                   <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                    onClick={() => handleRemoveSkill(skill.id)}
                  >
                    <Trash className="h-3 w-3 mr-2" /> Delete Item
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Skill Label</Label>
                  <Input
                    className="bg-background/50 rounded-xl h-11"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddSkill} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            Add Creative Output
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
