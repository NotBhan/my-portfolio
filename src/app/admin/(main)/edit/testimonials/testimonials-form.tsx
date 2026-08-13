
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial } from '@/lib/definitions';
import { Trash, MessageSquare, Quote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function TestimonialsForm({ testimonials: initialTestimonials }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAddTestimonial = () => {
    setTestimonials([
      ...testimonials,
      {
        id: `new-${Date.now()}`,
        name: '',
        company: '',
        quote: '',
        isVisible: true,
      },
    ]);
  };

  const handleRemoveTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const handleTestimonialChange = (id: string, field: keyof Testimonial, value: string | boolean) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleSave = async () => {
    const testimonialsWithIds = testimonials.map((t, index) => ({
      ...t,
      id: t.id.startsWith('new-') ? `${index + 1}` : t.id,
    }));

    try {
      const response = await fetch('/api/data?file=testimonials.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialsWithIds),
      });
      if (!response.ok) throw new Error('Failed to save testimonials.');
      toast({ title: 'Success', description: 'Testimonials saved successfully.' });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save testimonials. Please try again.',
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
          {testimonials.map((testimonial, index) => (
            <AccordionItem key={testimonial.id} value={testimonial.id} className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                      {testimonial.name || `Feedback ${index + 1}`}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-code uppercase tracking-widest">
                      {testimonial.company || 'Unknown Source'} {testimonial.isVisible ? '// Validated' : '// Pending'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-3">
                      <Switch
                        id={`test-visible-${testimonial.id}`}
                        checked={testimonial.isVisible}
                        onCheckedChange={(checked) => handleTestimonialChange(testimonial.id, 'isVisible', checked)}
                      />
                      <Label htmlFor={`test-visible-${testimonial.id}`} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verification Status</Label>
                   </div>
                   <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 rounded-lg uppercase text-[9px] font-black tracking-widest"
                    onClick={() => handleRemoveTestimonial(testimonial.id)}
                  >
                    <Trash className="h-3 w-3 mr-2" /> Discard Record
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contributor Name</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={testimonial.name}
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Organization / Context</Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={testimonial.company}
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Testimonial Body</Label>
                  <div className="relative">
                    <Textarea
                      className="bg-background/50 rounded-xl min-h-[100px] resize-none pl-10"
                      value={testimonial.quote}
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'quote', e.target.value)}
                    />
                    <Quote size={14} className="absolute left-4 top-4 text-primary/30" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" onClick={handleAddTestimonial} className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
            Log New Feedback
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
