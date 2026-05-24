import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data', 'demo-registrations');
    
    // Check if directory exists
    try {
      await fs.access(dataDir);
    } catch {
      return NextResponse.json({ registrations: [] });
    }

    const files = await fs.readdir(dataDir);
    const jsonlFiles = files.filter(file => file.endsWith('.jsonl'));
    
    let allRegistrations: any[] = [];

    for (const file of jsonlFiles) {
      const filePath = path.join(dataDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const lines = content.trim().split('\n');
      
      const registrations = lines
        .filter(line => line.trim() !== '')
        .map(line => JSON.parse(line));
      
      allRegistrations = [...allRegistrations, ...registrations];
    }

    // Sort by timestamp descending
    allRegistrations.sort((a, b) => {
      return new Date(b.fullTimestamp).getTime() - new Date(a.fullTimestamp).getTime();
    });

    return NextResponse.json({ registrations: allRegistrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
