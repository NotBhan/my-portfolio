import BentoCard from '@/components/bento-card';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getTestimonials } from '@/lib/data';
import { Star } from 'lucide-react';

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <BentoCard title="testimonials.db">
      <h2 className="text-xl font-headline font-bold mb-4">What Others Say</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-card/50 border-border/50">
            <CardContent className="pt-6 font-code text-sm">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                ))}
              </div>
              <blockquote className="italic text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </CardContent>
            <CardFooter className="font-code text-xs text-muted-foreground">
              - {testimonial.name}, {testimonial.company}
            </CardFooter>
          </Card>
        ))}
      </div>
    </BentoCard>
  );
}
