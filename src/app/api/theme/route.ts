import { NextResponse } from "next/server";
import { getThemeBackgroundColor, setThemeBackgroundColor } from "@/lib/themeSetting";
import { isAdminRequest } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const color = await getThemeBackgroundColor();
    return NextResponse.json({ backgroundColor: color });
  } catch (error) {
    return NextResponse.json({ backgroundColor: "#fff8e6" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { backgroundColor } = await request.json();
    if (!backgroundColor || typeof backgroundColor !== "string") {
      return NextResponse.json({ error: "Invalid backgroundColor" }, { status: 400 });
    }

    const result = await setThemeBackgroundColor(backgroundColor);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update theme" }, { status: 400 });
  }
}
