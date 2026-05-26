import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/adminAuth';
import { getDemoRegistrations } from '@/lib/demoRegistrations';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const registrations = await getDemoRegistrations();

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
