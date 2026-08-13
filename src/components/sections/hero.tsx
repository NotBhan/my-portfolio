import { Github, Rocket, Download, ArrowRight, MapPin, GraduationCap, Languages } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="glass-card p-8 lg:px-12 lg:py-10 relative overflow-hidden group min-h-[220px] flex flex-col justify-center">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Rocket size={140} className="text-primary rotate-12" />
      </div>
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-code text-primary/80 uppercase tracking-[0.3em] font-bold">Identity & Role</span>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
              {profile.name}
            </h1>
            <p className="text-xl lg:text-2xl text-primary font-bold">
              {profile.title}
            </p>
          </div>

          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-2xl font-medium">
            {profile.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
             <div className="flex items-center gap-2 text-[9px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                <MapPin size={10} className="text-primary" />
                {profile.location}
             </div>
             <div className="flex items-center gap-2 text-[9px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                <GraduationCap size={10} className="text-primary" />
                {profile.education}
             </div>
             <div className="flex items-center gap-2 text-[9px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                <Languages size={10} className="text-primary" />
                {profile.languages}
             </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-xl h-10 px-6 text-xs font-bold glow-purple group transition-all">
            View Projects <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" size="sm" className="bg-[#1a1f29] hover:bg-[#232936] text-white border-white/5 rounded-xl h-10 px-5 text-xs font-bold" asChild>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={14} className="mr-2" /> GitHub
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-xl h-10 px-4 text-muted-foreground hover:text-white hover:bg-white/5 text-xs" asChild>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download size={14} className="mr-2" /> Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}