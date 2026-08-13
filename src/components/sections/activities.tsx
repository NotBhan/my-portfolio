import BentoCard from '@/components/bento-card';
import { getActivities } from '@/lib/data';
import { Award, Users, Trophy, Star } from 'lucide-react';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible);

  return (
    <div className="glass-card p-8 flex flex-col gap-8 relative overflow-hidden min-h-[300px]">
      <div className="space-y-1">
        <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">Leadership</span>
        <h3 className="text-2xl font-black text-white">Activities</h3>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/10">
            <Users size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">Team Lead</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Led a 4-person team for StudentVoice development.
            </p>
          </div>
        </div>

        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-muted-foreground border border-white/5">
              <Trophy size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white group-hover:text-white/80 transition-colors uppercase tracking-wider">{activity.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 opacity-10">
        <Star size={80} className="text-primary" />
      </div>
    </div>
  );
}