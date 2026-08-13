import { Mail, Send, Github, Linkedin, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getProfile } from '@/lib/data';

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Mail size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Connections</h1>
          <p className="text-sm text-muted-foreground font-medium">Let's talk about products, ideas, or collaborations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bento-card p-8 bg-primary/5 border-primary/10 relative overflow-hidden group">
            <Sparkles size={120} className="absolute -right-10 -bottom-10 text-primary/10 group-hover:scale-110 transition-transform duration-1000" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Direct Channel</h2>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8 max-w-[280px]">
              Drop me an email directly or find me on professional networks.
            </p>
            
            <div className="space-y-4">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</span>
                  <span className="block text-sm text-white font-medium truncate">{profile.email}</span>
                </div>
              </a>

              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#0077B5]/20 flex items-center justify-center text-[#0077B5]">
                  <Linkedin size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">LinkedIn</span>
                  <span className="block text-sm text-white font-medium">Professional Profile</span>
                </div>
              </a>

              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <Github size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">GitHub</span>
                  <span className="block text-sm text-white font-medium">Source Collections</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="bento-card p-8 bg-[#11141b]/40 h-full">
            <div className="flex items-center gap-2 mb-8">
              <MessageSquare size={16} className="text-primary" />
              <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">Send a Transmission</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                  <Input className="bg-white/5 border-white/5 rounded-xl h-12 focus:border-primary/40 focus:ring-0 text-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                  <Input className="bg-white/5 border-white/5 rounded-xl h-12 focus:border-primary/40 focus:ring-0 text-white" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Message Body</label>
                <Textarea className="bg-white/5 border-white/5 rounded-xl min-h-[160px] focus:border-primary/40 focus:ring-0 text-white resize-none" placeholder="What's on your mind?" />
              </div>
              
              <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] glow-purple transition-all">
                Initialize Dispatch <Send size={14} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
