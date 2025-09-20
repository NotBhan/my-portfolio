import BentoCard from '@/components/bento-card';
import { Button } from '../ui/button';
import { Briefcase, Download, Globe, MapPin } from 'lucide-react';
import ThemeToggle from '../theme-toggle';

export default function Hero() {
  return (
    <BentoCard>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent p-1">
            <div className="w-full h-full rounded-md bg-background flex items-center justify-center font-bold text-4xl text-primary">
              C
            </div>
          </div>
        </div>

        <div className="flex-grow w-full flex flex-col items-start md:items-end">
          <div className="text-left md:text-right">
            <h1 className="text-2xl font-bold">Chandrabhan</h1>
            <p className="text-muted-foreground">Full Stack Developer</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" asChild>
              <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
              </a>
              </Button>
              <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
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
    </BentoCard>
  );
}
