import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="bento-card p-5 flex flex-col gap-4 relative overflow-hidden group h-[155px] bg-[#11141b]">
      {/* The Stacked Card Visual Motif from Reference */}
      <div className="absolute bottom-[-30px] right-[-20px] w-[110px] h-[150px] pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[62px] h-[120px] bg-primary/20 rounded-[14px] transform rotate-[-18deg] border border-white/5" />
        <div className="absolute bottom-0 right-0 w-[62px] h-[120px] bg-primary/10 rounded-[14px] transform rotate-[-8deg] border border-white/5" />
        <div className="absolute bottom-0 right-0 w-[62px] h-[120px] bg-primary/30 rounded-[14px] transform rotate-[5deg] border border-white/5 shadow-2xl" />
      </div>
      
      <div className="space-y-3 relative z-10 flex flex-col justify-between h-full">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tight">Let's Work<br />Together</h3>
          <p className="text-[8px] text-muted-foreground font-medium max-w-[140px]">
            Building the next generation of products.
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-7 px-4 text-[9px] font-bold glow-purple group transition-all w-fit">
          <Mail size={10} className="mr-2 group-hover:animate-bounce" /> Email Me
        </Button>
      </div>

      <div className="absolute top-4 right-4 opacity-30">
        <Sparkles size={10} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}
