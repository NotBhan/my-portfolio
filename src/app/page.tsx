import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Experiences from '@/components/sections/experience';
import Activities from '@/components/sections/activities';
import Contact from '@/components/sections/contact';
import CapabilityCard from '@/components/capability-card';
import CreativeSkills from '@/components/sections/creative-skills';
import { getHomeCards } from '@/lib/data';

export default async function Home() {
  const allHomeCards = await getHomeCards();
  const visibleCards = allHomeCards.filter(c => c.isVisible !== false);

  const defaultCards = [
    {
      id: '1',
      title: 'Web Stack',
      icon: 'Code2',
      isVisible: true,
      skills: [
        { name: 'React', isVisible: true },
        { name: 'Next.js', isVisible: true },
        { name: 'TypeScript', isVisible: true },
        { name: 'JavaScript', isVisible: true },
        { name: 'Tailwind CSS', isVisible: true },
        { name: 'HTML/CSS', isVisible: true }
      ]
    },
    {
      id: '2',
      title: 'Systems & AI',
      icon: 'Cpu',
      isVisible: true,
      skills: [
        { name: 'Python', isVisible: true },
        { name: 'Django', isVisible: true },
        { name: 'Firebase', isVisible: true },
        { name: 'Gemini', isVisible: true },
        { name: 'Ollama', isVisible: true },
        { name: 'AI-assisted Development', isVisible: true }
      ]
    }
  ];

  const cards = visibleCards.length > 0 ? visibleCards : defaultCards;

  return (
    <div className="grid grid-cols-12 gap-[10px] items-stretch content-start pb-4">
      {/* Top Row: IDENTITY | CAPABILITY CARDS */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4 h-full min-h-[140px]">
        <Hero />
      </div>

      {cards.map((card, index) => (
        <div 
          key={card.id} 
          className={
            index === 0 
              ? "col-span-12 md:col-span-6 lg:col-span-4 h-full min-h-[140px]" 
              : "col-span-12 lg:col-span-4 h-full min-h-[140px]"
          }
        >
          <CapabilityCard 
            title={card.title} 
            skills={card.skills}
            icon={card.icon}
          />
        </div>
      ))}

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