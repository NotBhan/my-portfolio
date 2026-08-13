import { Zap } from 'lucide-react';
import { getActivities } from '@/lib/data';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible).slice(0, 3);

  return (
    <div className="bento-card flex flex-col relative overflow-hidden h-full">
      <div className="flex flex-col p-5 pb-7 z-20 h-full">
        <div className="space-y-1 mb-5">
          <span className="text-[9px] font-code text-primary uppercase tracking-[0.25em] font-black">Leadership</span>
          <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Activities</h3>
        </div>

        <div className="flex flex-col gap-4 relative overflow-y-auto custom-scrollbar pr-2 flex-grow justify-start">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4 group items-start">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-muted-foreground border border-white/5">
                <Zap size={14} />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">{activity.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}