import { ArrowRight, MapPin, GraduationCap } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="bento-card p-4 h-full relative group carve-bottom-right">
      <div className="flex flex-col h-full justify-between relative z-20">
        <div className="space-y-0.5">
          <span className="text-[7px] font-code text-primary/80 uppercase tracking-[0.3em] font-bold">Identity</span>
          <h1 className="text-sm font-black tracking-tighter text-white leading-none truncate">
            {profile.name}
          </h1>
          <p className="text-[9px] text-primary font-bold leading-none truncate">
            {profile.title}
          </p>
        </div>

        <p className="text-[8px] text-muted-foreground leading-tight font-medium line-clamp-2">
          {profile.description}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[7px] font-code text-muted-foreground uppercase bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            <MapPin size={6} className="text-primary" />
            {profile.location.split(',')[0]}
          </div>
          <div className="flex items-center gap-1 text-[7px] font-code text-muted-foreground uppercase bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            <GraduationCap size={6} className="text-primary" />
            {profile.education}
          </div>
        </div>
        
        <div>
          <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-lg h-5 px-3 text-[8px] font-bold glow-purple transition-all" asChild>
            <Link href="#projects">
              Projects <ArrowRight size={8} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}