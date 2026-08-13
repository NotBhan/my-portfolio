import { MapPin, GraduationCap } from 'lucide-react';
import { getProfile } from '@/lib/data';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="bento-card h-full relative group carve-bottom-right">
      <div className="flex flex-col h-full relative z-20 p-5 px-6 justify-center">
        {/* Identity Label */}
        <span className="text-[9px] font-code text-primary uppercase tracking-[0.25em] font-black mb-2">
          Identity
        </span>

        {/* Name & Role */}
        <div className="space-y-0.5">
          <h1 className="text-[22px] font-black tracking-tight text-white leading-none uppercase truncate">
            {profile.name}
          </h1>
          <p className="text-[14px] text-primary font-semibold leading-tight">
            {profile.title}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium mt-3">
          <span className="flex items-center gap-1.5">
            <MapPin size={10} className="text-primary/70" />
            {profile.location.split(',')[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap size={11} className="text-primary/70" />
            {profile.education}
          </span>
        </div>
      </div>
    </div>
  );
}
