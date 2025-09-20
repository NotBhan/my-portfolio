import { Home, Briefcase, Star, User, Mail } from 'lucide-react';
import BentoCard from './bento-card';
import { Button } from './ui/button';

const navItems = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: Briefcase, label: 'Projects', href: '#' },
  { icon: Star, label: 'Skills', href: '#' },
  { icon: User, label: 'About', href: '#' },
  { icon: Mail, label: 'Contact', href: '#' },
];

export default function Navbar() {
  return (
    <BentoCard title="navigation.menu" className="h-full">
      <nav className="flex flex-col items-start h-full justify-center">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                asChild
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <a href={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="text-sm font-code">{item.label}</span>
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </BentoCard>
  );
}
