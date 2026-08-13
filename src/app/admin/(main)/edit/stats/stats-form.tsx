
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { Stat } from '@/lib/definitions';
import { Trash, LineChart, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function StatsForm({ stats: initialStats }: { stats: Stat[] }) {
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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

  const handleSave = async () => {
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
          {stats.map((stat, index) => (
            <AccordionItem key={stat.id} value={stat.id} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <LineChart size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {stat.label || `Metric ${index + 1}`}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-code uppercase tracking-widest">
                      {stat.value || '0'} {stat.isVisible ? '// Tracking' : '// Dormant'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-3">
                      <Switch
                        id={`stat-visible-${stat.id}`}
                        checked={stat.isVisible}
                        onCheckedChange={(checked) => handleStatChange(stat.id, 'isVisible', checked)}
                      />
                      <Label htmlFor={`stat-visible-${stat.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Operational Status</Label>
                   </div>
                   <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                    onClick={() => handleRemoveStat(stat.id)}
                  >
                    <Trash className="h-3 w-3 mr-2" /> Reset Metric
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Metric Value</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={stat.value}
                      onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                      placeholder="e.g., 50+"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Label</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={stat.label}
                      onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                      placeholder="e.g., Deployed Projects"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Icon Identifier</Label>
                  <Input
                    className="bg-background/50 rounded-xl h-11"
                    value={stat.icon}
                    onChange={(e) => handleStatChange(stat.id, 'icon', e.target.value)}
                    placeholder="e.g., Rocket, Users"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddStat} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            New Performance Indicator
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
