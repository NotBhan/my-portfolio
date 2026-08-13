import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="bento-card p-5 flex flex-col gap-6 relative overflow-hidden group min-h-[160px] bg-[#11141b]">
      {/* The Stacked Card Visual Motif from Reference */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -bottom-10 -right-6 w-24 h-40 bg-primary/20 rounded-xl transform rotate-[25deg] blur-md" />
        <div className="absolute -bottom-8 -right-4 w-20 h-36 bg-indigo-500/10 rounded-xl transform rotate-[35deg] border border-white/5" />
        <div className="absolute -bottom-6 -right-2 w-20 h-36 bg-purple-600/10 rounded-xl transform rotate-[45deg] border border-white/5 shadow-2xl" />
      </div>
      
      <div className="space-y-3 relative z-10">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">Let's Work<br />Together</h3>
          <p className="text-[9px] text-muted-foreground font-medium max-w-[120px]">
            Building the next generation of products.
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-8 px-4 text-[10px] font-bold glow-purple group transition-all w-fit">
          <Mail size={12} className="mr-2 group-hover:animate-bounce" /> Email Me
        </Button>
      </div>

      <div className="absolute top-4 right-4 opacity-30">
        <Sparkles size={12} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}
