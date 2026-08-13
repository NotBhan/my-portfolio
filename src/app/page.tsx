import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Skills from '@/components/sections/skills';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Stats from '@/components/sections/stats';
import Footer from '@/components/footer';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <main className="container mx-auto max-w-[1400px] p-6 lg:p-10 min-h-screen flex flex-col gap-6">
      {/* Top Header Reference Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
        <div className="glass-card flex items-center p-2 rounded-full gap-2 px-6 h-16 bg-[#151921]/40 border-[#ffffff05] w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-code text-muted-foreground uppercase tracking-widest">Available for hire</span>
          </div>
        </div>
        
        <div className="glass-card flex items-center p-2 rounded-full gap-2 px-6 h-16 bg-[#151921]/40 border-[#ffffff05]">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20 w-11 h-11 transition-all">
            <a href="https://github.com/NotBhan" target="_blank" rel="noreferrer"><Github size={22} /></a>
          </Button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20 w-11 h-11 transition-all">
            <a href="#" target="_blank" rel="noreferrer"><Linkedin size={22} /></a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* ROW 1: 3-Column Layout from Reference */}
        <div className="lg:col-span-4 h-full">
          <Hero />
        </div>
        <div className="lg:col-span-4 h-full">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1">
              <Stats />
            </div>
            <div className="flex-1">
              <Activities />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 h-full">
          <Skills />
        </div>

        {/* ROW 2: 2-Column Layout (Big Card + Regular Card) from Reference */}
        <div className="lg:col-span-8">
          <Projects />
        </div>
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-1">
              <Experiences />
            </div>
            <div className="flex-none">
              <Contact />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
