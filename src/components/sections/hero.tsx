import { MapPin, GraduationCap } from 'lucide-react';
import { getProfile } from '@/lib/data';

export default async function Hero() {
  const profile = await getProfile();

  return (
    <div className="bento-card relative group h-full">
      <div className="flex flex-col relative z-20 p-5 px-6 h-full justify-between">
        {/* Top Content: Identity Label, Name & Role */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-code text-primary uppercase tracking-[0.25em] font-black block">
            Identity
          </span>

          <div className="space-y-0.5">
            <h1 className="text-[20px] sm:text-[22px] font-black tracking-tight text-foreground leading-tight uppercase">
              {profile.name}
            </h1>
            <p className="text-[13px] text-primary font-semibold leading-tight">
              {profile.title}
            </p>
          </div>
        </div>

        {/* Metadata: Location & Education */}
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium pt-3 border-t border-border/30 mt-auto">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin size={10} className="text-primary/70 shrink-0" />
            <span className="truncate">{profile.location}</span>
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <GraduationCap size={11} className="text-primary/70 shrink-0" />
            <span className="truncate">{profile.education}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
