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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminPage() {
  const profile = await getProfile();
  const projects = await getProjects();
  const skills = await getSkills();
  const testimonials = await getTestimonials();
  const stats = await getStats();
  const creativeSkills = await getCreativeSkills();

  const sections = [
    { title: 'Edit Profile', component: <ProfileForm profile={profile} /> },
    { title: 'Edit Stats', component: <StatsForm stats={stats} /> },
    { title: 'Edit Projects', component: <ProjectForm projects={projects} /> },
    { title: 'Edit Skills', component: <SkillsForm skills={skills} /> },
    { title: 'Edit Creative Skills', component: <CreativeSkillsForm creativeSkills={creativeSkills} /> },
    { title: 'Edit Testimonials', component: <TestimonialsForm testimonials={testimonials} /> },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {section.component}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
