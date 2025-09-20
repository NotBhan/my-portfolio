import fs from 'fs/promises';
import path from 'path';
import type { Project, SkillCategory, Testimonial, Stat } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const dataFilePath = (filename: string) => path.join(process.cwd(), 'src', 'data', filename);

async function readData<T>(filename: string): Promise<T[]> {
  noStore();
  try {
    const filePath = dataFilePath(filename);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

export const getProjects = () => readData<Project>('projects.json');
export const getSkills = () => readData<SkillCategory>('skills.json');
export const getTestimonials = () => readData<Testimonial>('testimonials.json');
export const getStats = () => readData<Stat>('stats.json');
