import BentoCard from '@/components/bento-card';
import { Card, CardContent } from '@/components/ui/card';
import { getTestimonials } from '@/lib/data';
import { MessageSquare } from 'lucide-react';

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Rave Reviews Showcase</h3>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-4 h-full flex flex-col justify-around">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id}>
            <blockquote className="text-xs text-foreground mb-1 line-clamp-3">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <p className="text-xs text-muted-foreground">
              - {testimonial.name}, {testimonial.company}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
