import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create timestamps
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS
    
    // Add timestamps to data
    const registrationData = {
      ...data,
      registeredDate: dateString,
      registeredTime: timeString,
      fullTimestamp: now.toISOString()
    };
    
    // Define directory and file paths
    const dataDir = path.join(process.cwd(), 'data', 'demo-registrations');
    const filePath = path.join(dataDir, `registrations_${dateString}.jsonl`);
    
    // Ensure directory exists
    await fs.mkdir(dataDir, { recursive: true });
    
    // Append to file (JSON Lines format: one JSON object per line)
    await fs.appendFile(filePath, JSON.stringify(registrationData) + '\n', 'utf8');
    
    return NextResponse.json({ success: true, message: 'Registration successful' }, { status: 201 });
  } catch (error) {
    console.error('Error saving registration:', error);
    return NextResponse.json({ success: false, error: 'Failed to process registration' }, { status: 500 });
  }
}
