'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Spotlight() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const spotlightColor =
    theme === 'light' ? 'rgba(63, 81, 181, 0.2)' : 'rgba(63, 81, 181, 0.1)';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
      }}
    />
  );
}
