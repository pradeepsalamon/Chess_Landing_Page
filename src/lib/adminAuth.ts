import crypto from "crypto";
import { NextResponse } from "next/server";

export const ADMIN_AUTH_COOKIE = "nexa_admin_auth";

const COOKIE_MAX_AGE = 60 * 60 * 8;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function getSigningSecret() {
  return process.env.ADMIN_AUTH_SECRET || getAdminPassword();
}

function createAdminToken() {
  return crypto
    .createHmac("sha256", getSigningSecret())
    .update("nexa-admin")
    .digest("hex");
}

function parseCookies(cookieHeader: string | null) {
  return new Map(
    (cookieHeader || "")
      .split(";")
      .map((cookie) => cookie.trim().split("="))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, decodeURIComponent(value)]),
  );
}

function constantTimeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  return aBuffer.length === bBuffer.length && crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function isAdminPassword(password: string) {
  const adminPassword = getAdminPassword();

  return Boolean(adminPassword) && constantTimeEqual(password, adminPassword);
}

export function isAdminRequest(request: Request) {
  const cookie = parseCookies(request.headers.get("cookie")).get(ADMIN_AUTH_COOKIE);

  return typeof cookie === "string" && constantTimeEqual(cookie, createAdminToken());
}

export function setAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_AUTH_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_AUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
