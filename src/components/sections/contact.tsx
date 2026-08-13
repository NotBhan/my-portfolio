import BentoCard from '@/components/bento-card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <BentoCard className="relative overflow-hidden group bg-[#151921]/60 p-8 h-full">
      <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-primary/15 blur-[100px] rounded-full" />
      
      <div className="space-y-8 relative z-10">
        <div className="space-y-3">
          <div className="w-20 h-3 bg-white/10 rounded-full" />
          <div className="w-12 h-3 bg-white/5 rounded-full" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-white leading-tight">Let's Work<br />Together</h3>
          <p className="text-lg text-muted-foreground/80">
            Let's make magic happen together!
          </p>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-[1.25rem] h-16 text-xl font-bold glow-purple shadow-primary/20">
          <Mail size={24} className="mr-3" /> Email Me
        </Button>
      </div>

      <div className="absolute top-10 right-10 flex flex-col gap-4 opacity-[0.08] transform rotate-[15deg] pointer-events-none">
        <div className="w-32 h-44 glass-card bg-white rounded-3xl" />
        <div className="w-32 h-44 glass-card bg-white rounded-3xl -mt-36 ml-6" />
        <div className="w-32 h-44 glass-card bg-white rounded-3xl -mt-36 ml-12" />
      </div>
    </BentoCard>
  );
}