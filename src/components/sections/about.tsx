import BentoCard from '@/components/bento-card';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

export default function About() {
  return (
    <BentoCard
        title={
            <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground"/>
                <h3 className="text-sm font-semibold">Online Presence</h3>
            </div>
        }
        className="h-full"
    >
      <div className="flex flex-col h-full justify-center gap-4">
        <Button variant="outline" asChild className="justify-start gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <span className='font-bold'>Twitter</span>
            <span className='text-muted-foreground ml-auto'>@yourhandle</span>
          </a>
        </Button>
        <Button variant="outline" asChild className="justify-start gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
             <span className='font-bold'>Discord</span>
            <span className='text-muted-foreground ml-auto'>your-tag</span>
          </a>
        </Button>
        <Button variant="outline" asChild className="justify-start gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
             <span className='font-bold'>Facebook</span>
             <span className='text-muted-foreground ml-auto'>/yourprofile</span>
          </a>
        </Button>
      </div>
    </BentoCard>
  );
}
