import { Github, Rocket, MapPin, GraduationCap, Languages, ArrowRight } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="bento-card p-6 lg:px-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Rocket size={100} className="text-primary rotate-12" />
      </div>
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className="space-y-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-code text-primary/80 uppercase tracking-[0.3em] font-bold">Identity & Role</span>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-white">
              {profile.name}
            </h1>
            <p className="text-lg text-primary font-bold">
              {profile.title}
            </p>
          </div>

          <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-2xl font-medium">
            {profile.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
             <div className="flex items-center gap-2 text-[8px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                <MapPin size={8} className="text-primary" />
                {profile.location}
             </div>
             <div className="flex items-center gap-2 text-[8px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                <GraduationCap size={8} className="text-primary" />
                {profile.education}
             </div>
             <div className="flex items-center gap-2 text-[8px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                <Languages size={8} className="text-primary" />
                {profile.languages}
             </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-xl h-9 px-5 text-[10px] font-bold glow-purple transition-all">
            View Projects <ArrowRight size={12} className="ml-2" />
          </Button>
          <Button variant="secondary" size="sm" className="bg-[#1a1f29] hover:bg-[#232936] text-white border-white/5 rounded-xl h-9 px-4 text-[10px] font-bold" asChild>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={12} className="mr-2" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
