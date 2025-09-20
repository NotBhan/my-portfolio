import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file || !['projects.json', 'skills.json', 'testimonials.json', 'stats.json', 'profile.json'].includes(file)) {
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
