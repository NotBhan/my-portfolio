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

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-3 hidden lg:block">
            <Stats />
          </div>
          <div className="lg:col-span-2 order-1 lg:order-none">
            <Hero />
          </div>
          <div className="lg:col-span-2 order-2 lg:order-none">
            <Experiences />
          </div>
          <div className="lg:col-span-1 order-3 lg:order-none">
            <Projects />
          </div>
          <div className="lg:col-span-1 order-4 lg:order-none">
            <Skills />
          </div>
          <div className="lg:col-span-1 order-5 block lg:hidden">
              <Stats />
          </div>
          <div className="lg:col-span-2 order-6 lg:order-none">
            <Testimonials />
          </div>
          <div className="lg:col-span-2 order-7 lg:order-none grid grid-cols-2 md:grid-cols-2 gap-4">
            <Activities />
            <CreativeSkills />
          </div>
          <div className="lg:col-span-1 order-8 lg:order-none hidden lg:block">
            <CreativeSkills />
          </div>
          <div className="lg:col-span-1 order-9 lg:order-none">
            <About />
          </div>
          <div className="lg:col-span-2 order-10 lg:order-none grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="hidden lg:block">
              <Stats />
            </div>
            <div className="hidden lg:block">
              <Activities />
            </div>
            <div className="col-span-1 md:col-span-1">
              <Contact />
            </div>
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
