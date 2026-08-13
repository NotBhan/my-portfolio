import BentoCard from '@/components/bento-card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <BentoCard className="relative overflow-hidden group">
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
      
      <div className="space-y-6 relative z-10">
        <div className="space-y-2">
          <div className="w-12 h-2 bg-secondary rounded-full" />
          <div className="w-8 h-2 bg-secondary rounded-full opacity-50" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold">Let's Work<br />Together</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Let's make magic happen together!
          </p>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/80 text-white rounded-2xl h-12 glow-purple">
          <Mail size={18} className="mr-2" /> Email Me
        </Button>
      </div>

      <div className="absolute top-8 right-8 flex flex-col gap-2 opacity-20 transform rotate-12">
        <div className="w-24 h-32 glass-card bg-primary/40 rounded-xl" />
        <div className="w-24 h-32 glass-card bg-primary/30 rounded-xl -mt-24 ml-4" />
        <div className="w-24 h-32 glass-card bg-primary/20 rounded-xl -mt-24 ml-8" />
      </div>
    </BentoCard>
  );
}