'use client';

import { getStats as fetchStats } from '@/lib/data.client';
import { updateStats } from '@/lib/actions';
import { Stat } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Save, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function loadStats() {
      const data = await fetchStats();
      setStats(data);
    }
    loadStats();
  }, []);

  const handleStatChange = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };
  
  const addStat = () => {
    setStats([...stats, { id: Date.now().toString(), label: 'New Stat', value: '0', icon: 'Star' }]);
  };
  
  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    await updateStats(stats);
    toast({
        title: 'Success!',
        description: 'Stats have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Stats</CardTitle>
        <CardDescription>Add, edit, or remove stats for the hero section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.map((stat, index) => (
          <div key={stat.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Value</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Icon</Label>
                <Input
                  value={stat.icon}
                  onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                  placeholder="e.g., Briefcase"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeStat(index)}>
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </div>
             <p className="text-xs text-muted-foreground">
                Enter any icon name from{' '}
                <a
                    href="https://lucide.dev/icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    lucide.dev
                </a>
                .
            </p>
          </div>
        ))}
        <Button variant="outline" onClick={addStat}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Stat
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
