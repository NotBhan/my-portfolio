import fs from 'fs/promises';
import path from 'path';
import type { Project, SkillCategory, Testimonial, Stat, Profile, CreativeSkill, Experience, SocialLink, Activity } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const dataFilePath = (filename: string) => path.join(process.cwd(), 'src', 'data', filename);

async function readData<T>(filename: string): Promise<T> {
  noStore();
  try {
    const filePath = dataFilePath(filename);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    if (filename === 'profile.json') {
      return JSON.parse(jsonData) as T;
    }
    const data = JSON.parse(jsonData);
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      return Object.values(data) as T;
    }
    return data as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      if (filename === 'profile.json') {
        return {} as T; 
      }
      return [] as unknown as T;
    }
    console.error(`Error reading ${filename}:`, error);
    if (filename === 'profile.json') {
      return {} as T;
    }
    return [] as unknown as T;
  }
}

async function readDataArray<T>(filename: string): Promise<T[]> {
    noStore();
    try {
      const filePath = dataFilePath(filename);
      const jsonData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(jsonData);
      if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        return Object.values(data) as T[];
      }
      return data as T[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return []; 
      }
      console.error(`Error reading ${filename}:`, error);
      return [];
    }
}


export const getProjects = () => readDataArray<Project>('projects.json');
export const getExperiences = () => readDataArray<Experience>('experiences.json');
export const getSkills = () => readDataArray<SkillCategory>('skills.json');
export const getTestimonials = () => readDataArray<Testimonial>('testimonials.json');
export const getStats = () => readDataArray<Stat>('stats.json');
export const getProfile = () => readData<Profile>('profile.json');
export const getCreativeSkills = () => readDataArray<CreativeSkill>('creative-skills.json');
export const getSocialLinks = () => readDataArray<SocialLink>('social-links.json');
export const getActivities = () => readDataArray<Activity>('activities.json');