import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const params = await props.params;
    const leadId = BigInt(params.id);
    const { note } = await request.json();

    if (!note || note.trim() === '') {
      return NextResponse.json({ error: 'Note cannot be empty' }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const newNote = await prisma.leadNote.create({
      data: {
        leadId,
        note,
        createdBy: 'Admin',
      }
    });

    // Also create an activity for adding a note
    await prisma.leadActivity.create({
      data: {
        leadId,
        activityType: 'Note Added',
        title: 'Admin added a note',
        description: note,
        createdBy: 'Admin',
      }
    });
    
    await prisma.lead.update({
      where: { id: leadId },
      data: { lastActivityAt: new Date() }
    });

    return NextResponse.json({ 
      success: true, 
      note: {
        ...newNote,
        leadId: newNote.leadId.toString()
      }
    });
  } catch (error) {
    console.error('Error adding lead note:', error);
    return NextResponse.json({ error: 'Failed to add lead note' }, { status: 500 });
  }
}
