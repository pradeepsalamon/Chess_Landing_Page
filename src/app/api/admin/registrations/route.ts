import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/adminAuth';
import { getDemoRegistrations } from '@/lib/demoRegistrations';

export const runtime = 'nodejs';

function logServerError(context: string, error: unknown) {
  if (error instanceof Error) {
    console.error(context, {
      name: error.name,
      message: error.message,
      code: 'code' in error ? error.code : undefined,
      stack: error.stack,
    });
    return;
  }

  console.error(context, error);
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const registrations = await getDemoRegistrations();

    return NextResponse.json({ registrations });
  } catch (error) {
    logServerError('Error fetching registrations', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
