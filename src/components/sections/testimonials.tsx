import BentoCard from '@/components/bento-card';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getTestimonials } from '@/lib/data';
import { Star } from 'lucide-react';

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <BentoCard title="testimonials.db">
      <h2 className="text-xl font-headline font-bold mb-4">What Others Say</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="bg-card/50 border-border/50 h-full flex flex-col">
                  <CardContent className="pt-6 font-code text-sm flex-grow">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2" />
      </Carousel>
    </BentoCard>
  );
}
