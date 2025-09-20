import BentoCard from '@/components/bento-card';
import { Button } from '@/components/ui/button';
import { Crown, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <BentoCard
      className="flex flex-col items-center text-center h-full"
      title={
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Let's Work Together</h3>
        </div>
      }
    >
      <div className="flex flex-col justify-center flex-1">
        <p className="text-muted-foreground text-sm mb-6">
          Let's make magic happen together!
        </p>
        <div className="w-full space-y-4">
          <Button asChild className="w-full">
            <a href="mailto:contact@example.com">
              <Mail className="mr-2" /> Email Me
            </a>
          </Button>
        </div>
      </div>
    </BentoCard>
  );
}
