import BentoCard from '@/components/bento-card';
import { getHomeCards } from '@/lib/data';
import HomeCardsForm from './home-cards-form';

export default async function EditHomeCardsPage() {
  const homeCards = await getHomeCards();
  return (
    <BentoCard title="Edit Home Capability Cards" className="col-span-1 md:col-span-2">
      <HomeCardsForm homeCards={homeCards} />
    </BentoCard>
  );
}
