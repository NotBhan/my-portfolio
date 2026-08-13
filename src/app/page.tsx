import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Skills from '@/components/sections/skills';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Footer from '@/components/footer';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <main className="container mx-auto max-w-[1400px] p-8 min-h-screen flex flex-col gap-8">
      {/* Top Header Row */}
      <div className="flex justify-end gap-3 mb-2">
        <div className="glass-card flex items-center p-2 rounded-full gap-2 px-6 h-14 bg-[#151921]/40 border-[#ffffff05]">
          <div className="w-10 h-2 bg-secondary/30 rounded-full mr-4" />
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20 w-10 h-10">
            <a href="https://github.com/NotBhan" target="_blank" rel="noreferrer"><Github size={20} /></a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20 w-10 h-10">
            <a href="#" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Row 1: Hero & Skills */}
        <div className="lg:col-span-8">
          <Hero />
        </div>
        <div className="lg:col-span-4">
          <Skills />
        </div>

        {/* Row 2: Projects & Activities */}
        <div className="lg:col-span-8">
          <Projects />
        </div>
        <div className="lg:col-span-4">
          <Activities />
        </div>

        {/* Row 3: Experiences & Contact */}
        <div className="lg:col-span-8">
          <Experiences />
        </div>
        <div className="lg:col-span-4">
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}