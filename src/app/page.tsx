import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import SidebarRail from '@/components/navbar';
import CapabilityCard from '@/components/capability-card';
import CreativeSkills from '@/components/sections/creative-skills';
import { getProfile, getSkills } from '@/lib/data';

export default async function Home() {
  const profile = await getProfile();
  const skills = await getSkills();

  const webStack = skills.find(s => s.category === 'Frontend')?.skills || [];
  const progStack = [
    ...(skills.find(s => s.category === 'Backend & Data')?.skills || []),
    ...(skills.find(s => s.category === 'AI / GenAI')?.skills || []),
    ...(skills.find(s => s.category === 'Tools')?.skills || [])
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="interface-shell">
        {/* Top Header Rail - Compact Utility */}
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

        {/* Sidebar Rail - Fixed vertical panel */}
        <aside className="col-start-1 row-start-1 row-end-3 pt-[64px] border-r border-white/5 bg-[#0c0f16] flex flex-col items-center">
          <div className="mt-8 px-2 w-full h-full">
            <SidebarRail />
          </div>
        </aside>

        {/* Main 12-Column Content Surface */}
        <div className="col-start-2 row-start-2 overflow-y-auto p-3 custom-scrollbar bg-[#0c0f16]">
          <div className="grid grid-cols-12 grid-rows-[112px_285px_68px] gap-[9px] h-full content-start">
            
            {/* Top Row: Exactly Three Modules (4-4-4) */}
            <div className="col-span-4 h-full">
              <Hero />
            </div>

            <div className="col-span-4 h-full">
              <CapabilityCard 
                title="Web Stack" 
                skills={webStack}
                icon="Code2"
                carve="bottom-right"
              />
            </div>

            <div className="col-span-4 h-full">
              <CapabilityCard 
                title="Systems & AI" 
                skills={progStack}
                icon="Cpu"
                carve="bottom-right"
              />
            </div>

            {/* Dominant Feature Area - Row 2 (8-column Landscape Feature) */}
            <div className="col-span-8 row-start-2 h-full">
              <Projects />
            </div>

            {/* Right Stack: Activities + CTA (4-column Right Column spanning row 2-3) */}
            <div className="col-span-4 row-start-2 row-span-2 grid grid-rows-[1fr_125px] gap-[9px]">
              <Activities />
              <Contact />
            </div>

            {/* Nested Experience Strip - Attached to Feature Bottom */}
            <div className="col-span-8 row-start-3 h-full">
              <Experiences />
            </div>

            {/* Sub-footer Section for Secondary Content */}
            <div className="col-span-12 mt-2 pb-12">
               <div className="grid grid-cols-12 gap-[9px]">
                  <div className="col-span-12">
                    <CreativeSkills />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}