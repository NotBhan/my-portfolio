'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Spotlight() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Use a very subtle gray for light mode and maintain the existing subtle purple/blue for dark mode
  const spotlightColor =
    theme === 'light' ? 'rgba(100, 116, 139, 0.05)' : 'rgba(139, 92, 246, 0.08)';

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
      }}
    />
  );
}
