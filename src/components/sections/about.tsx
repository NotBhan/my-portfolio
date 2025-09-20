import BentoCard from '@/components/bento-card';

export default function About() {
  return (
    <BentoCard title="about-me.md">
      <div className="prose prose-sm prose-invert font-code">
        <p>
          Hello! I&apos;m Chandrabhan, a passionate developer with a knack for building beautiful and functional web applications. My journey in tech is driven by a love for elegant design, clean code, and creating seamless user experiences.
        </p>
        <p className="mt-4">
          This portfolio is a showcase of my skills and projects, built with a celestial dark theme and a touch of glassmorphism.
        </p>
      </div>
    </BentoCard>
  );
}
