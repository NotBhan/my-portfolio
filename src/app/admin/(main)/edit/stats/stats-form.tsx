'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { Stat } from '@/lib/definitions';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StatsForm({ stats: initialStats }: { stats: Stat[] }) {
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddStat = () => {
    setStats([
      ...stats,
      {
        id: `new-${Date.now()}`,
        value: '',
        label: '',
        icon: 'Activity',
        isVisible: true,
      },
    ]);
  };

  const handleRemoveStat = (id: string) => {
    setStats(stats.filter((s) => s.id !== id));
  };

  const handleStatChange = (id: string, field: keyof Stat, value: string | boolean) => {
    setStats(stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const statsWithIds = stats.map((s, index) => ({
      ...s,
      id: s.id.startsWith('new-') ? `${index + 1}` : s.id,
    }));

    try {
      const response = await fetch('/api/data?file=stats.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statsWithIds),
      });
      if (!response.ok) throw new Error('Failed to save stats.');
      toast({ title: 'Success', description: 'Stats saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save stats. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={stat.id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Stat {index + 1}</h3>
              <div className="flex items-center gap-2">
                <Switch
                  id={`stat-visible-${stat.id}`}
                  checked={stat.isVisible}
                  onCheckedChange={(checked) => handleStatChange(stat.id, 'isVisible', checked)}
                />
                <Label htmlFor={`stat-visible-${stat.id}`}>Visible</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveStat(stat.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`stat-value-${stat.id}`}>Value</Label>
              <Input
                id={`stat-value-${stat.id}`}
                value={stat.value}
                onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                placeholder="e.g., 56+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`stat-label-${stat.id}`}>Label</Label>
              <Input
                id={`stat-label-${stat.id}`}
                value={stat.label}
                onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                placeholder="e.g., Projects"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`stat-icon-${stat.id}`}>Icon Name</Label>
              <Input
                id={`stat-icon-${stat.id}`}
                value={stat.icon}
                onChange={(e) => handleStatChange(stat.id, 'icon', e.target.value)}
                placeholder="e.g., Briefcase (from lucide-react)"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline" onClick={handleAddStat}>
          Add Stat
        </Button>
        <Button type="submit">Save All Stats</Button>
      </div>
    </form>
  );
}
