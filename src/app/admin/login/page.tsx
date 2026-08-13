'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Incorrect credentials.');
      }

      toast({
        title: 'Authentication Successful',
        description: 'Initializing management environment...',
      });
      router.push('/admin/edit/profile');
    } catch (error: any) {
      toast({
        title: 'Access Denied',
        description: error.message || 'Invalid administrative password.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-3xl shadow-[0_0_30px_rgba(139,92,246,0.4)] mb-2">
            C
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-foreground">Terminal Control</h1>
            <p className="text-[11px] font-code text-muted-foreground uppercase tracking-[0.3em] font-black opacity-50">Secure Access // Configuration Mode</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="bento-card p-8 bg-card/40 border-border/60 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-1">
              <Lock size={12} className="text-primary" />
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Admin Keyphrase</Label>
            </div>
            <Input
              type="password"
              className="bg-background/50 border-border/50 h-12 rounded-xl focus:border-primary/50 text-center text-lg tracking-[0.5em]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isVerifying}
              autoFocus
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            disabled={isVerifying || !password}
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">Authenticating...</span>
            ) : (
              <span className="flex items-center gap-2">Sync Access <ArrowRight size={16} /></span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 pt-4 opacity-30">
            <ShieldCheck size={14} className="text-muted-foreground" />
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-[0.1em]">Encrypted Session Protocol</span>
          </div>
        </form>

        <p className="text-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
          Unauthorized access is logged.
        </p>
      </div>
    </div>
  );
}
