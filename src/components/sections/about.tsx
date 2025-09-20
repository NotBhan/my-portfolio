import BentoCard from '@/components/bento-card';
import { Button } from '../ui/button';
import { Globe, Twitter, Facebook, MessageCircle } from 'lucide-react'; // Using MessageCircle for Discord as there's no direct Discord icon in lucide-react

export default function About() {
  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Online Presence</h3>
        </div>
      }
      className="h-full"
    >
      <div className="flex h-full flex-col justify-center gap-4">
        <Button variant="outline" asChild className="justify-start gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5" />
            <span className="font-bold">Twitter</span>
          </a>
        </Button>
        <Button variant="outline" asChild className="justify-start gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            <span className="font-bold">Discord</span>
          </a>
        </Button>
        <Button variant="outline" asChild className="justify-start gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-5 w-5" />
            <span className="font-bold">Facebook</span>
          </a>
        </Button>
      </div>
    </BentoCard>
  );
}
