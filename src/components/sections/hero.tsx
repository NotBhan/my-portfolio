import { ArrowRight, MapPin, GraduationCap, Languages } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="bento-card p-5 h-full relative group carve-bottom-right">
      <div className="flex flex-col h-full justify-between relative z-20">
        <div className="space-y-1">
          <span className="text-[8px] font-code text-primary/80 uppercase tracking-[0.3em] font-bold">Identity & Role</span>
          <h1 className="text-xl font-black tracking-tighter text-white leading-none">
            {profile.name}
          </h1>
          <p className="text-sm text-primary font-bold leading-none">
            {profile.title}
          </p>
        </div>

        <p className="text-[10px] text-muted-foreground leading-relaxed font-medium line-clamp-2">
          {profile.description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-[7px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            <MapPin size={7} className="text-primary" />
            {profile.location}
          </div>
          <div className="flex items-center gap-1.5 text-[7px] font-code text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            <GraduationCap size={7} className="text-primary" />
            {profile.education}
          </div>
        </div>
        
        <div className="pt-1">
          <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-xl h-7 px-4 text-[9px] font-bold glow-purple transition-all" asChild>
            <Link href="#projects">
              View Projects <ArrowRight size={10} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
