
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Profile } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import { Save, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ProfileForm({ profile: initialProfile }: { profile: Profile }) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleProfileChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/data?file=profile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error('Failed to save profile.');
      toast({ title: 'Success', description: 'Profile saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save profile. Please try again.',
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Name</Label>
            <Input
              className="bg-background/50 border-border/50 h-11 rounded-xl focus:border-primary/50"
              value={profile.name || ''}
              onChange={(e) => handleProfileChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Role Title</Label>
            <Input
              className="bg-background/50 border-border/50 h-11 rounded-xl focus:border-primary/50"
              value={profile.title || ''}
              onChange={(e) => handleProfileChange('title', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current Role</Label>
            <Input
              className="bg-background/50 border-border/50 h-11 rounded-xl focus:border-primary/50"
              value={profile.role || ''}
              onChange={(e) => handleProfileChange('role', e.target.value)}
            />
          </div>
          <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Education</Label>
              <Input
                className="bg-background/50 border-border/50 h-11 rounded-xl focus:border-primary/50"
                  value={profile.education || ''}
                  onChange={(e) => handleProfileChange('education', e.target.value)}
              />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Bio Description</Label>
          <Textarea
            className="bg-background/50 border-border/50 min-h-[120px] rounded-xl focus:border-primary/50 resize-none"
            value={profile.description || ''}
            onChange={(e) => handleProfileChange('description', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
            <Input
              className="bg-background/50 border-border/50 h-11 rounded-xl focus:border-primary/50"
              type="email"
              value={profile.email || ''}
              onChange={(e) => handleProfileChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
            <Input
              className="bg-background/50 border-border/50 h-11 rounded-xl focus:border-primary/50"
              value={profile.location || ''}
              onChange={(e) => handleProfileChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 border-t border-border/30 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-primary block">Social & Asset URLs</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={12} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-[10px] font-medium leading-relaxed">
                  Provide public direct links for your assets. For Google Drive, ensure "Anyone with the link" can view.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Input placeholder="GitHub URL" className="bg-background/50 border-border/50 rounded-xl" value={profile.github || ''} onChange={(e) => handleProfileChange('github', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Input placeholder="LinkedIn URL" className="bg-background/50 border-border/50 rounded-xl" value={profile.linkedin || ''} onChange={(e) => handleProfileChange('linkedin', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Input placeholder="Instagram URL" className="bg-background/50 border-border/50 rounded-xl" value={profile.instagram || ''} onChange={(e) => handleProfileChange('instagram', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Input placeholder="Resume URL (Public PDF link)" className="bg-background/50 border-border/50 rounded-xl" value={profile.resumeUrl || ''} onChange={(e) => handleProfileChange('resumeUrl', e.target.value)} />
              <p className="text-[9px] text-muted-foreground ml-2">Link to a public PDF file.</p>
            </div>
            <div className="space-y-1 col-span-full">
              <Input placeholder="Profile Picture URL (Direct Image link)" className="bg-background/50 border-border/50 rounded-xl" value={profile.profilePictureUrl || ''} onChange={(e) => handleProfileChange('profilePictureUrl', e.target.value)} />
              <p className="text-[9px] text-muted-foreground ml-2">Direct URL to an image (png, jpg).</p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
          Sync Profile <Save className="ml-2 h-4 w-4" />
        </Button>
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
