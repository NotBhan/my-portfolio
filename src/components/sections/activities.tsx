import BentoCard from '@/components/bento-card';
import { getActivities } from '@/lib/data';
import { Zap, Calendar } from 'lucide-react';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible);

  return (
    <BentoCard
      title="My Activities"
      icon={<Zap size={16} />}
      headerAction={<div className="w-4 h-4 rounded-full bg-primary glow-purple" />}
    >
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center shrink-0 border-[#30363d]/30 bg-secondary/20">
              <Calendar size={18} className="text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold">{activity.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}