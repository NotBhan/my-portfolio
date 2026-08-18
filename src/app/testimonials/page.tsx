import { getTestimonials, getSettings } from '@/lib/data';
import { MessageSquare, Quote, Star, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Testimonials & Reviews — Chandrabhan Mahato',
  description: 'Feedback, recommendations, and reviews from collaborators, mentors, and clients.',
};

export default async function TestimonialsPage() {
  const settings = await getSettings();
  if (!settings.showTestimonials) {
    redirect('/');
  }

  const allTestimonials = await getTestimonials();
  const visibleTestimonials = allTestimonials.filter((t) => t.isVisible);

  return (
    <div className="space-y-4 pt-2">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
          <MessageSquare size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground uppercase tracking-tight">
            Endorsements & Reviews
          </h1>
          <p className="text-[11px] text-muted-foreground font-medium">
            Feedback and recommendations from colleagues, mentors, and collaborators.
          </p>
        </div>
      </div>

      {visibleTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bento-card p-6 flex flex-col justify-between gap-5 bg-card/40 hover:bg-card/70 transition-all border-border/60 relative overflow-hidden group shadow-lg"
            >
              {/* Decorative top-right quote background accent */}
              <Quote
                size={60}
                className="absolute right-3 top-3 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none"
              />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-1 text-primary/80">
                  <Star size={13} className="fill-primary text-primary" />
                  <Star size={13} className="fill-primary text-primary" />
                  <Star size={13} className="fill-primary text-primary" />
                  <Star size={13} className="fill-primary text-primary" />
                  <Star size={13} className="fill-primary text-primary" />
                </div>

                <blockquote className="text-[13px] text-foreground font-medium leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border/40 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase shrink-0">
                  {testimonial.name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[12px] font-black text-foreground uppercase tracking-wider truncate">
                    {testimonial.name || 'Anonymous'}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-code truncate">
                    {testimonial.company || 'Collaborator'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bento-card p-12 flex flex-col items-center justify-center text-center gap-3 border-border/50">
          <MessageSquare className="w-10 h-10 text-muted-foreground/40" />
          <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
            No Published Reviews Yet
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Endorsements and testimonials are currently being curated. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
