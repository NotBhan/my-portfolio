import * as LucideIcons from 'lucide-react';
import BentoCard from '@/components/bento-card';
import { getActivities } from '@/lib/data';
import { Flame } from 'lucide-react';
import type { Activity } from '@/lib/definitions';

function isLucideIcon(key: string): key is keyof typeof LucideIcons {
  return key in LucideIcons;
}

const ActivityIcon = ({ name, className }: { name: string; className?: string }) => {
  if (isLucideIcon(name)) {
    const Icon = LucideIcons[name] as React.ElementType;
    return <Icon className={className} />;
  }
  return <LucideIcons.AlertCircle className={className} />;
};

export default async function Activities() {
  const allActivities = await getActivities();
  const activities: Activity[] = allActivities.filter((a) => a.isVisible);

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">My Activities</h3>
        </div>
      }
    >
      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <ActivityIcon name={activity.icon} className="h-6 w-6 text-primary mt-1" />
              <div className='flex-1'>
                <h4 className="font-semibold text-sm">{activity.title}</h4>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center font-mono text-sm">
            Coming Soon...
          </p>
        </div>
      )}
    </BentoCard>
  );
}
