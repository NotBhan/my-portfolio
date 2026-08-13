import { ArrowRight, MapPin, GraduationCap, Github } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="bento-card h-full relative group carve-bottom-right">
      <div className="flex flex-col h-full relative z-20 p-5 px-6">
        {/* Identity Label */}
        <span className="text-[10px] font-code text-primary uppercase tracking-[0.25em] font-black mb-3">
          Identity
        </span>

        {/* Name & Role */}
        <div className="space-y-1 mb-4">
          <h1 className="text-[24px] font-black tracking-tight text-white leading-none uppercase truncate">
            {profile.name}
          </h1>
          <p className="text-[15px] text-primary font-semibold leading-tight">
            {profile.title}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-medium mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin size={11} className="text-primary/70" />
            {profile.location.split(',')[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap size={12} className="text-primary/70" />
            {profile.education}
          </span>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto">
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/80 text-white rounded-xl h-[38px] px-5 text-[11px] font-bold glow-purple transition-all min-w-[135px]" 
            asChild
          >
            <Link href="#projects">
              View Projects <ArrowRight size={12} className="ml-2" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/5 border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white rounded-xl h-[38px] px-4 text-[11px] font-bold transition-all min-w-[90px]" 
            asChild
          >
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Github size={12} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
