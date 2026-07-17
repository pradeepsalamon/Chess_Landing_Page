import { NextResponse } from 'next/server';
import { sendDemoRegistrationEmail } from '@/lib/adminEmail';
import { saveDemoRegistration, validateDemoRegistration } from '@/lib/demoRegistrations';
import { trackLead } from '@/lib/analytics';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const runtime = 'nodejs';

const validationMessages = new Set([
  'All fields are required.',
  'Student age must be between 4 and 18.',
  'Please select a valid experience level.',
  'Contact number must be exactly 10 digits.',
]);

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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const registrationInput = validateDemoRegistration(data);
    
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('nexa_sid')?.value;
    
    // Find the VisitorSession in Prisma to link it
    let visitorSessionId = undefined;
    if (sessionId) {
      const { prisma } = await import('@/lib/prisma');
      const session = await prisma.visitorSession.findUnique({ where: { sessionId } });
      if (session) visitorSessionId = session.id;
    }

    const registration = await saveDemoRegistration(registrationInput, visitorSessionId);

    // Fire Analytics Event (non-blocking)
    try {
      trackLead({ content_name: 'Demo Registration', value: 0, currency: 'USD' });
    } catch (e) {
      console.error('Failed to fire tracking event', e);
    }

    const emailSent = await sendDemoRegistrationEmail(registration).catch((error) => {
      logServerError('Error sending admin email', error);
      return false;
    });

    return NextResponse.json(
      { success: true, message: 'Registration successful', emailSent },
      { status: 201 },
    );
  } catch (error) {
    logServerError('Error saving registration', error);
    
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]?.message || 'Validation failed';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }
    
    const message = error instanceof Error ? error.message : 'Failed to process registration';
    const isValidationError = validationMessages.has(message);

    return NextResponse.json(
      { success: false, error: isValidationError ? message : 'Failed to process registration' },
      { status: isValidationError ? 400 : 500 },
    );
  }
}
