import BentoCard from '@/components/bento-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { handleContactForm } from '@/lib/actions';
import { Send } from 'lucide-react';

export default function Contact() {
  return (
    <BentoCard title="contact.js">
      <h2 className="text-xl font-headline font-bold mb-4">Get In Touch</h2>
      <form action={handleContactForm} className="space-y-4 font-code">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{'// your name'}</Label>
            <Input id="name" name="name" placeholder="Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{'// your email'}</Label>
            <Input id="email" name="email" type="email" placeholder="Email" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">{'// your message'}</Label>
          <Textarea id="message" name="message" placeholder="Type your message here." required />
        </div>
        <Button type="submit" className="w-full font-headline">
          <Send className="mr-2 h-4 w-4" /> Send Message
        </Button>
      </form>
    </BentoCard>
  );
}
