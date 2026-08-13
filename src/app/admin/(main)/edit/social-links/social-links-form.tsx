
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { SocialLink } from '@/lib/definitions';
import { Trash, Share2, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function SocialLinksForm({ socialLinks: initialLinks }: { socialLinks: SocialLink[] }) {
  const [links, setLinks] = useState<SocialLink[]>(initialLinks);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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

  const handleSave = async () => {
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
          {links.map((link, index) => (
            <AccordionItem key={link.id} value={link.id} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Share2 size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {link.name || `Link ${index + 1}`}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-code uppercase tracking-widest">
                      {link.isVisible ? '// Connected' : '// Off-Grid'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-3">
                      <Switch
                        id={`link-visible-${link.id}`}
                        checked={link.isVisible}
                        onCheckedChange={(checked) => handleLinkChange(link.id, 'isVisible', checked)}
                      />
                      <Label htmlFor={`link-visible-${link.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Public Presence</Label>
                   </div>
                   <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                    onClick={() => handleRemoveLink(link.id)}
                  >
                    <Trash className="h-3 w-3 mr-2" /> Sever Link
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Platform Name</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={link.name}
                      onChange={(e) => handleLinkChange(link.id, 'name', e.target.value)}
                      placeholder="e.g., Twitter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Icon Identifier (Lucide)</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={link.icon}
                      onChange={(e) => handleLinkChange(link.id, 'icon', e.target.value)}
                      placeholder="e.g., Twitter, Globe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Destination URL</Label>
                  <Input
                    className="bg-background/50 rounded-xl h-11"
                    value={link.url}
                    onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddLink} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            New Connection
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
