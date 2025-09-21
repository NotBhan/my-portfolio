import BentoCard from '@/components/bento-card';
import { getSkills } from '@/lib/data';
import SkillsForm from './skills-form';

export default async function EditSkillsPage() {
  const skills = await getSkills();
  return (
    <BentoCard title="Edit Skills" className="col-span-1 md:col-span-2">
      <SkillsForm skills={skills} />
    </BentoCard>
  );
}
