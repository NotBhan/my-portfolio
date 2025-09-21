
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial } from '@/lib/definitions';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';

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
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Testimonial {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`testimonial-visible-${testimonial.id}`}
                    checked={testimonial.isVisible}
                    onCheckedChange={(checked) => handleTestimonialChange(testimonial.id, 'isVisible', checked)}
                  />
                  <Label htmlFor={`testimonial-visible-${testimonial.id}`}>Visible</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveTestimonial(testimonial.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`testimonial-name-${testimonial.id}`}>Name</Label>
                <Input
                  id={`testimonial-name-${testimonial.id}`}
                  value={testimonial.name}
                  onChange={(e) => handleTestimonialChange(testimonial.id, 'name', e.target.value)}
                  placeholder="Client Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`testimonial-company-${testimonial.id}`}>Company/Location</Label>
                <Input
                  id={`testimonial-company-${testimonial.id}`}
                  value={testimonial.company}
                  onChange={(e) => handleTestimonialChange(testimonial.id, 'company', e.target.value)}
                  placeholder="Company or Location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`testimonial-quote-${testimonial.id}`}>Quote</Label>
                <Textarea
                  id={`testimonial-quote-${testimonial.id}`}
                  value={testimonial.quote}
                  onChange={(e) => handleTestimonialChange(testimonial.id, 'quote', e.target.value)}
                  placeholder="Client's testimonial"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={handleAddTestimonial}>
            Add Testimonial
          </Button>
          <Button type="submit">Save All Testimonials</Button>
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
