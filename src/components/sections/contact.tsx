import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="bento-card p-4 flex flex-col gap-3 relative overflow-hidden group h-[125px] bg-[#11141b]">
      {/* Reference-Style Stacked Card Visual Decoration */}
      <div className="absolute bottom-[-15px] right-[-10px] w-[110px] h-[150px] pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[62px] h-[120px] bg-primary/30 rounded-[14px] transform-origin-bottom-right rotate-[5deg] border border-white/5 shadow-2xl" />
        <div className="absolute bottom-0 right-0 w-[62px] h-[120px] bg-primary/10 rounded-[14px] transform-origin-bottom-right translate-x-[-12px] translate-y-[-8px] rotate-[-8deg] border border-white/5" />
        <div className="absolute bottom-0 right-0 w-[62px] h-[120px] bg-primary/20 rounded-[14px] transform-origin-bottom-right translate-x-[-24px] translate-y-[-16px] rotate-[-18deg] border border-white/5" />
      </div>
      
      <div className="space-y-2 relative z-10 flex flex-col justify-between h-full">
        <div className="space-y-0.5">
          <h3 className="text-[13px] font-black text-white leading-tight uppercase tracking-tight">Let's Work<br />Together</h3>
          <p className="text-[7px] text-muted-foreground font-medium max-w-[120px]">
            Building the next generation of products.
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-6 px-3 text-[8px] font-bold glow-purple group transition-all w-fit">
          <Mail size={8} className="mr-1.5 group-hover:animate-bounce" /> Email Me
        </Button>
      </div>

      <div className="absolute top-3 right-3 opacity-30">
        <Sparkles size={8} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}