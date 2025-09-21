import BentoCard from '@/components/bento-card';
import { getTestimonials } from '@/lib/data';
import TestimonialsForm from './testimonials-form';

export default async function EditTestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <BentoCard title="Edit Testimonials" className="col-span-1 md:col-span-2">
      <TestimonialsForm testimonials={testimonials} />
    </BentoCard>
  );
}
