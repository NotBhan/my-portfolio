import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Skills from '@/components/sections/skills';
import CreativeSkills from '@/components/sections/creative-skills';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Footer from '@/components/footer';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <main className="container mx-auto max-w-7xl p-6 min-h-screen flex flex-col gap-6">
      <div className="flex justify-end gap-2 mb-2">
        <div className="glass-card flex items-center p-1 rounded-full gap-2 px-4 h-12">
          <div className="w-8 h-8 rounded-full bg-secondary/50" />
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20">
            <a href="https://github.com/NotBhan" target="_blank"><Github size={18} /></a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20">
            <a href="#" target="_blank"><Linkedin size={18} /></a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <div className="lg:col-span-2">
          <Hero />
        </div>
        <div className="lg:col-span-1">
          <Skills />
        </div>

        {/* Row 2 */}
        <div className="lg:col-span-2">
          <Projects />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Activities />
          <Contact />
        </div>

        {/* Row 3 */}
        <div className="lg:col-span-2">
          <Experiences />
        </div>
        <div className="lg:col-span-1">
          {/* Vacant or reserved for something else as per design */}
        </div>
      </div>
      <Footer />
    </main>
  );
}