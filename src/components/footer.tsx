'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-12 text-center text-muted-foreground font-code text-sm">
      <p>
        &copy; {year || '...'} Chandrabhan. All rights reserved.
      </p>
    </footer>
  );
}
