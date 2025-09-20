'use client';
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from '@/lib/actions';
import { Testimonial } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { getTestimonials } from '@/lib/data.client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, PlusCircle, Trash } from 'lucide-react';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      const fetchedTestimonials = await getTestimonials();
      setTestimonials(fetchedTestimonials);
    }
    fetchTestimonials();
  }, []);
  
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const testimonialData = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      quote: formData.get('quote') as string,
    };

    if (currentTestimonial) {
      await updateTestimonial({ ...testimonialData, id: currentTestimonial.id });
    } else {
      await createTestimonial(testimonialData);
    }
    const fetchedTestimonials = await getTestimonials();
    setTestimonials(fetchedTestimonials);
    setDialogOpen(false);
    setCurrentTestimonial(null);
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        await deleteTestimonial(id);
        const fetchedTestimonials = await getTestimonials();
        setTestimonials(fetchedTestimonials);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Manage Testimonials</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setCurrentTestimonial(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={currentTestimonial?.name} required />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" defaultValue={currentTestimonial?.company} required />
                </div>
                <div>
                  <Label htmlFor="quote">Quote</Label>
                  <Textarea id="quote" name="quote" defaultValue={currentTestimonial?.quote} required />
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>{testimonial.name}</TableCell>
                <TableCell>{testimonial.company}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => { setCurrentTestimonial(testimonial); setDialogOpen(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
