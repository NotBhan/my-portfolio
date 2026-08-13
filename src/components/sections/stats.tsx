import * as LucideIcons from 'lucide-react';
import BentoCard from '../bento-card';
import { getStats } from '@/lib/data';
import { Stat } from '@/lib/definitions';

function isLucideIcon(key: string): key is keyof typeof LucideIcons {
  return key in LucideIcons;
}

const StatIcon = ({ name }: { name: string }) => {
  if (isLucideIcon(name)) {
    const Icon = LucideIcons[name] as React.ElementType;
    return <Icon className="h-6 w-6 text-primary" />;
  }
  return <LucideIcons.Activity className="h-6 w-6 text-primary" />;
};

export default async function Stats() {
  const allStats: Stat[] = await getStats();
  const stats = allStats.filter(s => s.isVisible);

  return (
    <BentoCard 
      title="Quick Stats" 
      icon={<LucideIcons.LineChart size={20} className="text-primary/70" />}
      className="bg-[#151921]/60 p-6 h-full justify-center"
    >
      <div className="grid grid-cols-2 gap-4">
        {stats.length > 0 ? (
          stats.map((stat) => (
            <div key={stat.id} className="glass-card p-4 flex flex-col items-center justify-center gap-2 border-white/5 bg-secondary/10 hover:bg-secondary/20 transition-colors">
              <StatIcon name={stat.icon} />
              <div className="text-center">
                <p className="text-2xl font-bold text-white leading-none">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-tighter text-muted-foreground mt-1 font-code">{stat.label}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-4 gap-3 opacity-50">
            <LucideIcons.Activity size={32} className="text-muted-foreground" />
            <p className="text-xs font-code text-center">Continuous improvement in progress...</p>
          </div>
        )}
      </div>
    </BentoCard>
  );
}
