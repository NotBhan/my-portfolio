import BentoCard from '@/components/bento-card';
import { Flame } from 'lucide-react';

export default function Activities() {
  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">My Activities</h3>
        </div>
      }
    >
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-center font-mono text-sm">
          Coming Soon...
        </p>
      </div>
    </BentoCard>
  );
}
