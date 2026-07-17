import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalLeads,
      todayLeads,
      totalVisitors,
      todayVisitors,
      statusCounts,
      sourceCounts
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: today } } }),
      prisma.visitorSession.count(),
      prisma.visitorSession.count({ where: { firstVisit: { gte: today } } }),
      prisma.lead.groupBy({ by: ['status'], _count: { status: true } }),
      prisma.lead.groupBy({ by: ['source'], _count: { source: true } }),
    ]);

    // Calculate Conversion Rate (CONVERTED + ACTIVE_STUDENT)
    const convertedCount = statusCounts.find(s => s.status === 'CONVERTED' || s.status === 'ACTIVE_STUDENT')?._count.status || 0;
    const conversionRate = totalLeads > 0 ? ((convertedCount / totalLeads) * 100).toFixed(1) : 0;

    const metrics = {
      leads: {
        total: totalLeads,
        today: todayLeads
      },
      visitors: {
        total: totalVisitors,
        today: todayVisitors
      },
      conversion: {
        rate: conversionRate,
        count: convertedCount
      },
      statusDistribution: statusCounts.reduce((acc, curr) => {
        acc[curr.status] = curr._count.status;
        return acc;
      }, {} as Record<string, number>),
      sourceDistribution: sourceCounts.reduce((acc, curr) => {
        acc[curr.source || 'Unknown'] = curr._count.source;
        return acc;
      }, {} as Record<string, number>)
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
