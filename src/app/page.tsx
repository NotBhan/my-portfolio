import About from '@/components/sections/about';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Hero from '@/components/sections/hero';
import Experiences from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Testimonials from '@/components/sections/testimonials';
import CreativeSkills from '@/components/sections/creative-skills';
import { getCreativeSkills, getSocialLinks } from '@/lib/data';

export default async function Home() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);
  const allSocialLinks = await getSocialLinks();
  const socialLinks = allSocialLinks.filter((link) => link.isVisible);

  const showActivities = true;
  const showCreativeSkills = creativeSkills.length > 0;
  const showAbout = socialLinks.length > 0;

  return (
    <main className="relative flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><Hero /></div>
          <div className="row-span-2"><Skills /></div>
          <div className="lg:col-span-2"><Experiences /></div>
          <div className="lg:col-span-2"><Projects /></div>
          <div className="row-span-2"><Testimonials /></div>
          {showAbout && <div className="lg:col-span-1"><About /></div>}
          <div className="lg:col-span-1"><Contact /></div>
          {showCreativeSkills && <div className="lg:col-span-1"><CreativeSkills /></div>}
          {showActivities && <div className="lg:col-span-1"><Activities /></div>}
        </div>
      </div>
      <footer className="mt-12 text-center text-muted-foreground font-code text-sm">
        <p>
          &copy; {new Date().getFullYear()} Chandrabhan. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
