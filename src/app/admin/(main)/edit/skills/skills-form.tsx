
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { Skill, SkillCategory } from '@/lib/definitions';
import { Plus, Trash, Terminal, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function SkillsForm({ skills: initialSkills }: { skills: SkillCategory[] }) {
  const [skillData, setSkillData] = useState<SkillCategory[]>(initialSkills);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCategoryChange = (catIndex: number, value: string) => {
    const newData = [...skillData];
    newData[catIndex].category = value;
    setSkillData(newData);
  };

  const handleAddCategory = () => {
    setSkillData([...skillData, { category: 'New Category', skills: [] }]);
  };

  const handleRemoveCategory = (catIndex: number) => {
    setSkillData(skillData.filter((_, i) => i !== catIndex));
  };

  const handleSkillChange = (
    catIndex: number,
    skillIndex: number,
    field: keyof Skill,
    value: string | boolean
  ) => {
    const newData = [...skillData];
    const skill = newData[catIndex].skills[skillIndex];
    (skill[field] as any) = value;
    setSkillData(newData);
  };

  const handleAddSkill = (catIndex: number) => {
    const newData = [...skillData];
    newData[catIndex].skills.push({ name: 'New Skill', isVisible: true });
    setSkillData(newData);
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    const newData = [...skillData];
    newData[catIndex].skills.splice(skillIndex, 1);
    setSkillData(newData);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/data?file=skills.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });
      if (!response.ok) throw new Error('Failed to save skills.');
      toast({ title: 'Success', description: 'Skills saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save skills. Please try again.',
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
          {skillData.map((category, catIndex) => (
            <AccordionItem key={`category-${catIndex}`} value={`cat-${catIndex}`} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Terminal size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {category.category || `Category ${catIndex + 1}`}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-code uppercase tracking-widest">
                      {category.skills.length} technical skills configured
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                  <div className="flex-1 max-w-sm space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category Title</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-10"
                      value={category.category}
                      onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest mt-4"
                    onClick={() => handleRemoveCategory(catIndex)}
                  >
                    <Trash className="h-3 w-3 mr-2" /> Delete Group
                  </Button>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                     <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Managed Skills</Label>
                     <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-lg text-[9px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5"
                        onClick={() => handleAddSkill(catIndex)}
                      >
                        <Plus className="mr-1.5 h-3 w-3" /> Add Item
                      </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={`skill-${catIndex}-${skillIndex}`} className="p-3 rounded-xl bg-background/50 border border-border/50 space-y-3 group hover:border-primary/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`skill-visible-${catIndex}-${skillIndex}`}
                              checked={skill.isVisible}
                              onCheckedChange={(checked) =>
                                handleSkillChange(catIndex, skillIndex, 'isVisible', checked)
                              }
                            />
                            <Label htmlFor={`skill-visible-${catIndex}-${skillIndex}`} className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Active</Label>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveSkill(catIndex, skillIndex)}
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                        <Input
                          className="bg-background border-border/50 h-8 text-xs rounded-lg"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(catIndex, skillIndex, 'name', e.target.value)}
                          placeholder="Skill name"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddCategory} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            New Category
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
