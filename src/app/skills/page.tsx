'use client';
import { useMemo } from 'react';
import { useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Code2, Server, BrainCircuit, Sparkles, Terminal, Database, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SkillsPage() {
  const firestore = useFirestore();

  const skillsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'skills'), orderBy('category', 'asc'));
  }, [firestore]);

  const { data: skillCategories, loading } = useCollection(skillsQuery);

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('front')) return <Code2 size={16} />;
    if (cat.includes('back')) return <Server size={16} />;
    if (cat.includes('ai')) return <BrainCircuit size={16} />;
    if (cat.includes('tool')) return <Terminal size={16} />;
    if (cat.includes('data')) return <Database size={16} />;
    return <Sparkles size={16} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <Terminal className="text-muted-foreground w-8 h-8" />
          <span className="text-[10px] font-code text-muted-foreground uppercase tracking-widest font-bold">Loading Capabilities...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
          <Terminal size={18} />
        </div>
        <div>
          <h1 className="text-lg font-black text-foreground uppercase tracking-tight leading-tight">Capabilities</h1>
          <p className="text-[11px] text-muted-foreground font-medium">Technical stack and specialization areas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        {skillCategories?.map((cat) => (
          <div key={cat.category} className="bento-card p-5 flex flex-col gap-4 bg-card/40 hover:bg-card/60 transition-colors border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                {getIcon(cat.category)}
              </div>
              <h2 className="text-[13px] font-black text-foreground uppercase tracking-wider">{cat.category}</h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.filter((s: any) => s.isVisible).map((skill: any) => (
                <Badge 
                  key={skill.name} 
                  variant="secondary"
                  className="px-2.5 py-0.5 bg-muted/30 border-border/50 text-[10px] text-foreground font-bold uppercase tracking-wide hover:bg-primary/10 hover:text-primary transition-all rounded-lg cursor-default"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
