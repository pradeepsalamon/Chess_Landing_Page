-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'INTERESTED', 'DEMO_SCHEDULED', 'DEMO_ATTENDED', 'FOLLOW_UP', 'PAYMENT_PENDING', 'CONVERTED', 'ACTIVE_STUDENT', 'LOST');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "visitor_sessions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "deviceType" TEXT,
    "country" TEXT,
    "city" TEXT,
    "referrer" TEXT,
    "landingPage" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "fbclid" TEXT,
    "gclid" TEXT,
    "firstVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVisit" TIMESTAMP(3) NOT NULL,
    "pageViews" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "visitor_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demo_registrations" (
    "id" BIGSERIAL NOT NULL,
    "student_name" VARCHAR(120) NOT NULL,
    "parent_name" VARCHAR(120) NOT NULL,
    "student_age" SMALLINT NOT NULL,
    "experience_level" VARCHAR(20) NOT NULL,
    "phone" CHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "assignedCoachId" TEXT,
    "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM',
    "leadScore" INTEGER NOT NULL DEFAULT 0,
    "demoDate" TIMESTAMP(3),
    "lastContactedAt" TIMESTAMP(3),
    "lastActivityAt" TIMESTAMP(3),
    "convertedAt" TIMESTAMP(3),
    "source" TEXT,
    "campaign" TEXT,
    "adSet" TEXT,
    "adName" TEXT,
    "remarks" TEXT,
    "followUpDate" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "visitorSessionId" TEXT,

    CONSTRAINT "demo_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_activities" (
    "id" TEXT NOT NULL,
    "leadId" BIGINT NOT NULL,
    "activityType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_notes" (
    "id" TEXT NOT NULL,
    "leadId" BIGINT NOT NULL,
    "note" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitor_sessions_sessionId_key" ON "visitor_sessions"("sessionId");

-- AddForeignKey
ALTER TABLE "demo_registrations" ADD CONSTRAINT "demo_registrations_visitorSessionId_fkey" FOREIGN KEY ("visitorSessionId") REFERENCES "visitor_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_activities" ADD CONSTRAINT "lead_activities_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "demo_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "demo_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
