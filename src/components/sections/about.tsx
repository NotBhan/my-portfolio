import * as LucideIcons from 'lucide-react';
import BentoCard from '@/components/bento-card';
import { Button } from '../ui/button';
import { getSocialLinks } from '@/lib/data';

function isLucideIcon(key: string): key is keyof typeof LucideIcons {
  return key in LucideIcons;
}

const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
  if (isLucideIcon(name)) {
    const Icon = LucideIcons[name] as React.ElementType;
    return <Icon className={className} />;
  }
  return <LucideIcons.Globe className={className} />;
};


export default async function About() {
  const allSocialLinks = await getSocialLinks();
  const socialLinks = allSocialLinks.filter(link => link.isVisible);

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <LucideIcons.Globe className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Online Presence</h3>
        </div>
      }
      className="h-full"
    >
      <div className="flex h-full flex-col justify-center gap-4">
        {socialLinks.length > 0 ? (
          socialLinks.map((link) => (
            <Button variant="outline" asChild className="justify-start gap-4" key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <SocialIcon name={link.icon} className="h-5 w-5" />
                <span className="font-bold">{link.name}</span>
              </a>
            </Button>
          ))
        ) : (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center font-mono text-sm">
                    No social links added yet.
                </p>
            </div>
        )}
      </div>
    </BentoCard>
  );
}
