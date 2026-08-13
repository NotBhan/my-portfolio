import { Users, Trophy, Star } from 'lucide-react';
import { getActivities } from '@/lib/data';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible);

  return (
    <div className="glass-card p-6 flex flex-col gap-5 relative overflow-hidden min-h-[220px]">
      <div className="space-y-0.5">
        <span className="text-[9px] font-code text-primary uppercase tracking-[0.2em] font-bold">Leadership</span>
        <h3 className="text-lg font-black text-white uppercase tracking-tight">Activities</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/10">
            <Users size={14} />
          </div>
          <div className="space-y-0.5 min-w-0">
            <h4 className="text-[10px] font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider truncate">Team Lead</h4>
            <p className="text-[9px] text-muted-foreground leading-tight line-clamp-2">
              Led a 4-person team for StudentVoice development.
            </p>
          </div>
        </div>

        {activities.slice(0, 1).map((activity) => (
          <div key={activity.id} className="flex gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-muted-foreground border border-white/5">
              <Trophy size={14} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-[10px] font-bold text-white group-hover:text-white/80 transition-colors uppercase tracking-wider truncate">{activity.title}</h4>
              <p className="text-[9px] text-muted-foreground leading-tight line-clamp-2">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
        <Star size={60} className="text-primary" />
      </div>
    </div>
  );
}
