import BentoCard from '@/components/bento-card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Send } from 'lucide-react';

export default function Contact() {
  return (
    <BentoCard title="connect.ts">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h2 className="text-xl font-headline font-bold">
          Let&apos;s Connect
        </h2>
        <p className="mt-2 mb-6 text-sm text-muted-foreground font-code max-w-sm">
          I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
        </p>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" asChild>
            <a href="#" aria-label="GitHub">
              <Github />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="#" aria-label="LinkedIn">
              <Linkedin />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="#" aria-label="Twitter">
              <Twitter />
            </a>
          </Button>
        </div>
      </div>
    </BentoCard>
  );
}