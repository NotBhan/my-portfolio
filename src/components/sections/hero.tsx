import BentoCard from '@/components/bento-card';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <BentoCard title="index.html" className="text-center">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-1">
             <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-4xl text-primary">
                C
             </div>
           </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight">
          Chandrabhan
        </h1>
        <p className="mt-2 text-lg text-muted-foreground font-code">
          {`// Creative Developer & UI/UX Enthusiast`}
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="GitHub">
              <Github />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="LinkedIn">
              <Linkedin />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Twitter">
              <Twitter />
            </a>
          </Button>
        </div>
      </div>
    </BentoCard>
  );
}
