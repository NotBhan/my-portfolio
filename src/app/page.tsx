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
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-4">
            <div
              className="animate-slide-in-down"
              style={{ animationDelay: '100ms' }}
            >
              <Hero />
            </div>
            <div
              className="animate-slide-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <Experiences />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                {showCreativeSkills && (
                  <div
                    className="animate-slide-in-left"
                    style={{ animationDelay: '500ms' }}
                  >
                    <CreativeSkills />
                  </div>
                )}
                {showActivities && (
                  <div
                    className="animate-slide-in-left"
                    style={{ animationDelay: '700ms' }}
                  >
                    <Activities />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div
                  className="animate-slide-in-right"
                  style={{ animationDelay: '600ms' }}
                >
                  <Testimonials />
                </div>
                <div
                  className="animate-slide-in-right"
                  style={{ animationDelay: '800ms' }}
                >
                  <Contact />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <Projects />
          </div>
          <div
            className="animate-slide-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <Skills />
          </div>
          {showAbout && (
            <div
              className="animate-slide-in-up"
              style={{ animationDelay: '900ms' }}
            >
              <About />
            </div>
          )}
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
