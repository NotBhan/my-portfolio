import { MapPin, Globe, School, Download, Moon } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import BentoCard from '../bento-card';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <BentoCard className="h-full bg-[#151921]/60 p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="space-y-4">
            <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <span className="text-xl">👋</span> Hi, I'm
            </p>
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="text-xl sm:text-2xl text-primary font-semibold">{profile.title}</p>
            </div>
          </div>
          
          <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
            <Button className="flex-1 sm:flex-none bg-primary hover:bg-primary/80 text-white rounded-2xl h-12 sm:h-14 px-4 sm:px-8 text-base sm:text-lg font-semibold glow-purple">
              <Download size={18} className="mr-2 sm:mr-3" /> Resume
            </Button>
            <Button variant="secondary" className="flex-1 sm:flex-none glass-card border-[#ffffff0a] bg-secondary/40 rounded-2xl h-12 sm:h-14 px-4 sm:px-8 text-base sm:text-lg font-semibold">
              <span className="hidden xs:inline">Theme</span> <Moon size={18} className="ml-2 sm:ml-3" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-8 text-muted-foreground text-sm sm:text-base">
          <div className="flex items-center gap-2 sm:gap-3">
            <MapPin size={18} className="text-primary/70" />
            {profile.location}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Globe size={18} className="text-primary/70" />
            {profile.languages}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <School size={18} className="text-primary/70" />
            {profile.education}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-3xl text-sm sm:text-lg opacity-80">
          {profile.description}
        </p>
      </div>
    </BentoCard>
  );
}
