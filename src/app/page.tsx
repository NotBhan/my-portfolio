
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
import Footer from '@/components/footer';

export default async function Home() {
  const allCreativeSkills = await getCreativeSkills();
  const creativeSkills = allCreativeSkills.filter((s) => s.isVisible);
  const allSocialLinks = await getSocialLinks();
  const socialLinks = allSocialLinks.filter((link) => link.isVisible);

  const showActivities = true;
  const showCreativeSkills = creativeSkills.length > 0;
  const showAbout = socialLinks.length > 0;

  return (
    <main className="container mx-auto max-w-7xl p-2 sm:p-4">
       <div className="text-center my-12 animate-slide-in-down opacity-0" style={{ animationFillMode: 'forwards' }}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground/80 to-foreground">
          CHANDRABHAN'S PORTFOLIO
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div
            className="animate-slide-in-down opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <Hero />
          </div>
          <div
            className="animate-slide-in-up opacity-0"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            <Experiences />
          </div>
           <div
            className="animate-slide-in-up opacity-0"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <Projects />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              {showCreativeSkills && (
                <div
                  className="animate-slide-in-left opacity-0"
                  style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
                >
                  <CreativeSkills />
                </div>
              )}
              {showActivities && (
                <div
                  className="animate-slide-in-left opacity-0"
                  style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
                >
                  <Activities />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="animate-slide-in-right opacity-0"
                style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
              >
                <Testimonials />
              </div>
              <div
                className="animate-slide-in-right opacity-0"
                style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
              >
                <Contact />
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div
            className="animate-slide-in-up opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <Skills />
          </div>
          {showAbout && (
            <div
              className="animate-slide-in-up opacity-0"
              style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
            >
              <About />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
