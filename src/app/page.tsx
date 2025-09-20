import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import ThemeToggle from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-[480px] space-y-8">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </div>
       <footer className="mt-12 text-center text-muted-foreground font-code text-sm">
        <p>&copy; {new Date().getFullYear()} Chandrabhan. All rights reserved.</p>
        <p>
          <a href="/admin" className="hover:text-primary transition-colors">Admin Panel</a>
        </p>
      </footer>
    </main>
  );
}
