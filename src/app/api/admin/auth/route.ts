import { NextResponse } from "next/server";
import { clearAdminCookie, isAdminPassword, setAdminCookie } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));

  if (!isAdminPassword(typeof password === "string" ? password : "")) {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  setAdminCookie(response);

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  clearAdminCookie(response);

  return response;
}
