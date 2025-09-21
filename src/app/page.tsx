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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          <div className="lg:col-span-3">
            <Stats />
          </div>
          <div className="md:col-span-2 lg:col-span-2 row-span-2">
            <Hero />
          </div>
          <div className="row-span-1">
            <Projects />
          </div>
          <div className="row-span-1">
            <CreativeSkills />
          </div>
          <div className="md:col-span-2 lg:col-span-2 row-span-2">
            <Experiences />
          </div>
          <div className="row-span-2">
             <Testimonials />
          </div>
           <div className="row-span-1">
             <About />
          </div>
           <div className="md:col-span-2 lg:col-span-2 row-span-2">
            <Skills />
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Activities />
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
