import BentoCard from '@/components/bento-card';
import { getStats } from '@/lib/data';
import StatsForm from './stats-form';

export default async function EditStatsPage() {
  const stats = await getStats();
  return (
    <BentoCard title="Edit Stats" className="col-span-1 md:col-span-2">
      <StatsForm stats={stats} />
    </BentoCard>
  );
}
