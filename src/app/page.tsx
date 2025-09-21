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
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-4">
            <Stats />
          </div>
          <div className="md:col-span-3">
            <Hero />
          </div>
          <div className="md:col-span-1 row-span-2 flex flex-col gap-4">
              <Projects />
              <Activities />
              <CreativeSkills />
              <Testimonials />
          </div>
          <div className="md:col-span-3">
            <Experiences />
          </div>
          <div className="md:col-span-2">
            <Skills />
          </div>
           <div className="md:col-span-1">
            <About />
          </div>
           <div className="md:col-span-2">
            <Contact />
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
