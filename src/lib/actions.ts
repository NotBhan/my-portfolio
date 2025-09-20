'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Project, SkillCategory, Stat, Testimonial, Profile } from './definitions';

const dataFilePath = (filename: string) => path.join(process.cwd(), 'src', 'data', filename);

// Helper function to read data
async function readData<T>(filename: string): Promise<T[]> {
  try {
    const filePath = dataFilePath(filename);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    throw error;
  }
}

// Helper function to write data
async function writeData<T>(filename:string, data: T[] | T): Promise<void> {
  const filePath = dataFilePath(filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// --- Contact Form Action ---
const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export async function handleContactForm(formData: FormData) {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    // Handle error - for now, just log
    console.error(validatedFields.error);
    return { error: 'Invalid data' };
  }

  const messages = await readData('messages.json');
  const newMessage = {
    id: Date.now().toString(),
    ...validatedFields.data,
    submittedAt: new Date().toISOString(),
  };
  messages.push(newMessage);
  await writeData('messages.json', messages);
  
  revalidatePath('/');
  return { success: 'Message sent successfully!' };
}

// --- Project Actions ---
export async function createProject(project: Omit<Project, 'id'>) {
  const projects = await readData<Project>('projects.json');
  const newProject: Project = { ...project, id: Date.now().toString() };
  projects.push(newProject);
  await writeData('projects.json', projects);
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function updateProject(updatedProject: Project) {
  let projects = await readData<Project>('projects.json');
  projects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
  await writeData('projects.json', projects);
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function deleteProject(id: string) {
  let projects = await readData<Project>('projects.json');
  projects = projects.filter(p => p.id !== id);
  await writeData('projects.json', projects);
revalidatePath('/admin/projects');
  revalidatePath('/');
}

// --- Skill Actions ---
export async function updateSkills(skills: SkillCategory[]) {
  await writeData<SkillCategory>('skills.json', skills);
  revalidatePath('/admin/skills');
  revalidatePath('/');
}

// --- Testimonial Actions ---
export async function createTestimonial(testimonial: Omit<Testimonial, 'id'>) {
    const testimonials = await readData<Testimonial>('testimonials.json');
    const newTestimonial: Testimonial = { ...testimonial, id: Date.now().toString() };
    testimonials.push(newTestimonial);
    await writeData('testimonials.json', testimonials);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}

export async function updateTestimonial(updatedTestimonial: Testimonial) {
    let testimonials = await readData<Testimonial>('testimonials.json');
    testimonials = testimonials.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t);
    await writeData('testimonials.json', testimonials);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}

export async function deleteTestimonial(id: string) {
    let testimonials = await readData<Testimonial>('testimonials.json');
    testimonials = testimonials.filter(t => t.id !== id);
    await writeData('testimonials.json', testimonials);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}

// --- Stats Actions ---
export async function updateStats(stats: Stat[]) {
    await writeData<Stat>('stats.json', stats);
    revalidatePath('/admin/stats');
    revalidatePath('/');
}

// --- Profile Actions ---
export async function updateProfile(profile: Profile) {
    await writeData<Profile>('profile.json', profile);
    revalidatePath('/admin/profile');
    revalidatePath('/');
}
