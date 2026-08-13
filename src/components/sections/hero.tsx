import { MapPin, Globe, School, Download, Moon } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import BentoCard from '../bento-card';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <BentoCard className="h-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="text-lg">👋</span> Hi, I'm
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="text-xl text-primary font-medium">{profile.title}</p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/80 text-white rounded-2xl h-11 px-6 glow-purple">
              <Download size={18} className="mr-2" /> Resume
            </Button>
            <Button variant="secondary" className="glass-card border-[#30363d] rounded-2xl h-11 px-6">
              Theme <Moon size={18} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            {profile.location}
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-primary" />
            {profile.languages}
          </div>
          <div className="flex items-center gap-2">
            <School size={16} className="text-primary" />
            {profile.education}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          {profile.description}
        </p>
      </div>
    </BentoCard>
  );
}