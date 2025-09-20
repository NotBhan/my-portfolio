'use client';
// This is a simplified client-side data fetching layer.
// In a real app, these would be API calls.
// For this project, we're re-purposing server actions or direct reads.
// This approach is not standard but works for the self-contained nature of this app.

import { Project, SkillCategory, Stat, Testimonial } from './definitions';

// This is a workaround to make server-side file reading available on client, not a good practice.
async function fetchData(fileName: string) {
    // This would typically be a fetch('/api/...') call.
    // For simplicity, we are creating a dynamic API route on the fly.
    try {
        const response = await fetch(`/api/data?file=${fileName}`);
        if (!response.ok) {
            console.error(`Failed to fetch ${fileName}`);
            return [];
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching ${fileName}:`, error);
        return [];
    }
}

export const getProjects = (): Promise<Project[]> => fetchData('projects.json');
export const getSkills = (): Promise<SkillCategory[]> => fetchData('skills.json');
export const getTestimonials = (): Promise<Testimonial[]> => fetchData('testimonials.json');
export const getStats = (): Promise<Stat[]> => fetchData('stats.json');
