import { Users, Zap, Trophy } from 'lucide-react';
import { getActivities } from '@/lib/data';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible);

  return (
    <div className="bento-card p-5 flex flex-col gap-4 relative overflow-hidden h-full bg-[#11141b] carve-bottom-right">
      <div className="space-y-0.5 relative z-20">
        <span className="text-[8px] font-code text-primary uppercase tracking-[0.2em] font-bold">Leadership</span>
        <h3 className="text-sm font-black text-white uppercase tracking-tight">Activities</h3>
      </div>

      <div className="flex flex-col gap-3 relative z-20">
        <div className="flex gap-3 group items-start">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/10">
            <Users size={12} />
          </div>
          <div className="space-y-0.5 min-w-0">
            <h4 className="text-[9px] font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">Team Lead</h4>
            <p className="text-[8px] text-muted-foreground leading-tight line-clamp-2">
              Led a 4-person team for StudentVoice development.
            </p>
          </div>
        </div>

        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 group items-start">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-muted-foreground border border-white/5">
              <Zap size={12} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-[9px] font-bold text-white uppercase tracking-wider truncate">{activity.title}</h4>
              <p className="text-[8px] text-muted-foreground leading-tight line-clamp-2">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}