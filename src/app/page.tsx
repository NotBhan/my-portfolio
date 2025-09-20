import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import ThemeToggle from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
                <Hero />
            </div>
            <div className="md:col-span-1">
                <About />
            </div>
            <div className="md:col-span-2">
                <Projects />
            </div>
            <div className="md:col-span-2">
                <Skills />
            </div>
            <div className="md:col-span-1">
                <Testimonials />
            </div>
            <div className="md:col-span-3">
                <Contact />
            </div>
        </div>
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
