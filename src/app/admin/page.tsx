import BentoCard from '@/components/bento-card';
import {
  getProfile,
  getProjects,
  getSkills,
  getTestimonials,
  getStats,
  getCreativeSkills,
} from '@/lib/data';

import ProfileForm from './(main)/edit/profile/profile-form';
import ProjectForm from './(main)/edit/projects/project-form';
import SkillsForm from './(main)/edit/skills/skills-form';
import TestimonialsForm from './(main)/edit/testimonials/testimonials-form';
import StatsForm from './(main)/edit/stats/stats-form';
import CreativeSkillsForm from './(main)/edit/creative-skills/creative-skills-form';

export default async function AdminPage() {
  const profile = await getProfile();
  const projects = await getProjects();
  const skills = await getSkills();
  const testimonials = await getTestimonials();
  const stats = await getStats();
  const creativeSkills = await getCreativeSkills();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BentoCard title="Edit Profile" className="lg:col-span-2">
        <ProfileForm profile={profile} />
      </BentoCard>

      <BentoCard title="Edit Stats">
        <StatsForm stats={stats} />
      </BentoCard>

      <BentoCard title="Edit Projects" className="lg:col-span-3">
        <ProjectForm projects={projects} />
      </BentoCard>

      <BentoCard title="Edit Skills" className="lg:col-span-2">
        <SkillsForm skills={skills} />
      </BentoCard>

      <BentoCard title="Edit Creative Skills">
        <CreativeSkillsForm creativeSkills={creativeSkills} />
      </BentoCard>

      <BentoCard title="Edit Testimonials" className="lg:col-span-3">
        <TestimonialsForm testimonials={testimonials} />
      </BentoCard>
    </div>
  );
}
