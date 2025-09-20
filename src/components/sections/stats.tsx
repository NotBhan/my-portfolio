import { Briefcase, Heart, Star } from 'lucide-react';
import BentoCard from '../bento-card';

const stats = [
  {
    value: '56+',
    label: 'Projects',
    icon: Briefcase,
  },
  {
    value: '23+',
    label: 'Happy Clients',
    icon: Heart,
  },
  {
    value: '06+',
    label: 'Year Expertise',
    icon: Star,
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <BentoCard key={index} className="p-4 items-center justify-center flex-row gap-4">
          <stat.icon className="h-8 w-8 text-primary" />
          <div className="text-center">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </BentoCard>
      ))}
    </div>
  );
}
