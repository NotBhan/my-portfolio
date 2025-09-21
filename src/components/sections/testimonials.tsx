import BentoCard from '@/components/bento-card';
import { getTestimonials } from '@/lib/data';
import { MessageSquare } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

export default async function Testimonials() {
  const allTestimonials = await getTestimonials();
  const testimonials = allTestimonials.filter((t) => t.isVisible);

  return (
    <BentoCard
      title={
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Rave Reviews Showcase</h3>
        </div>
      }
      className="h-full"
      showButtons={true}
    >
      <div className="flex flex-col h-full">
        {testimonials.length > 0 ? (
          <ScrollArea className="flex-grow">
            <div className="space-y-4 pr-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id}>
                  <blockquote className="text-xs text-foreground mb-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="text-xs text-muted-foreground">
                    - {testimonial.name}, {testimonial.company}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-full flex-grow">
            <p className="text-muted-foreground text-center font-mono text-sm">
              No reviews yet.
            </p>
          </div>
        )}
      </div>
    </BentoCard>
  );
}
