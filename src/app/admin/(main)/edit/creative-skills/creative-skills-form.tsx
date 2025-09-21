'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { CreativeSkill } from '@/lib/definitions';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreativeSkillsForm({ creativeSkills: initialSkills }: { creativeSkills: CreativeSkill[] }) {
  const [skills, setSkills] = useState<CreativeSkill[]>(initialSkills);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddSkill = () => {
    setSkills([
      ...skills,
      {
        id: `new-${Date.now()}`,
        name: '',
      },
    ]);
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleSkillChange = (id: string, value: string) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, name: value } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Skill {index + 1}</h3>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveSkill(skill.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`skill-name-${skill.id}`}>Name</Label>
              <Input
                id={`skill-name-${skill.id}`}
                value={skill.name}
                onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                placeholder="Skill Name"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline" onClick={handleAddSkill}>
          Add Skill
        </Button>
        <Button type="submit">Save All Skills</Button>
      </div>
    </form>
  );
}
