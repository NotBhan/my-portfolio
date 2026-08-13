import { ArrowRight, MapPin, GraduationCap } from 'lucide-react';
import { getProfile } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="bento-card p-6 h-full relative group carve-bottom-right">
      <div className="flex flex-col h-full justify-between relative z-20">
        <div className="space-y-1">
          <h1 className="text-[22px] font-black tracking-tight text-white leading-[1.1] uppercase">
            {profile.name}
          </h1>
          <p className="text-[14px] text-primary font-bold leading-tight">
            {profile.title}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[11px] font-code text-muted-foreground uppercase font-medium">
            <span className="flex items-center gap-1.5"><MapPin size={10} className="text-primary" />{profile.location.split(',')[0]}</span>
            <span className="opacity-20">|</span>
            <span className="flex items-center gap-1.5"><GraduationCap size={10} className="text-primary" />{profile.education}</span>
          </div>
          
          <div className="flex gap-3">
            <Button size="sm" className="bg-primary hover:bg-primary/80 text-white rounded-xl h-9 px-5 text-[11px] font-bold glow-purple transition-all" asChild>
              <Link href="#projects">
                View Projects <ArrowRight size={10} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
