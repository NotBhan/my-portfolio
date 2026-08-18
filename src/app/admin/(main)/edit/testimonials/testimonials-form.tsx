
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial, SiteSettings } from '@/lib/definitions';
import { Trash, MessageSquare, Quote, ArrowUp, ArrowDown, Globe, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordDialog from '@/components/password-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type TestimonialsFormProps = {
  testimonials: Testimonial[];
  initialSettings?: SiteSettings;
};

export default function TestimonialsForm({
  testimonials: initialTestimonials,
  initialSettings,
}: TestimonialsFormProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showTestimonials, setShowTestimonials] = useState<boolean>(
    initialSettings?.showTestimonials ?? false
  );
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

  const handleTestimonialChange = (
    id: string,
    field: keyof Testimonial,
    value: string | boolean
  ) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : p => p)));
  };

  const handleMoveUp = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index <= 0) return;
    const nextList = [...testimonials];
    const temp = nextList[index - 1];
    nextList[index - 1] = nextList[index];
    nextList[index] = temp;
    setTestimonials(nextList);
  };

  const handleMoveDown = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index >= testimonials.length - 1) return;
    const nextList = [...testimonials];
    const temp = nextList[index + 1];
    nextList[index + 1] = nextList[index];
    nextList[index] = temp;
    setTestimonials(nextList);
  };

  const handleSave = async () => {
    const testimonialsWithIds = testimonials.map((t, index) => ({
      ...t,
      id: t.id.startsWith('new-') ? `${index + 1}` : t.id,
    }));

    try {
      // 1. Save Testimonials
      const testResponse = await fetch('/api/data?file=testimonials.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialsWithIds),
      });
      if (!testResponse.ok) throw new Error('Failed to save testimonials data.');

      // 2. Save Settings (Testimonials display toggle)
      const settingsResponse = await fetch('/api/data?file=settings.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showTestimonials }),
      });
      if (!settingsResponse.ok) throw new Error('Failed to save display settings.');

      toast({
        title: 'Success',
        description: `Testimonials & visibility settings saved (${showTestimonials ? 'Visible' : 'Hidden'}).`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not save testimonials settings. Please try again.',
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
        {/* Global Testimonials Page & Sidebar Display Toggle */}
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                {showTestimonials ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[12px] font-black uppercase tracking-wider text-foreground">
                    Public Testimonials Page & Sidebar Navigation
                  </h4>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      showTestimonials
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {showTestimonials ? '● ON (Public)' : '○ OFF (Hidden)'}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Toggle whether the `/testimonials` page and its icon appear in the public sidebar and navigation bar.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="global-testimonials-display"
                checked={showTestimonials}
                onCheckedChange={setShowTestimonials}
              />
              <Label
                htmlFor="global-testimonials-display"
                className="text-[10px] font-black uppercase tracking-widest text-primary cursor-pointer"
              >
                {showTestimonials ? 'Active / Visible' : 'Disabled / Hidden'}
              </Label>
            </div>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="flex items-center justify-between pt-2">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Testimonials Records ({testimonials.length})
          </Label>
          <span className="text-[9px] font-code text-muted-foreground">
            Use ▲ ▼ buttons to reorder display sequence
          </span>
        </div>

        <Accordion type="multiple" className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <AccordionItem
              key={testimonial.id}
              value={testimonial.id}
              className="border border-border/50 rounded-xl bg-card/20 overflow-hidden px-4"
            >
              <div className="flex items-center justify-between py-2">
                <AccordionTrigger className="hover:no-underline py-2 flex-1">
                  <div className="flex items-center gap-4 text-left min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MessageSquare size={14} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black uppercase tracking-wider text-foreground truncate">
                        {testimonial.name || `Feedback ${index + 1}`}
                      </h3>
                      <div className="text-[10px] text-muted-foreground font-code uppercase tracking-widest flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="bg-muted px-1.5 py-0.5 rounded text-[9px] font-bold text-foreground">
                          #{index + 1}
                        </span>
                        <span>{testimonial.company || 'Unknown Context'}</span>
                        <span>{testimonial.isVisible ? '// Validated' : '// Hidden'}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <div className="flex items-center gap-1 pl-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary border-border/60"
                    disabled={index === 0}
                    onClick={(e) => handleMoveUp(index, e)}
                    title="Move Up"
                  >
                    <ArrowUp size={13} />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary border-border/60"
                    disabled={index === testimonials.length - 1}
                    onClick={(e) => handleMoveDown(index, e)}
                    title="Move Down"
                  >
                    <ArrowDown size={13} />
                  </Button>
                </div>
              </div>

              <AccordionContent className="pt-2 pb-6 space-y-6 border-t border-border/30 mt-2">
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <Switch
                      id={`test-visible-${testimonial.id}`}
                      checked={testimonial.isVisible}
                      onCheckedChange={(checked) =>
                        handleTestimonialChange(testimonial.id, 'isVisible', checked)
                      }
                    />
                    <Label
                      htmlFor={`test-visible-${testimonial.id}`}
                      className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                    >
                      Verification Status
                    </Label>
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
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Contributor Name
                    </Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={testimonial.name}
                      onChange={(e) =>
                        handleTestimonialChange(testimonial.id, 'name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Organization / Context
                    </Label>
                    <Input
                      className="bg-background/50 rounded-xl h-11"
                      value={testimonial.company}
                      onChange={(e) =>
                        handleTestimonialChange(testimonial.id, 'company', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Testimonial Body
                  </Label>
                  <div className="relative">
                    <Textarea
                      className="bg-background/50 rounded-xl min-h-[100px] resize-none pl-10"
                      value={testimonial.quote}
                      onChange={(e) =>
                        handleTestimonialChange(testimonial.id, 'quote', e.target.value)
                      }
                    />
                    <Quote size={14} className="absolute left-4 top-4 text-primary/30" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-between items-center pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTestimonial}
            className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]"
          >
            Log New Feedback
          </Button>
          <Button
            type="submit"
            className="h-11 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
          >
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

