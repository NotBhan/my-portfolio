'use client';

import { getProfile as fetchProfile } from '@/lib/data.client';
import { updateProfile } from '@/lib/actions';
import { Profile } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const { toast } = useToast();

  useEffect(() => {
    async function loadProfile() {
      const data = await fetchProfile();
      setProfile(data);
    }
    loadProfile();
  }, []);

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await updateProfile(profile as Profile);
    toast({
      title: 'Success!',
      description: 'Your profile has been updated.',
    });
  };
  
  // Render a loading state or return null if profile isn't loaded yet
  if (!profile.name) {
      return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your public profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={profile.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={profile.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={profile.location || ''} onChange={(e) => handleInputChange('location', e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <Input id="languages" value={profile.languages || ''} onChange={(e) => handleInputChange('languages', e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={profile.role || ''} onChange={(e) => handleInputChange('role', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Hero Description</Label>
            <Textarea id="description" value={profile.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" value={profile.github || ''} onChange={(e) => handleInputChange('github', e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input id="linkedin" value={profile.linkedin || ''} onChange={(e) => handleInputChange('linkedin', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input id="instagram" value={profile.instagram || ''} onChange={(e) => handleInputChange('instagram', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
                <Input id="profilePictureUrl" value={profile.profilePictureUrl || ''} onChange={(e) => handleInputChange('profilePictureUrl', e.target.value)} />
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
