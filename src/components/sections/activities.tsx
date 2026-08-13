import BentoCard from '@/components/bento-card';
import { getActivities } from '@/lib/data';
import { Zap, Calendar } from 'lucide-react';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible);

  return (
    <BentoCard
      title="My Activities"
      icon={<Zap size={20} className="text-primary/70" />}
      headerAction={<div className="w-5 h-5 rounded-full bg-primary glow-purple" />}
      className="bg-[#151921]/60 p-8 h-full"
    >
      <div className="space-y-10 mt-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-6">
            <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center shrink-0 border-white/5 bg-secondary/20">
              <Calendar size={24} className="text-primary/60" />
            </div>
            <div className="space-y-2 pt-1">
              <h4 className="text-lg font-bold text-white leading-tight">{activity.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}