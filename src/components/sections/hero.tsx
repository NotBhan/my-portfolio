import BentoCard from '@/components/bento-card';
import { Button } from '../ui/button';
import { Briefcase, Download, Globe, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <BentoCard className="flex-col md:flex-row items-start">
      <div className="relative mb-4 md:mb-0 md:mr-6">
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent p-1">
          <div className="w-full h-full rounded-[6px] bg-background flex items-center justify-center font-bold text-4xl text-primary">
            C
          </div>
        </div>
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-green-400 mb-1">Available To Work</p>
            <h1 className="text-2xl font-bold">Chandrabhan</h1>
            <p className="text-muted-foreground">Full Stack Developer</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Chhattisgarh, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>English, Hindi</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Software Engineer</span>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <Button className="flex-1" asChild>
            <a href="mailto:your-email@example.com">Telegram Me</a>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <a href="#">WhatsApp Me</a>
          </Button>
        </div>
      </div>
    </BentoCard>
  );
}
