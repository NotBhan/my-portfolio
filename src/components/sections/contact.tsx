import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="glass-card p-6 flex flex-col gap-6 relative overflow-hidden group min-h-[180px] bg-[#11141b]">
      {/* Visual motif of stacked cards from reference */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div className="absolute bottom-0 right-4 w-20 h-28 bg-primary/20 rounded-xl transform rotate-[15deg] blur-md" />
        <div className="absolute bottom-2 right-2 w-16 h-24 bg-indigo-500/10 rounded-xl transform rotate-[25deg] border border-white/5" />
        <div className="absolute bottom-4 right-0 w-16 h-24 bg-purple-600/10 rounded-xl transform rotate-[35deg] border border-white/5" />
      </div>
      
      <div className="space-y-4 relative z-10">
        <div className="space-y-1.5">
          <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">Let's Work<br />Together</h3>
          <p className="text-[10px] text-muted-foreground font-medium max-w-[150px]">
            Building the next generation of digital products.
          </p>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10 text-xs font-bold glow-purple group transition-all">
          <Mail size={16} className="mr-2 group-hover:animate-bounce" /> Email Me
        </Button>
      </div>

      <div className="absolute top-4 right-6 opacity-30">
        <Sparkles size={16} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}