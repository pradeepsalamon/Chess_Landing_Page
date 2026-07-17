import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '@/lib/adminAuth';
import { LeadStatus } from '@prisma/client';

export const runtime = 'nodejs';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const params = await props.params;
    const leadId = BigInt(params.id);
    const { status, description } = await request.json();

    if (!Object.values(LeadStatus).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const previousStatus = lead.status;

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status,
        convertedAt: status === 'CONVERTED' || status === 'ACTIVE_STUDENT' ? new Date() : lead.convertedAt,
        lastActivityAt: new Date(),
        activities: {
          create: {
            activityType: 'Status Changed',
            title: `Status changed to ${status}`,
            description: description || `Status was changed from ${previousStatus} to ${status}`,
            createdBy: 'Admin',
          }
        }
      },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      status: updatedLead.status,
      activity: {
        ...updatedLead.activities[0],
        leadId: updatedLead.activities[0].leadId.toString()
      }
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
  }
}
