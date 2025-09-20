import fs from 'fs/promises';
import path from 'path';
import type { Project, SkillCategory, Testimonial, Stat, Profile } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const dataFilePath = (filename: string) => path.join(process.cwd(), 'src', 'data', filename);

async function readData<T>(filename: string): Promise<T> {
  noStore();
  try {
    const filePath = dataFilePath(filename);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    // For single object files, parse directly.
    if (filename === 'profile.json') {
      return JSON.parse(jsonData) as T;
    }
    // For array files, handle as before, though we might need to adjust.
    // This function is now more generic. Assuming array for others.
    return JSON.parse(jsonData) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      if (filename === 'profile.json') {
        return {} as T; // Return empty object for profile
      }
      return [] as T; // Return empty array for others
    }
    console.error(`Error reading ${filename}:`, error);
    if (filename === 'profile.json') {
      return {} as T;
    }
    return [] as T;
  }
}

async function readDataArray<T>(filename: string): Promise<T[]> {
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


export const getProjects = () => readDataArray<Project>('projects.json');
export const getSkills = () => readDataArray<SkillCategory>('skills.json');
export const getTestimonials = () => readDataArray<Testimonial>('testimonials.json');
export const getStats = () => readDataArray<Stat>('stats.json');
export const getProfile = () => readData<Profile>('profile.json');
