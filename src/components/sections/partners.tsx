import { Handshake, Instagram, Youtube, Twitter, Dribbble, Twitch } from 'lucide-react';
import BentoCard from '../bento-card';
import { Button } from '../ui/button';

const partners = [
    { icon: Youtube, name: 'YouTube' },
    { icon: Twitter, name: 'Twitter' },
    { icon: Instagram, name: 'Instagram' },
    { icon: Dribbble, name: 'Dribbble' },
    { icon: Twitch, name: 'Twitch' },
]

export default function Partners() {
  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <Handshake className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Satisfied Partners</h3>
        </div>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {partners.map(partner => (
            <Button variant="outline" key={partner.name} className="flex items-center justify-center gap-2 p-6">
                <partner.icon className="h-5 w-5" />
                <span>{partner.name}</span>
            </Button>
        ))}
      </div>
    </BentoCard>
  );
}
