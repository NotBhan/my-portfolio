import BentoCard from '@/components/bento-card';
import { Button } from '../ui/button';
import { Briefcase, Download, Globe, MapPin, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import ThemeToggle from '../theme-toggle';
import { getProfile } from '@/lib/data';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <BentoCard className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent p-1">
                <div className="w-full h-full rounded-md bg-background flex items-center justify-center font-bold text-4xl text-primary">
                    {profile.name?.charAt(0) || 'C'}
                </div>
                </div>
            </div>
            <div className="flex-grow w-full">
                <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4">
                    <div className="text-center sm:text-left w-full">
                        <h1 className="text-2xl font-bold">{profile.name || 'Chandrabhan'}</h1>
                        <p className="text-muted-foreground">{profile.title || 'Full Stack Developer'}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 w-full lg:w-auto justify-center sm:justify-start">
                        <Button variant="outline" asChild className="w-full sm:w-auto">
                            <a href="/resume.pdf" download>
                                <Download className="mr-2 h-4 w-4" />
                                Resume
                            </a>
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{profile.location || 'Chhattisgarh, India'}</span>
            </div>
            <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{profile.languages || 'English, Hindi'}</span>
            </div>
            <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{profile.role || 'Software Engineer'}</span>
            </div>
        </div>
        
        <div className="flex-grow flex items-center my-6">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
                {profile.description}
            </p>
        </div>

        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <Button variant="outline" asChild>
            <a href={`mailto:${profile.email || 'your-email@example.com'}`}>
              <Mail />
              Email Me
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={profile.github || '#'} target="_blank" rel="noopener noreferrer">
              <Github />
              My GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={profile.linkedin || '#'} target="_blank" rel="noopener noreferrer">
              <Linkedin />
              My LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={profile.instagram || '#'} target="_blank" rel="noopener noreferrer">
              <Instagram />
              My Instagram
            </a>
          </Button>
        </div>
      </div>
    </BentoCard>
  );
}
