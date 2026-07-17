import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { url, referrer } = await request.json();
    const cookieStore = await cookies();
    
    const visitorId = cookieStore.get('nexa_vid')?.value;
    const sessionId = cookieStore.get('nexa_sid')?.value;

    if (!visitorId || !sessionId) {
      return NextResponse.json({ success: false, error: 'Missing cookies' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';

    // Parse URL and extract UTMs/Click IDs
    const parsedUrl = new URL(url || 'http://localhost');
    const searchParams = parsedUrl.searchParams;
    
    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');
    const utmContent = searchParams.get('utm_content');
    const utmTerm = searchParams.get('utm_term');
    const fbclid = searchParams.get('fbclid');
    const gclid = searchParams.get('gclid');
    const landingPage = parsedUrl.pathname;

    // Very basic UA parsing (ideally use a library like 'ua-parser-js', but this works for simple MVP)
    const browser = userAgent.includes('Chrome') ? 'Chrome' : 
                    userAgent.includes('Safari') ? 'Safari' : 
                    userAgent.includes('Firefox') ? 'Firefox' : 
                    userAgent.includes('Edge') ? 'Edge' : 'Other';
                    
    const os = userAgent.includes('Windows') ? 'Windows' : 
               userAgent.includes('Mac') ? 'MacOS' : 
               userAgent.includes('Linux') ? 'Linux' : 
               userAgent.includes('Android') ? 'Android' : 
               userAgent.includes('iOS') || userAgent.includes('iPhone') ? 'iOS' : 'Other';
               
    const deviceType = userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone') ? 'Mobile' : 'Desktop';

    await prisma.visitorSession.upsert({
      where: { sessionId },
      update: {
        pageViews: { increment: 1 },
        lastVisit: new Date(),
      },
      create: {
        sessionId,
        visitorId,
        ipAddress,
        userAgent,
        browser,
        os,
        deviceType,
        referrer,
        landingPage,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        fbclid,
        gclid,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in tracking endpoint:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
