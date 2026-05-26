import nodemailer from "nodemailer";
import type { DemoRegistration } from "./demoRegistrations";

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getSmtpPort() {
  return Number(process.env.SMTP_PORT || 587);
}

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function getAdminEmailConfigStatus() {
  const missing = [];

  if (!getAdminEmails().length) missing.push("ADMIN_EMAILS");
  if (!process.env.SMTP_HOST) missing.push("SMTP_HOST");
  if (!process.env.SMTP_USER) missing.push("SMTP_USER");
  if (!process.env.SMTP_PASS) missing.push("SMTP_PASS");

  return {
    configured: missing.length === 0,
    missing,
  };
}

export async function sendDemoRegistrationEmail(registration: DemoRegistration) {
  const adminEmails = getAdminEmails();
  const configStatus = getAdminEmailConfigStatus();

  if (!adminEmails.length || !isSmtpConfigured()) {
    console.warn(`Admin email skipped. Missing env: ${configStatus.missing.join(", ")}`);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: getSmtpPort(),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: adminEmails,
    subject: `New demo class registration: ${registration.name}`,
    text: [
      "A new free demo class registration was submitted.",
      "",
      `Student Name: ${registration.name}`,
      `Parent Name: ${registration.parentName}`,
      `Age: ${registration.age}`,
      `Experience: ${registration.experience}`,
      `Contact Number: ${registration.phone}`,
      `Submitted At: ${registration.fullTimestamp}`,
    ].join("\n"),
  });

  return true;
}
