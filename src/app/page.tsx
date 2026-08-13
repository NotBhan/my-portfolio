import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Sidebar from '@/components/navbar';
import { getProfile } from '@/lib/data';
import CapabilityCard from '@/components/capability-card';

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen flex items-center justify-center p-2 lg:p-4 overflow-hidden">
      <div className="interface-shell">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden bg-[#0c0f16] relative">
          {/* Top Utility Area */}
          <header className="flex h-12 items-center justify-between px-8 border-b border-white/[0.03] bg-[#0c0f16] z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-[9px] font-code text-muted-foreground uppercase tracking-[0.2em] font-bold">Available for New Projects</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</a>
            </div>
          </header>

          {/* Main Bento Composition */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 auto-rows-min h-full">
              
              {/* Profile / Identity Area */}
              <div className="col-span-1 lg:col-span-3">
                <Hero />
              </div>

              {/* Three Top Capability Modules */}
              <CapabilityCard 
                title="Web Stack" 
                skills={['React', 'Next.js', 'TypeScript', 'Tailwind']}
                icon="Code2"
                extension="right"
              />
              <CapabilityCard 
                title="Programming" 
                skills={['Python', 'Django', 'PostgreSQL', 'Firebase']}
                icon="Server"
                extension="bottom"
              />
              <CapabilityCard 
                title="Creative" 
                skills={['Music Prod.', 'Sound Design', 'FL Studio']}
                icon="Music"
                extension="left"
              />

              {/* Large Feature Anchor */}
              <div className="col-span-1 lg:col-span-2 row-span-2 relative">
                <Projects />
                {/* Nested Experience Module */}
                <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-80 z-20">
                  <Experiences />
                </div>
              </div>

              {/* Supporting Side Modules */}
              <div className="col-span-1 space-y-3">
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