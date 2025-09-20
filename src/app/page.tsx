import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import Hero from '@/components/sections/hero';
import Partners from '@/components/sections/partners';
import Stats from '@/components/sections/stats';
import Testimonials from '@/components/sections/testimonials';
import WorkProcess from '@/components/sections/work-process';
import ThemeToggle from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <Stats />
          </div>
          <div className="md:col-span-1 flex justify-end items-start">
            <ThemeToggle />
          </div>
          <div className="md:col-span-3">
            <Hero />
          </div>
          <div className="md:col-span-1 row-span-2">
            <Testimonials />
          </div>
          <div className="md:col-span-3">
            <Partners />
          </div>
          <div className="md:col-span-1">
            <About />
          </div>
           <div className="md:col-span-1">
             <WorkProcess />
          </div>
           <div className="md:col-span-1">
            <Contact />
          </div>
        </div>
      </div>
      <footer className="mt-12 text-center text-muted-foreground font-code text-sm">
        <p>
          &copy; {new Date().getFullYear()} Chandrabhan. All rights reserved.
        </p>
        <p>
          <a
            href="/admin"
            className="hover:text-primary transition-colors"
          >
            Admin Panel
          </a>
        </p>
      </footer>
    </main>
  );
}
