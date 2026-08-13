import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import SidebarRail from '@/components/navbar';
import CapabilityCard from '@/components/capability-card';
import { getProfile } from '@/lib/data';

export default async function Home() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="interface-shell">
        {/* Top Header Rail - Thin structural band */}
        <header className="h-[64px] col-start-2 row-start-1 flex items-center justify-between px-8 border-b border-white/5 bg-[#0c0f16] z-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-[0.2em] font-bold">Available for New Projects</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-[9px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[9px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-[9px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">Resume</a>
          </div>
        </header>

        {/* Sidebar Rail - Fixed vertical panel below header */}
        <aside className="col-start-1 row-start-1 row-end-3 pt-[64px] border-r border-white/5 bg-[#0c0f16] flex flex-col items-center">
          <div className="mt-8 px-2 w-full h-full">
            <SidebarRail />
          </div>
        </aside>

        {/* Main 12-Column Content Surface */}
        <div className="col-start-2 row-start-2 overflow-y-auto p-3 custom-scrollbar bg-[#0c0f16]">
          <div className="grid grid-cols-12 grid-rows-[125px_minmax(430px,auto)] gap-[10px] h-full">
            
            {/* Identity & Top Row Capabilities */}
            <div className="col-span-4 h-full">
              <Hero />
            </div>

            <div className="col-span-4 h-full">
              <CapabilityCard 
                title="Web Stack" 
                skills={[
                  { name: 'React', progress: 90 },
                  { name: 'Next.js', progress: 85 },
                  { name: 'TypeScript', progress: 85 },
                  { name: 'Tailwind', progress: 80 }
                ]}
                icon="Code2"
                carve="bottom-right"
              />
            </div>

            <div className="col-span-4 h-full">
              <CapabilityCard 
                title="Programming + Creative" 
                skills={[
                  { name: 'Python', progress: 75 },
                  { name: 'Django', progress: 70 },
                  { name: 'PostgreSQL', progress: 65 },
                  { name: 'Music Prod.', progress: 80 }
                ]}
                icon="Cpu"
                carve="bottom-right"
              />
            </div>

            {/* Dominant Feature Area - Row 2 */}
            <div className="col-span-8 flex flex-col gap-[10px]">
              <div className="flex-1 relative">
                <Projects />
              </div>
              
              {/* Nested Experience Module at the base of the featured area */}
              <div className="h-[72px] grid grid-cols-2 gap-2 bg-[#11141b] border border-white/5 p-3 rounded-[14px]">
                <div className="flex flex-col justify-center">
                  <span className="text-[7px] font-code text-primary/70 uppercase">Latest Experience</span>
                  <span className="text-[9px] font-bold text-white truncate">Full Stack Intern</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[7px] font-code text-primary/70 uppercase">Independent Dev</span>
                  <span className="text-[9px] font-bold text-white truncate">Software Developer</span>
                </div>
              </div>
            </div>

            {/* Right Stack - Activities + CTA */}
            <div className="col-span-4 grid grid-rows-[1fr_155px] gap-[10px]">
              <Activities />
              <Contact />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
