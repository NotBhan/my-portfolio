import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import CapabilityCard from '@/components/capability-card';
import CreativeSkills from '@/components/sections/creative-skills';

export default async function Home() {
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
    <div className="grid grid-cols-12 gap-[10px] items-stretch content-start pb-4">
      {/* Top Row: IDENTITY | WEB STACK | SYSTEMS + AI */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4 h-full min-h-[140px]">
        <Hero />
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-4 h-full min-h-[140px]">
        <CapabilityCard 
          title="Web Stack" 
          skills={webStack}
          icon="Code2"
        />
      </div>

      <div className="col-span-12 lg:col-span-4 h-full min-h-[140px]">
        <CapabilityCard 
          title="Systems & AI" 
          skills={systemsAI}
          icon="Cpu"
        />
      </div>

      {/* Main Content Area */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-[10px]">
        <Projects />
        <Experiences />
      </div>

      <div className="col-span-12 lg:col-span-4 flex flex-col gap-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-[10px]">
          <Activities />
          <Contact />
        </div>
        <CreativeSkills />
      </div>
    </div>
  );
}