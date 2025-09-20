import * as LucideIcons from 'lucide-react';
import BentoCard from '../bento-card';
import { getStats } from '@/lib/data';
import { Stat } from '@/lib/definitions';

// A type guard to check if a key is a valid Lucide icon name
function isLucideIcon(key: string): key is keyof typeof LucideIcons {
  return key in LucideIcons;
}

const StatIcon = ({ name }: { name: string }) => {
  if (isLucideIcon(name)) {
    const Icon = LucideIcons[name] as React.ElementType;
    return <Icon className="h-8 w-8 text-primary" />;
  }
  // Return a default icon or null if the icon name is not valid
  return <LucideIcons.AlertCircle className="h-8 w-8 text-destructive" />;
};


export default async function Stats() {
    const stats: Stat[] = await getStats();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <BentoCard key={stat.id} className="p-4 items-center justify-center flex-row gap-4">
          <StatIcon name={stat.icon} />
          <div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </BentoCard>
      ))}
    </div>
  );
}
