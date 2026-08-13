
import { Mail, Send, Github, Linkedin, MessageSquare, Sparkles, Instagram, Facebook, Twitter, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getProfile, getSocialLinks } from '@/lib/data';

const RedditIcon = ({ size = 16, className }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.537 2.529c1.83.21 3.436.902 4.671 1.941.303-.21.67-.333 1.066-.333.999 0 1.808.81 1.808 1.808 0 .657-.351 1.231-.874 1.55a4.348 4.348 0 0 1 .032.518c0 2.516-3.1 4.554-6.92 4.554-3.82 0-6.92-2.038-6.92-4.554 0-.17.017-.338.049-.501-.54-.314-.905-.898-.905-1.567 0-.999.809-1.808 1.808-1.808.409 0 .783.136 1.087.366 1.23-1.014 2.814-1.688 4.616-1.912l.59-2.77c.063-.298.337-.502.641-.456l3.078.648c.012-.4.34-.72.743-.72zM9.25 12c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 16.5c-1.35 0-2.54-.53-3.41-1.39a.5.5 0 0 1 .71-.7c.66.66 1.6 1.09 2.7 1.09s2.04-.43 2.7-1.09a.5.5 0 1 1 .71.7c-.87.86-2.06 1.39-3.41 1.39z"/>
  </svg>
);

const SocialIcon = ({ name, size = 16 }: { name: string, size?: number }) => {
  switch (name.toLowerCase()) {
    case 'instagram': return <Instagram size={size} />;
    case 'facebook': return <Facebook size={size} />;
    case 'twitter':
    case 'x': return <Twitter size={size} />;
    case 'reddit': return <RedditIcon size={size} />;
    default: return <Share2 size={size} />;
  }
};

const getIconColor = (name: string) => {
  switch (name.toLowerCase()) {
    case 'instagram': return 'text-[#E4405F] bg-[#E4405F]/20';
    case 'facebook': return 'text-[#1877F2] bg-[#1877F2]/20';
    case 'twitter':
    case 'x': return 'text-[#1DA1F2] bg-[#1DA1F2]/20';
    case 'reddit': return 'text-[#FF4500] bg-[#FF4500]/20';
    default: return 'text-primary bg-primary/20';
  }
};

export default async function ContactPage() {
  const profile = await getProfile();
  const allSocialLinks = await getSocialLinks();
  const socialLinks = allSocialLinks.filter(link => link.isVisible);

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Mail size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Connections</h1>
          <p className="text-sm text-muted-foreground font-medium">Let's talk about products, ideas, or collaborations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 items-stretch">
        {/* Contact & Socials Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Direct Channel */}
          <div className="bento-card p-6 bg-primary/5 border-primary/10 relative overflow-hidden group">
            <Sparkles size={100} className="absolute -right-8 -bottom-8 text-primary/10 group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight mb-2">Direct Channel</h2>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6 max-w-[280px]">
                Drop me an email directly or find me on professional networks.
              </p>
            </div>
            
            <div className="space-y-2.5 relative z-10">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Email</span>
                  <span className="block text-xs text-foreground font-medium truncate">{profile.email}</span>
                </div>
              </a>

              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#0077B5]/20 flex items-center justify-center text-[#0077B5]">
                  <Linkedin size={16} />
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-muted-foreground uppercase tracking-widest">LinkedIn</span>
                  <span className="block text-xs text-foreground font-medium">Professional Profile</span>
                </div>
              </a>

              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center text-foreground">
                  <Github size={16} />
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-muted-foreground uppercase tracking-widest">GitHub</span>
                  <span className="block text-xs text-foreground font-medium">Source Collections</span>
                </div>
              </a>
            </div>
          </div>

          {/* Digital Presence */}
          {socialLinks.length > 0 && (
            <div className="bento-card p-6 bg-card/50 border-border relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-xl font-black text-foreground uppercase tracking-tight mb-2">Digital Presence</h2>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">
                  Catch me on other social platforms for regular updates.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                {socialLinks.map((link) => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex flex-col gap-2 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${getIconColor(link.name)}`}>
                      <SocialIcon name={link.icon} size={14} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">{link.name}</span>
                      <span className="block text-[10px] text-foreground font-medium truncate">View Profile</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bento-card p-6 bg-card/50 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare size={14} className="text-primary" />
              <h2 className="text-xs font-black text-foreground uppercase tracking-[0.2em]">Send a Transmission</h2>
            </div>

            <form className="space-y-3 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                  <Input className="bg-muted/20 border-border rounded-xl h-10 focus:border-primary/40 focus:ring-0 text-foreground text-xs" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                  <Input className="bg-muted/20 border-border rounded-xl h-10 focus:border-primary/40 focus:ring-0 text-foreground text-xs" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-1.5 flex-1 flex flex-col min-h-0">
                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Message Body</label>
                <Textarea className="bg-muted/20 border-border rounded-xl min-h-[120px] lg:min-h-[160px] flex-1 focus:border-primary/40 focus:ring-0 text-foreground text-xs resize-none" placeholder="What's on your mind?" />
              </div>
              
              <Button className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] glow-purple transition-all mt-6 shrink-0">
                Initialize Dispatch <Send size={12} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
