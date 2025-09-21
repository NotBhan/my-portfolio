import About from '@/components/sections/about';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Hero from '@/components/sections/hero';
import Experiences from '@/components/sections/experience';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Stats from '@/components/sections/stats';
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
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-6xl">
        {/* Small Screen Layout */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          <Hero />
          <Experiences />
          <Projects />
          <Skills />
          <Stats />
          <Testimonials />
          {showActivities && <Activities />}
          {showCreativeSkills && <CreativeSkills />}
          {showAbout && <About />}
          <Contact />
        </div>

        {/* Large Screen Layout - New Bento Design */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-5 gap-4">
          <div className="col-span-4">
            <Stats />
          </div>
          <div className="col-span-3 row-span-2">
            <Hero />
          </div>
          <div className="col-span-1 row-span-2">
            <Skills />
          </div>
          <div className="col-span-4">
            <Projects />
          </div>
          <div className="col-span-2">
            <Experiences />
          </div>
          <div className="col-span-2 row-span-2">
            <Testimonials />
          </div>
          <div className="col-span-1">
            {showAbout && <About />}
          </div>
          <div className="col-span-1">
            <Contact />
          </div>
          <div className="col-span-1">
            {showActivities && <Activities />}
          </div>
          <div className="col-span-1">
            {showCreativeSkills && <CreativeSkills />}
          </div>
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
