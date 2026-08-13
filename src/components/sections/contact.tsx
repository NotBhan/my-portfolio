import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="bento-card p-6 flex flex-col gap-4 relative overflow-hidden group h-[135px] bg-[#11141b]">
      {/* Reference-Style Stacked Card Visual Decoration */}
      <div className="absolute bottom-[-20px] right-[-15px] w-[130px] h-[170px] pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[80px] h-[140px] bg-primary/30 rounded-[18px] transform-origin-bottom-right rotate-[5deg] border border-white/5 shadow-2xl" />
        <div className="absolute bottom-0 right-0 w-[80px] h-[140px] bg-primary/10 rounded-[18px] transform-origin-bottom-right translate-x-[-12px] translate-y-[-8px] rotate-[-8deg] border border-white/5" />
        <div className="absolute bottom-0 right-0 w-[80px] h-[140px] bg-primary/20 rounded-[18px] transform-origin-bottom-right translate-x-[-24px] translate-y-[-16px] rotate-[-18deg] border border-white/5" />
      </div>
      
      <div className="space-y-4 relative z-10 flex flex-col justify-between h-full">
        <div className="space-y-1">
          <h3 className="text-[20px] font-black text-white leading-tight uppercase tracking-tight">Let's Work<br />Together</h3>
          <p className="text-[11px] text-muted-foreground font-medium max-w-[140px] leading-relaxed">
            Building the next generation of products.
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-[38px] px-5 text-[11px] font-black uppercase tracking-wider glow-purple group transition-all w-fit">
          <Mail size={12} className="mr-2 group-hover:animate-bounce" /> Email Me
        </Button>
      </div>

      <div className="absolute top-6 right-6 opacity-40">
        <Sparkles size={14} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}
