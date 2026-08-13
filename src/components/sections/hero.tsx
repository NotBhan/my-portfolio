import { Github, Globe, Rocket, Download, Moon, ArrowRight, MapPin, GraduationCap, Languages } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import BentoCard from '../bento-card';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="glass-card p-8 lg:p-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Rocket size={180} className="text-primary rotate-12" />
      </div>
      
      <div className="flex flex-col gap-10 relative z-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-code text-primary/80 uppercase tracking-[0.3em] font-bold">Identity & Role</span>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-white">
              {profile.name}
            </h1>
            <p className="text-2xl lg:text-3xl text-primary font-bold">
              {profile.title}
            </p>
          </div>

          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
            {profile.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
             <div className="flex items-center gap-2 text-[10px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                <MapPin size={12} className="text-primary" />
                {profile.location}
             </div>
             <div className="flex items-center gap-2 text-[10px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                <GraduationCap size={12} className="text-primary" />
                {profile.education}
             </div>
             <div className="flex items-center gap-2 text-[10px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                <Languages size={12} className="text-primary" />
                {profile.languages}
             </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button className="bg-primary hover:bg-primary/80 text-white rounded-2xl h-14 px-10 text-lg font-bold glow-purple group transition-all hover:scale-105">
            View Projects <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" className="bg-[#232936] hover:bg-[#2d3445] text-white border-white/5 rounded-2xl h-14 px-8 text-lg font-bold" asChild>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={20} className="mr-2" /> GitHub
            </a>
          </Button>
          <Button variant="ghost" className="rounded-2xl h-14 px-6 text-muted-foreground hover:text-white hover:bg-white/5" asChild>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download size={18} className="mr-2" /> Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}