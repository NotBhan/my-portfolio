import BentoCard from '@/components/bento-card';
import { getActivities } from '@/lib/data';
import ActivitiesForm from './activities-form';

export default async function EditActivitiesPage() {
  const activities = await getActivities();
  return (
    <BentoCard title="Edit Activities" className="col-span-1 md:col-span-2">
      <ActivitiesForm activities={activities} />
    </BentoCard>
  );
}
