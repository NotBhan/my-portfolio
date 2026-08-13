import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="bento-card flex flex-col relative overflow-hidden group h-[125px]">
      {/* Decorative Card Stack Visual - Behind Content */}
      <div className="absolute bottom-[-15px] right-[-10px] w-[130px] h-[170px] pointer-events-none z-[1]">
        <div className="absolute bottom-0 right-0 w-[80px] h-[140px] bg-primary/30 rounded-[18px] transform-origin-bottom-right rotate-[4deg] border border-white/5 shadow-2xl" />
        <div className="absolute bottom-0 right-0 w-[80px] h-[140px] bg-primary/10 rounded-[18px] transform-origin-bottom-right translate-x-[-12px] translate-y-[-8px] rotate-[-3deg] border border-white/5" />
        <div className="absolute bottom-0 right-0 w-[80px] h-[140px] bg-primary/20 rounded-[18px] transform-origin-bottom-right translate-x-[-24px] translate-y-[-16px] rotate-[-10deg] border border-white/5" />
      </div>
      
      <div className="relative z-20 flex flex-col justify-between h-full p-[18px]">
        <div className="space-y-1">
          <h3 className="text-[20px] font-black text-white leading-none uppercase tracking-tight">Let's Work<br />Together</h3>
          <p className="text-[11px] text-muted-foreground font-medium max-w-[160px] leading-relaxed">
            Building the next generation of products.
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-[34px] px-5 text-[11px] font-black uppercase tracking-wider glow-purple group transition-all w-fit flex-shrink-0 mt-auto">
          <Mail size={12} className="mr-2 group-hover:animate-bounce" /> Email Me
        </Button>
      </div>

      <div className="absolute top-4 right-4 opacity-40 z-20">
        <Sparkles size={14} className="text-primary animate-pulse" />
      </div>
    </div>
  );
}