import BentoCard from '@/components/bento-card';
import { getProjects } from '@/lib/data';
import ProjectForm from './project-form';

export default async function EditProjectsPage() {
  const projects = await getProjects();
  return (
    <BentoCard title="Edit Projects" className="col-span-1 md:col-span-2">
      <ProjectForm projects={projects} />
    </BentoCard>
  );
}
