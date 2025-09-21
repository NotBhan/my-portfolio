'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { SocialLink } from '@/lib/definitions';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SocialLinksForm({ socialLinks: initialLinks }: { socialLinks: SocialLink[] }) {
  const [links, setLinks] = useState<SocialLink[]>(initialLinks);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddLink = () => {
    setLinks([
      ...links,
      {
        id: `new-${Date.now()}`,
        name: '',
        url: '',
        icon: 'Globe',
        isVisible: true,
      },
    ]);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleLinkChange = (id: string, field: keyof SocialLink, value: string | boolean) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const linksWithIds = links.map((link, index) => ({
      ...link,
      id: link.id.startsWith('new-') ? `${index + 1}` : link.id,
    }));

    try {
      const response = await fetch('/api/data?file=social-links.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(linksWithIds),
      });
      if (!response.ok) throw new Error('Failed to save social links.');
      toast({ title: 'Success', description: 'Social links saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save social links. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {links.map((link, index) => (
          <div key={link.id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Link {index + 1}</h3>
              <div className="flex items-center gap-2">
                <Switch
                  id={`link-visible-${link.id}`}
                  checked={link.isVisible}
                  onCheckedChange={(checked) => handleLinkChange(link.id, 'isVisible', checked)}
                />
                <Label htmlFor={`link-visible-${link.id}`}>Visible</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveLink(link.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`link-name-${link.id}`}>Name</Label>
              <Input
                id={`link-name-${link.id}`}
                value={link.name}
                onChange={(e) => handleLinkChange(link.id, 'name', e.target.value)}
                placeholder="e.g., Twitter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`link-url-${link.id}`}>URL</Label>
              <Input
                id={`link-url-${link.id}`}
                value={link.url}
                onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`link-icon-${link.id}`}>Icon Name</Label>
              <Input
                id={`link-icon-${link.id}`}
                value={link.icon}
                onChange={(e) => handleLinkChange(link.id, 'icon', e.target.value)}
                placeholder="e.g., Twitter (from lucide-react)"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline" onClick={handleAddLink}>
          Add Link
        </Button>
        <Button type="submit">Save All Links</Button>
      </div>
    </form>
  );
}
