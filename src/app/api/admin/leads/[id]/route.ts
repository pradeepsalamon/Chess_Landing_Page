import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const params = await props.params;
    const leadId = BigInt(params.id);

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        visitorSession: true,
        activities: {
          orderBy: { createdAt: 'desc' },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Prisma BigInt serialization
    const serializedLead = {
      ...lead,
      id: lead.id.toString(),
      activities: lead.activities.map(a => ({ ...a, leadId: a.leadId.toString() })),
      notes: lead.notes.map(n => ({ ...n, leadId: n.leadId.toString() })),
    };

    return NextResponse.json({ lead: serializedLead });
  } catch (error) {
    console.error('Error fetching lead details:', error);
    return NextResponse.json({ error: 'Failed to fetch lead details' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const params = await props.params;
    const leadId = BigInt(params.id);

    await prisma.lead.delete({
      where: { id: leadId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
