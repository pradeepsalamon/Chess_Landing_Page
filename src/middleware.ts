import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only track actual pages, exclude internal Next.js paths and static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  
  const visitorId = request.cookies.get('nexa_vid')?.value;
  const sessionId = request.cookies.get('nexa_sid')?.value;

  // Create a new Visitor ID if not present (Expires in 1 year)
  if (!visitorId) {
    const newVisitorId = crypto.randomUUID();
    response.cookies.set('nexa_vid', newVisitorId, { maxAge: 60 * 60 * 24 * 365, path: '/' });
  }

  // Create a new Session ID if not present (Session cookie, expires on browser close)
  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    response.cookies.set('nexa_sid', newSessionId, { path: '/' });
  }

  return response;
}
