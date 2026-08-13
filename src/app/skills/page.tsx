import { getSkills } from '@/lib/data';
import { Code2, Server, BrainCircuit, Sparkles, Terminal, Database, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default async function SkillsPage() {
  const skillCategories = await getSkills();

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('front')) return <Code2 size={24} />;
    if (cat.includes('back')) return <Server size={24} />;
    if (cat.includes('ai')) return <BrainCircuit size={24} />;
    if (cat.includes('tool')) return <Terminal size={24} />;
    if (cat.includes('data')) return <Database size={24} />;
    return <Sparkles size={24} />;
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Terminal size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Capabilities</h1>
          <p className="text-sm text-muted-foreground font-medium">My technical stack and specialization areas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        {skillCategories.map((cat) => (
          <div key={cat.category} className="bento-card p-8 flex flex-col gap-6 bg-[#11141b]/40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                {getIcon(cat.category)}
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-[0.1em]">{cat.category}</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {cat.skills.filter(s => s.isVisible).map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1.5 group">
                  <Badge className="px-5 py-2.5 bg-white/5 border-white/5 text-sm text-white/80 hover:bg-primary/20 hover:text-white hover:border-primary/30 transition-all rounded-xl cursor-default">
                    {skill.name}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
