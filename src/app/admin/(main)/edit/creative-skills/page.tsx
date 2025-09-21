import BentoCard from '@/components/bento-card';
import { getCreativeSkills } from '@/lib/data';
import CreativeSkillsForm from './creative-skills-form';

export default async function EditCreativeSkillsPage() {
  const creativeSkills = await getCreativeSkills();
  return (
    <BentoCard title="Edit Creative Skills" className="col-span-1 md:col-span-2">
      <CreativeSkillsForm creativeSkills={creativeSkills} />
    </BentoCard>
  );
}
