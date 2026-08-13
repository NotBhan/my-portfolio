import { Zap } from 'lucide-react';
import { getActivities } from '@/lib/data';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible);

  return (
    <div className="bento-card p-6 flex flex-col gap-5 relative overflow-hidden h-full bg-[#11141b]">
      <div className="space-y-1 relative z-20">
        <span className="text-[9px] font-code text-primary uppercase tracking-[0.25em] font-black">Leadership</span>
        <h3 className="text-[15px] font-black text-white uppercase tracking-tight">Activities</h3>
      </div>

      <div className="flex flex-col gap-5 relative z-20 overflow-y-auto custom-scrollbar pr-2">
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
      
      {/* Structural Cut-Out Notch for Activities */}
      <div className="absolute -right-[1px] -bottom-[1px] bg-[#0c0f16] w-[36px] h-[28px] border-top-left-radius-[16px] border-l border-t border-white/5 z-10" 
           style={{ borderTopLeftRadius: '16px' }} />
    </div>
  );
}
