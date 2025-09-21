import * as LucideIcons from 'lucide-react';
import BentoCard from '@/components/bento-card';
import { Button } from '../ui/button';
import { getSocialLinks } from '@/lib/data';
import Link from 'next/link';
import DiscordIcon from '../icons/discord-icon';

function isLucideIcon(key: string): key is keyof typeof LucideIcons {
  return key in LucideIcons;
}

const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
  if (name === 'Discord') {
    return <DiscordIcon className={className} />;
  }
  if (isLucideIcon(name)) {
    const Icon = LucideIcons[name] as React.ElementType;
    return <Icon className={className} />;
  }
  return <LucideIcons.Globe className={className} />;
};

export default async function About() {
  const allSocialLinks = await getSocialLinks();
  const socialLinks = allSocialLinks.filter((link) => link.isVisible);

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <LucideIcons.Globe className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Online Presence</h3>
        </div>
      }
    >
      <div className="flex h-full flex-col justify-center items-center">
        {socialLinks.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                size="icon"
                asChild
                className="h-12 w-12"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer" title={link.name}>
                  <SocialIcon name={link.icon} className="h-6 w-6" />
                </Link>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="font-mono text-sm text-muted-foreground">
              No social links added yet.
            </p>
          </div>
        )}
      </div>
    </BentoCard>
  );
}
