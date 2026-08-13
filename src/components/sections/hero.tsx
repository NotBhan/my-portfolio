import { Github, Globe, Rocket, Download, Moon, ArrowRight } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import BentoCard from '../bento-card';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <BentoCard className="h-full bg-[#151921]/60 p-8 sm:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Rocket size={120} className="text-primary rotate-12" />
      </div>
      
      <div className="flex flex-col gap-8 relative z-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="text-2xl sm:text-3xl text-primary font-bold">
              {profile.title}
            </p>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl opacity-90">
            {profile.description}
          </p>

          <div className="flex flex-wrap gap-3 text-sm font-code text-primary/80 uppercase tracking-widest">
            <span>4 deployed projects</span>
            <span className="text-white/20">•</span>
            <span>React</span>
            <span className="text-white/20">•</span>
            <span>Next.js</span>
            <span className="text-white/20">•</span>
            <span>TypeScript</span>
            <span className="text-white/20">•</span>
            <span>AI</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <Button className="bg-primary hover:bg-primary/80 text-white rounded-2xl h-14 px-8 text-lg font-bold glow-purple group">
            View Projects <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" className="glass-card border-[#ffffff0a] bg-secondary/40 rounded-2xl h-14 px-8 text-lg font-bold" asChild>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={20} className="mr-2" /> GitHub
            </a>
          </Button>
          <Button variant="ghost" className="rounded-2xl h-14 px-6 text-muted-foreground hover:text-white" asChild>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download size={18} className="mr-2" /> Resume
            </a>
          </Button>
        </div>
      </div>
    </BentoCard>
  );
}
