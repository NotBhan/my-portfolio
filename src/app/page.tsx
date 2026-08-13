import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import Sidebar from '@/components/navbar';
import CapabilityCard from '@/components/capability-card';
import { getProfile } from '@/lib/data';

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="interface-shell flex">
        {/* Sidebar Rail - Anchored below header as per reference */}
        <div className="w-[72px] shrink-0 pt-24 pb-4 px-2 h-full border-r border-white/5 bg-[#0c0f16]">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col relative">
          {/* Top Utility Area - Thin structural band */}
          <header className="h-[70px] flex items-center justify-between px-8 border-b border-white/5 shrink-0 bg-[#0c0f16] z-20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-[10px] font-code text-muted-foreground uppercase tracking-[0.2em] font-bold">Available for New Projects</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">Resume</a>
            </div>
          </header>

          {/* Main Bento Composition Surface */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar bg-[#0c0f16]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-full">
              
              {/* Identity Row */}
              <div className="lg:col-span-3">
                <Hero />
              </div>

              {/* Capability Tier - Row 1 of content */}
              <CapabilityCard 
                title="Web Stack" 
                skills={['React', 'Next.js', 'TypeScript', 'Tailwind']}
                icon="Code2"
                carve="bottom-right"
              />
              <CapabilityCard 
                title="Programming" 
                skills={['Python', 'Django', 'PostgreSQL', 'Firebase']}
                icon="Server"
                carve="bottom-right"
              />
              <CapabilityCard 
                title="Creative" 
                skills={['Music Prod.', 'Sound Design', 'FL Studio']}
                icon="Music"
                carve="bottom-right"
              />

              {/* Dominant Feature Area - Row 2 */}
              <div className="lg:col-span-2 row-span-2 flex flex-col gap-3">
                <div className="flex-1 min-h-[400px]">
                  <Projects />
                </div>
                {/* Nested Experience Module */}
                <div className="h-32">
                  <Experiences />
                </div>
              </div>

              {/* Side Modules - Activities + CTA Stack */}
              <div className="lg:col-span-1 flex flex-col gap-3">
                <div className="flex-1">
                  <Activities />
                </div>
                <Contact />
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
