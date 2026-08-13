import { MapPin, Globe, School, Download, Moon } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import BentoCard from '../bento-card';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <BentoCard className="h-full bg-[#151921]/60">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <span className="text-xl">👋</span> Hi, I'm
            </p>
            <div className="space-y-1">
              <h1 className="text-5xl font-bold tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="text-2xl text-primary font-semibold">{profile.title}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/80 text-white rounded-2xl h-14 px-8 text-lg font-semibold glow-purple">
              <Download size={20} className="mr-3" /> Resume
            </Button>
            <Button variant="secondary" className="glass-card border-[#ffffff0a] bg-secondary/40 rounded-2xl h-14 px-8 text-lg font-semibold">
              Theme <Moon size={20} className="ml-3" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 text-muted-foreground text-base">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-primary/70" />
            {profile.location}
          </div>
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-primary/70" />
            {profile.languages}
          </div>
          <div className="flex items-center gap-3">
            <School size={20} className="text-primary/70" />
            {profile.education}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg opacity-80">
          {profile.description}
        </p>
      </div>
    </BentoCard>
  );
}