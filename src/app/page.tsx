import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import SidebarRail from '@/components/navbar';
import CapabilityCard from '@/components/capability-card';
import CreativeSkills from '@/components/sections/creative-skills';
import { getProfile, getSkills } from '@/lib/data';
import { Github, Linkedin } from 'lucide-react';

export default async function Home() {
  const profile = await getProfile();
  const skills = await getSkills();

  // Curated skills for top row modules
  const webStack = [
    { name: 'React', isVisible: true },
    { name: 'Next.js', isVisible: true },
    { name: 'TypeScript', isVisible: true },
    { name: 'JavaScript', isVisible: true },
    { name: 'Tailwind CSS', isVisible: true },
    { name: 'HTML/CSS', isVisible: true }
  ];

  const systemsAI = [
    { name: 'Python', isVisible: true },
    { name: 'Django', isVisible: true },
    { name: 'Firebase', isVisible: true },
    { name: 'Gemini', isVisible: true },
    { name: 'Ollama', isVisible: true },
    { name: 'AI-assisted Development', isVisible: true }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="interface-shell">
        {/* Top Header Rail — Redesigned for Bento Architecture */}
        <header className="h-[80px] col-start-2 row-start-1 flex items-center px-6 z-20 gap-3 bg-transparent">
          <div className="flex-1 h-[54px] bg-[#11141b]/40 border border-white/5 rounded-2xl flex items-center px-10 relative group">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span className="text-[10px] font-code text-muted-foreground uppercase tracking-[0.25em] font-black">Available for New Projects</span>
            </div>
          </div>
          
          <div className="h-[54px] bg-[#11141b] border border-white/10 rounded-2xl flex items-center gap-6 px-8 shadow-2xl relative transition-all hover:border-white/20">
            <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
              <Github size={18} strokeWidth={1.5} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
            <div className="w-px h-4 bg-white/10" />
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-[11px] font-code text-muted-foreground hover:text-primary transition-all uppercase tracking-widest font-bold border border-white/10 px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10">
              Resume
            </a>
          </div>
        </header>

        {/* Sidebar Rail */}
        <aside className="col-start-1 row-start-1 row-end-3 pt-[64px] border-r border-white/5 bg-[#0c0f16] flex flex-col items-center">
          <div className="mt-8 px-2 w-full h-full">
            <SidebarRail />
          </div>
        </aside>

        {/* Main 12-Column Content Surface */}
        <div className="col-start-2 row-start-2 overflow-y-auto p-4 custom-scrollbar bg-[#0c0f16]">
          <div className="grid grid-cols-12 gap-[10px] items-start content-start pb-12">
            
            {/* Top Row: IDENTITY | WEB STACK | SYSTEMS + AI */}
            <div className="col-span-4">
              <Hero />
            </div>

            <div className="col-span-4">
              <CapabilityCard 
                title="Web Stack" 
                skills={webStack}
                icon="Code2"
              />
            </div>

            <div className="col-span-4">
              <CapabilityCard 
                title="Systems & AI" 
                skills={systemsAI}
                icon="Cpu"
              />
            </div>

            {/* Main Content Area - Detached Stacked columns */}
            <div className="col-span-8 flex flex-col gap-[10px]">
              <Projects />
              <Experiences />
            </div>

            <div className="col-span-4 flex flex-col gap-[10px]">
              <Activities />
              <Contact />
              <CreativeSkills />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
