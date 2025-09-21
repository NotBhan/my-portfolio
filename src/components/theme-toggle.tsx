'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!isMounted) {
    return (
      <Button variant="outline" size="sm" disabled>
       Theme:<Sun className="xs:ml-0 md:ml-2 h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      Theme:
      <span className="relative xs:ml-0 md:ml-2 h-4 w-4">
        <Sun className="h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-0 left-0 h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
