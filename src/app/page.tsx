import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Skills from '@/components/sections/skills';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Stats from '@/components/sections/stats';
import CreativeSkills from '@/components/sections/creative-skills';
import Footer from '@/components/footer';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProfile } from '@/lib/data';

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="container mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-10 min-h-screen flex flex-col gap-8">
      {/* Availability Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="glass-card flex items-center p-2 rounded-full px-6 h-14 bg-[#151921]/40 border-[#ffffff05] w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            <span className="text-xs font-code text-muted-foreground uppercase tracking-widest">Available for New Projects</span>
          </div>
        </div>
        
        <div className="glass-card flex items-center p-2 rounded-full px-4 h-14 bg-[#151921]/40 border-[#ffffff05]">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20 w-10 h-10 transition-all">
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={20} /></a>
          </Button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20 w-10 h-10 transition-all">
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* ROW 1: Hero Dominance */}
        <div className="col-span-12 lg:col-span-8">
          <Hero />
        </div>

        {/* Column 2: Stats & Skills Overview */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="flex-none">
            <Stats />
          </div>
          <div className="flex-1">
            <Skills />
          </div>
        </div>

        {/* ROW 2: The Centerpiece (Projects) */}
        <div className="col-span-12">
          <Projects />
        </div>

        {/* ROW 3: Experience & Activities */}
        <div className="col-span-12 lg:col-span-7">
          <Experiences />
        </div>

        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          <Activities />
          <CreativeSkills />
        </div>

        {/* Final CTA */}
        <div className="col-span-12">
          <Contact />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
