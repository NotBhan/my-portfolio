'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Activity } from '@/lib/definitions';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ActivitiesForm({ activities: initialActivities }: { activities: Activity[] }) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        id: `new-${Date.now()}`,
        title: '',
        description: '',
        icon: 'Flame',
        isVisible: true,
      },
    ]);
  };

  const handleRemoveActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleActivityChange = (id: string, field: keyof Activity, value: string | boolean) => {
    setActivities(activities.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const activitiesWithIds = activities.map((a, index) => ({
      ...a,
      id: a.id.startsWith('new-') ? `${index + 1}` : a.id,
    }));

    try {
      const response = await fetch('/api/data?file=activities.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activitiesWithIds),
      });
      if (!response.ok) throw new Error('Failed to save activities.');
      toast({ title: 'Success', description: 'Activities saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save activities. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Activity {index + 1}</h3>
              <div className="flex items-center gap-2">
                <Switch
                  id={`activity-visible-${activity.id}`}
                  checked={activity.isVisible}
                  onCheckedChange={(checked) => handleActivityChange(activity.id, 'isVisible', checked)}
                />
                <Label htmlFor={`activity-visible-${activity.id}`}>Visible</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveActivity(activity.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`activity-title-${activity.id}`}>Title</Label>
              <Input
                id={`activity-title-${activity.id}`}
                value={activity.title}
                onChange={(e) => handleActivityChange(activity.id, 'title', e.target.value)}
                placeholder="Activity Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`activity-desc-${activity.id}`}>Description</Label>
              <Textarea
                id={`activity-desc-${activity.id}`}
                value={activity.description}
                onChange={(e) => handleActivityChange(activity.id, 'description', e.target.value)}
                placeholder="Activity Description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`activity-icon-${activity.id}`}>Icon Name</Label>
              <Input
                id={`activity-icon-${activity.id}`}
                value={activity.icon}
                onChange={(e) => handleActivityChange(activity.id, 'icon', e.target.value)}
                placeholder="e.g., Flame (from lucide-react)"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline" onClick={handleAddActivity}>
          Add Activity
        </Button>
        <Button type="submit">Save All Activities</Button>
      </div>
    </form>
  );
}
