
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Name</Label>
          <Input
            id="profile-name"
            value={profile.name || ''}
            onChange={(e) => handleProfileChange('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-title">Title</Label>
          <Input
            id="profile-title"
            value={profile.title || ''}
            onChange={(e) => handleProfileChange('title', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-role">Role</Label>
          <Input
            id="profile-role"
            value={profile.role || ''}
            onChange={(e) => handleProfileChange('role', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-description">Description</Label>
          <Textarea
            id="profile-description"
            value={profile.description || ''}
            onChange={(e) => handleProfileChange('description', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input
            id="profile-email"
            type="email"
            value={profile.email || ''}
            onChange={(e) => handleProfileChange('email', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-github">GitHub URL</Label>
          <Input
            id="profile-github"
            value={profile.github || ''}
            onChange={(e) => handleProfileChange('github', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-linkedin">LinkedIn URL</Label>
          <Input
            id="profile-linkedin"
            value={profile.linkedin || ''}
            onChange={(e) => handleProfileChange('linkedin', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-instagram">Instagram URL</Label>
          <Input
            id="profile-instagram"
            value={profile.instagram || ''}
            onChange={(e) => handleProfileChange('instagram', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-resume">Resume URL</Label>
          <Input
            id="profile-resume"
            value={profile.resumeUrl || ''}
            onChange={(e) => handleProfileChange('resumeUrl', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-picture">Profile Picture URL</Label>
          <Input
            id="profile-picture"
            value={profile.profilePictureUrl || ''}
            onChange={(e) => handleProfileChange('profilePictureUrl', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-location">Location</Label>
          <Input
            id="profile-location"
            value={profile.location || ''}
            onChange={(e) => handleProfileChange('location', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-languages">Languages</Label>
          <Input
            id="profile-languages"
            value={profile.languages || ''}
            onChange={(e) => handleProfileChange('languages', e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Save Profile
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
