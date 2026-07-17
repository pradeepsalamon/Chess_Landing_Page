import { z } from 'zod';
import { prisma } from './prisma';

export const DemoRegistrationSchema = z.object({
  name: z.string().min(1, 'All fields are required.'),
  parentName: z.string().min(1, 'All fields are required.'),
  age: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num >= 4 && num <= 18;
  }, 'Student age must be between 4 and 18.'),
  experience: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: 'Please select a valid experience level.' }),
  }),
  phone: z.string().refine((val) => /^\d{10}$/.test(val.replace(/\D/g, '')), 'Contact number must be exactly 10 digits.'),
});

export type DemoRegistrationInput = z.infer<typeof DemoRegistrationSchema>;

export type DemoRegistration = DemoRegistrationInput & {
  id?: bigint;
  registeredDate: string;
  registeredTime: string;
  fullTimestamp: string;
};

export function validateDemoRegistration(data: unknown): DemoRegistrationInput {
  return DemoRegistrationSchema.parse(data);
}

export async function saveDemoRegistration(
  input: DemoRegistrationInput,
  visitorSessionId?: string
): Promise<DemoRegistration> {
  const cleanPhone = input.phone.replace(/\D/g, '');
  
  const lead = await prisma.lead.create({
    data: {
      studentName: input.name,
      parentName: input.parentName,
      studentAge: parseInt(input.age, 10),
      experienceLevel: input.experience,
      phone: cleanPhone,
      visitorSessionId,
      status: 'NEW',
      activities: {
        create: {
          activityType: 'Lead Registered',
          title: 'Demo Class Registration',
          description: 'Lead submitted the demo class registration form on the website.',
          createdBy: 'System'
        }
      }
    },
    include: {
      visitorSession: true
    }
  });

  // Automatically pull UTMs/Sources from visitor session if available
  if (lead.visitorSession) {
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        source: lead.visitorSession.utmSource || lead.visitorSession.referrer || 'Organic',
        campaign: lead.visitorSession.utmCampaign,
      }
    });
  }

  const now = lead.createdAt;

  return {
    ...input,
    id: lead.id,
    registeredDate: now.toISOString().split("T")[0],
    registeredTime: now.toTimeString().split(" ")[0],
    fullTimestamp: now.toISOString(),
  };
}

export async function getDemoRegistrations(): Promise<DemoRegistration[]> {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return leads.map(lead => {
    const now = lead.createdAt;
    return {
      name: lead.studentName,
      parentName: lead.parentName,
      age: lead.studentAge.toString(),
      experience: lead.experienceLevel,
      phone: lead.phone,
      registeredDate: now.toISOString().split("T")[0],
      registeredTime: now.toTimeString().split(" ")[0],
      fullTimestamp: now.toISOString(),
    };
  });
}
