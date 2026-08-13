
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Activity } from '@/lib/definitions';
import { Trash, Zap, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ActivitiesForm({ activities: initialActivities }: { activities: Activity[] }) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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

  const handleSave = async () => {
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
          {activities.map((activity, index) => (
            <AccordionItem key={activity.id} value={activity.id} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Flame size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {activity.title || `Untitled Activity ${index + 1}`}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-code uppercase tracking-widest">
                      {activity.isVisible ? '// Visible' : '// Hidden'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-3">
                      <Switch
                        id={`act-visible-${activity.id}`}
                        checked={activity.isVisible}
                        onCheckedChange={(checked) => handleActivityChange(activity.id, 'isVisible', checked)}
                      />
                      <Label htmlFor={`act-visible-${activity.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visibility Status</Label>
                   </div>
                   <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                    onClick={() => handleRemoveActivity(activity.id)}
                  >
                    <Trash className="h-3 w-3 mr-2" /> Delete Activity
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Activity Title</Label>
                  <Input
                    className="bg-background/50 rounded-xl h-11"
                    value={activity.title}
                    onChange={(e) => handleActivityChange(activity.id, 'title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                  <Textarea
                    className="bg-background/50 rounded-xl min-h-[100px] resize-none"
                    value={activity.description}
                    onChange={(e) => handleActivityChange(activity.id, 'description', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Icon Name (Lucide)</Label>
                  <Input
                    className="bg-background/50 rounded-xl h-10"
                    value={activity.icon}
                    onChange={(e) => handleActivityChange(activity.id, 'icon', e.target.value)}
                    placeholder="e.g., Code, Zap, Heart"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddActivity} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            Add Engagement
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
