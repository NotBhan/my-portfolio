import BentoCard from '@/components/bento-card';
import { getExperiences } from '@/lib/data';
import ExperiencesForm from './experiences-form';

export default async function EditExperiencesPage() {
  const experiences = await getExperiences();
  return (
    <BentoCard title="Edit Experiences" className="col-span-1 md:col-span-2">
      <ExperiencesForm experiences={experiences} />
    </BentoCard>
  );
}
