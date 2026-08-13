import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import CreativeSkills from '@/components/sections/creative-skills';
import Sidebar from '@/components/navbar';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProfile } from '@/lib/data';
import CapabilityCard from '@/components/capability-card';

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen flex items-center justify-center p-4 lg:p-12">
      <div className="w-full max-w-[1400px] interface-shell flex h-full min-h-[90vh]">
        {/* Sidebar integrated into shell */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0c0f16]">
          
          {/* Top Bar Utility */}
          <header className="flex h-16 items-center justify-between px-8 border-b border-white/[0.03] bg-[#11141b]/40">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-[10px] font-code text-muted-foreground uppercase tracking-[0.2em] font-bold">Available for New Projects</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-xs font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</a>
              <div className="w-px h-3 bg-white/10" />
              <span className="text-xs font-code text-muted-foreground uppercase tracking-widest cursor-pointer hover:text-white transition-colors font-bold">Resume</span>
            </div>
          </header>

          {/* Primary Bento Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-8 lg:p-10 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 auto-rows-auto">
              
              {/* Row 1: Hero Dominance */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <Hero />
              </div>

              {/* Row 2: Capability Tier */}
              <CapabilityCard 
                title="Web Stack" 
                skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']}
                icon="Code2"
              />
              <CapabilityCard 
                title="Programming" 
                skills={['Python', 'C++', 'C', 'Django', 'PostgreSQL']}
                icon="Server"
              />
              <CapabilityCard 
                title="Creative" 
                skills={['Music Production', 'Sound Design', 'FL Studio']}
                icon="Music"
              />

              {/* Row 3: Feature & Sidebar Content */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 flex flex-col gap-4">
                <Projects />
                <Experiences />
              </div>

              <div className="col-span-1 flex flex-col gap-4">
                <Activities />
                <Contact />
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}