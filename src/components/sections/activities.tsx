import BentoCard from '@/components/bento-card';
import { getActivities } from '@/lib/data';
import { Award, Users, Trophy } from 'lucide-react';

export default async function Activities() {
  const allActivities = await getActivities();
  const activities = allActivities.filter((a) => a.isVisible);

  return (
    <BentoCard
      title="Leadership & Activities"
      icon={<Award size={20} className="text-primary/70" />}
      className="bg-[#151921]/60 p-8 h-full"
    >
      <div className="space-y-8 mt-4">
        <div className="flex gap-5 group">
          <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0 border-white/5 bg-primary/10 text-primary">
            <Users size={22} />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">Team Leadership</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Led a 4-person team developing **StudentVoice**, an anonymous campus feedback platform.
            </p>
          </div>
        </div>

        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-5 group">
            <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0 border-white/5 bg-secondary/20 text-primary/60">
              <Trophy size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">{activity.title}</h4>
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
