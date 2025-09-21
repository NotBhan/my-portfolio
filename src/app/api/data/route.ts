import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ALLOWED_FILES = [
  'projects.json',
  'skills.json',
  'testimonials.json',
  'stats.json',
  'profile.json',
  'creative-skills.json',
  'experiences.json',
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file || !ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: 'Invalid file requested' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', file);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data file' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');
  
    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json({ error: 'Invalid file specified' }, { status: 400 });
    }
  
    try {
      const body = await request.json();
      const filePath = path.join(process.cwd(), 'src', 'data', file);
      await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');
      return NextResponse.json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Failed to save data:', error);
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
  }
