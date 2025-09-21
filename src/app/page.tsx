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
import { cn } from '@/lib/utils';

export default async function Home() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);
  const allSocialLinks = await getSocialLinks();
  const socialLinks = allSocialLinks.filter((link) => link.isVisible);

  const showActivities = true; // This can be replaced with actual logic later
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
          <div
            className={cn('grid grid-cols-1 gap-4', {
              'md:grid-cols-2': showActivities && showCreativeSkills,
            })}
          >
            {showActivities && (
              <div
                className={cn({
                  'md:col-span-2': !showCreativeSkills,
                })}
              >
                <Activities />
              </div>
            )}
            {showCreativeSkills && (
              <div
                className={cn({
                  'md:col-span-2': !showActivities,
                })}
              >
                <CreativeSkills />
              </div>
            )}
          </div>
          <div
            className={cn('grid grid-cols-1 gap-4', {
              'md:grid-cols-2': showAbout,
            })}
          >
            {showAbout && (
              <div
                className={cn({
                  'md:col-span-2': true,
                })}
              >
                <About />
              </div>
            )}
            <div className="md:col-span-2">
              <Contact />
            </div>
          </div>
        </div>

        {/* Large Screen Layout */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-5 gap-4 h-[calc(100vh-6rem)]">
          <div className="col-span-2 row-span-2">
            <Hero />
          </div>
          <div className="col-span-1 row-span-2">
            <Skills />
          </div>
          <div className="col-span-1 row-span-1">
            <About />
          </div>
          <div className="col-span-1 row-span-1">
            <Contact />
          </div>
          <div className="col-span-2 row-span-2">
            <Experiences />
          </div>
          <div className="col-span-1 row-span-1">
            <Projects />
          </div>
          <div className="col-span-1 row-span-1">
            <Testimonials />
          </div>
          <div className="col-span-1 row-span-1">
            <CreativeSkills />
          </div>
          <div className="col-span-1 row-span-1">
            <Activities />
          </div>
          <div className='col-span-2 row-span-1'>
            <Stats />
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
