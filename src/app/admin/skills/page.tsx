'use client';

import { getSkills as fetchSkills } from '@/lib/data.client';
import { updateSkills } from '@/lib/actions';
import { SkillCategory } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Save, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SkillsPage() {
  const [skillData, setSkillData] = useState<SkillCategory[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function loadSkills() {
      const data = await fetchSkills();
      setSkillData(data);
    }
    loadSkills();
  }, []);

  const handleCategoryChange = (catIndex: number, newName: string) => {
    const newData = [...skillData];
    newData[catIndex].category = newName;
    setSkillData(newData);
  };

  const handleSkillChange = (catIndex: number, skillIndex: number, field: 'name' | 'level', value: string | number) => {
    const newData = [...skillData];
    if (field === 'level') {
      newData[catIndex].skills[skillIndex][field] = Math.max(0, Math.min(100, Number(value)));
    } else {
      newData[catIndex].skills[skillIndex][field] = value as string;
    }
    setSkillData(newData);
  };
  
  const addCategory = () => {
    setSkillData([...skillData, { category: 'New Category', skills: [] }]);
  };
  
  const removeCategory = (catIndex: number) => {
    setSkillData(skillData.filter((_, i) => i !== catIndex));
  };
  
  const addSkill = (catIndex: number) => {
    const newData = [...skillData];
    newData[catIndex].skills.push({ name: 'New Skill', level: 50 });
    setSkillData(newData);
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const newData = [...skillData];
    newData[catIndex].skills = newData[catIndex].skills.filter((_, i) => i !== skillIndex);
    setSkillData(newData);
  };

  const handleSave = async () => {
    await updateSkills(skillData);
    toast({
        title: 'Success!',
        description: 'Skills have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Skills</CardTitle>
        <CardDescription>Add, edit, or remove skill categories and individual skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillData.map((category, catIndex) => (
          <div key={catIndex} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={category.category}
                onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                className="text-lg font-bold"
              />
              <Button variant="ghost" size="icon" onClick={() => removeCategory(catIndex)}>
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex items-center gap-4">
                <Input
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(catIndex, skillIndex, 'name', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Level"
                  value={skill.level}
                  onChange={(e) => handleSkillChange(catIndex, skillIndex, 'level', e.target.value)}
                  className="w-24"
                />
                 <Button variant="ghost" size="icon" onClick={() => removeSkill(catIndex, skillIndex)}>
                    <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addSkill(catIndex)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addCategory}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save All Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
