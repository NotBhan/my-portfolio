'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { Skill, SkillCategory } from '@/lib/definitions';
import { Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SkillsForm({ skills: initialSkills }: { skills: SkillCategory[] }) {
  const [skillData, setSkillData] = useState<SkillCategory[]>(initialSkills);
  const { toast } = useToast();
  const router = useRouter();

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
    value: string | number | boolean
  ) => {
    const newData = [...skillData];
    const skill = newData[catIndex].skills[skillIndex];
    (skill[field] as string | number | boolean) = value;
    setSkillData(newData);
  };

  const handleAddSkill = (catIndex: number) => {
    const newData = [...skillData];
    newData[catIndex].skills.push({ name: 'New Skill', level: 50, isVisible: true });
    setSkillData(newData);
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    const newData = [...skillData];
    newData[catIndex].skills.splice(skillIndex, 1);
    setSkillData(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {skillData.map((category, catIndex) => (
        <div key={`category-${catIndex}`} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`category-name-${catIndex}`} className="text-lg font-semibold">
              Category
            </Label>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveCategory(catIndex)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Input
            id={`category-name-${catIndex}`}
            value={category.category}
            onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
            className="mt-2"
          />

          <div className="mt-4 space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div key={`skill-${catIndex}-${skillIndex}`} className="ml-4 space-y-2 rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`skill-name-${catIndex}-${skillIndex}`}>Skill Name</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`skill-visible-${catIndex}-${skillIndex}`}
                      checked={skill.isVisible}
                      onCheckedChange={(checked) =>
                        handleSkillChange(catIndex, skillIndex, 'isVisible', checked)
                      }
                    />
                    <Label htmlFor={`skill-visible-${catIndex}-${skillIndex}`}>Visible</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleRemoveSkill(catIndex, skillIndex)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  id={`skill-name-${catIndex}-${skillIndex}`}
                  value={skill.name}
                  onChange={(e) => handleSkillChange(catIndex, skillIndex, 'name', e.target.value)}
                />
                <Label htmlFor={`skill-level-${catIndex}-${skillIndex}`}>Skill Level: {skill.level}%</Label>
                <Slider
                  id={`skill-level-${catIndex}-${skillIndex}`}
                  min={0}
                  max={100}
                  step={1}
                  value={[skill.level]}
                  onValueChange={(value) => handleSkillChange(catIndex, skillIndex, 'level', value[0])}
                />
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => handleAddSkill(catIndex)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </div>
      ))}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleAddCategory}>
          Add Category
        </Button>
        <Button type="submit">Save All Skills</Button>
      </div>
    </form>
  );
}
