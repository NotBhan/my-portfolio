import { Mail, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="glass-card p-8 flex flex-col gap-8 relative overflow-hidden group min-h-[350px]">
      {/* Visual motif of stacked cards/planes */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-32 h-44 bg-primary/40 rounded-3xl transform rotate-[15deg] blur-xl" />
        <div className="absolute top-16 right-4 w-32 h-44 bg-indigo-500/20 rounded-3xl transform rotate-[25deg] border border-white/10" />
        <div className="absolute top-24 right-0 w-32 h-44 bg-purple-600/10 rounded-3xl transform rotate-[35deg] border border-white/10" />
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="space-y-2">
          <div className="w-16 h-1 bg-primary/40 rounded-full" />
          <div className="w-10 h-1 bg-primary/20 rounded-full" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-4xl font-black text-white leading-tight">Let's Work<br />Together</h3>
          <p className="text-sm text-muted-foreground font-medium max-w-[200px]">
            Let's build the next generation of digital products together.
          </p>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 text-lg font-bold glow-purple group transition-all hover:scale-[1.02]">
          <Mail size={20} className="mr-3 group-hover:animate-bounce" /> Email Me
        </Button>
      </div>

      <div className="absolute bottom-6 right-8 opacity-40">
        <Sparkles size={24} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}