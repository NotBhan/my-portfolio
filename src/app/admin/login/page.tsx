'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const success = await signIn(email, password);

    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid email or password.');
      toast({
        title: 'Login Failed',
        description: 'The credentials you entered are incorrect.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
       <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Portfolio Admin
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to manage your website content.
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={() => setError(null)}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={() => setError(null)}
                   className="h-12 text-base"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div>
                <Button type="submit" className="w-full h-12 text-base">
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
         <p className="text-center text-sm text-muted-foreground">
          <Link href="/" className="underline hover:text-primary">
            &larr; Back to Portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
