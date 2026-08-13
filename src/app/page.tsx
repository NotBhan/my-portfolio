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

  // Curated skills for top row modules
  const webStack = skills.find(s => s.category === 'Frontend')?.skills || [];
  const systemsStack = skills.find(s => s.category === 'Backend & Data')?.skills || [];
  const aiStack = skills.find(s => s.category === 'AI / GenAI')?.skills || [];

  // Filter most important systems/ai tools (max 9 total)
  const combinedSystemsAI = [
    ...systemsStack.filter(s => ['Python', 'Django', 'PostgreSQL', 'Firebase'].includes(s.name)),
    ...aiStack.filter(s => ['Gemini', 'Ollama', 'AI-assisted development'].includes(s.name))
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="interface-shell">
        {/* Top Header Rail - Compact Utility */}
        <header className="h-[64px] col-start-2 row-start-1 flex items-center justify-between px-10 border-b border-white/5 bg-[#0c0f16] z-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <span className="text-[10px] font-code text-muted-foreground uppercase tracking-[0.2em] font-bold">Available for New Projects</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-medium">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-medium">LinkedIn</a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-[10px] font-code text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest border border-white/10 px-4 py-1.5 rounded-full font-bold">Resume</a>
          </div>
        </header>

        {/* Sidebar Rail - Fixed vertical panel */}
        <aside className="col-start-1 row-start-1 row-end-3 pt-[64px] border-r border-white/5 bg-[#0c0f16] flex flex-col items-center">
          <div className="mt-8 px-2 w-full h-full">
            <SidebarRail />
          </div>
        </aside>

        {/* Main 12-Column Content Surface */}
        <div className="col-start-2 row-start-2 overflow-y-auto p-4 custom-scrollbar bg-[#0c0f16]">
          <div className="grid grid-cols-12 grid-rows-[145px_390px_82px] gap-[10px] h-full content-start">
            
            {/* Top Row: IDENTITY | WEB STACK | SYSTEMS + AI */}
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
                skills={combinedSystemsAI}
                icon="Cpu"
                carve="bottom-right"
              />
            </div>

            {/* Dominant Feature Area - Row 2 (8-column Landscape Feature) */}
            <div className="col-span-8 row-start-2 h-full">
              <Projects />
            </div>

            {/* Right Stack: Activities + CTA (4-column Right Column spanning row 2-3) */}
            <div className="col-span-4 row-start-2 row-span-2 grid grid-rows-[1fr_135px] gap-[10px]">
              <Activities />
              <Contact />
            </div>

            {/* Experience Strip - Attached to Feature Bottom */}
            <div className="col-span-8 row-start-3 h-full">
              <Experiences />
            </div>

            {/* Sub-footer Section for Secondary Content */}
            <div className="col-span-12 mt-4 pb-12">
               <div className="grid grid-cols-12 gap-[10px]">
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
