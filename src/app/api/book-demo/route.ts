import { NextResponse } from 'next/server';
import { sendDemoRegistrationEmail } from '@/lib/adminEmail';
import { saveDemoRegistration, validateDemoRegistration } from '@/lib/demoRegistrations';

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
    const registration = await saveDemoRegistration(registrationInput);

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
    const message = error instanceof Error ? error.message : 'Failed to process registration';
    const isValidationError = validationMessages.has(message);

    return NextResponse.json(
      { success: false, error: isValidationError ? message : 'Failed to process registration' },
      { status: isValidationError ? 400 : 500 },
    );
  }
}
