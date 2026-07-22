import { prisma } from "./prisma";
import fs from "fs";
import path from "path";

export const DEFAULT_BG_COLOR = "#fff8e6";

const DATA_DIR = path.join(process.cwd(), ".data");
const THEME_FILE = path.join(DATA_DIR, "theme.json");

function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {
      // Ignore directory creation failure if read-only
    }
  }
}

function getFileFallbackColor(): string | null {
  try {
    if (fs.existsSync(THEME_FILE)) {
      const data = fs.readFileSync(THEME_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed.backgroundColor === "string") {
        return parsed.backgroundColor;
      }
    }
  } catch {
    // Fallback error ignore
  }
  return null;
}

function saveFileFallbackColor(color: string) {
  try {
    ensureDataDirExists();
    fs.writeFileSync(THEME_FILE, JSON.stringify({ backgroundColor: color, updatedAt: new Date().toISOString() }), "utf-8");
  } catch {
    // Fallback error ignore
  }
}

export async function getThemeBackgroundColor(): Promise<string> {
  // 1. Try DB first if available
  try {
    // @ts-ignore siteSetting might be dynamically typed if prisma client build was pending
    if (prisma && prisma.siteSetting) {
      // @ts-ignore
      const setting = await prisma.siteSetting.findUnique({
        where: { key: "bg_color" },
      });
      if (setting && setting.value) {
        return setting.value;
      }
    }
  } catch {
    // DB query error fallback to file
  }

  // 2. Try file fallback
  const fileColor = getFileFallbackColor();
  if (fileColor) {
    return fileColor;
  }

  // 3. Default fallback
  return DEFAULT_BG_COLOR;
}

export async function setThemeBackgroundColor(color: string): Promise<{ success: boolean; backgroundColor: string }> {
  // Simple validation for hex color
  const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(color);
  if (!isValidHex) {
    throw new Error("Invalid hex color format. Expected format: #RRGGBB or #RGB");
  }

  // Save to file fallback
  saveFileFallbackColor(color);

  // Try DB write if available
  try {
    // @ts-ignore siteSetting check
    if (prisma && prisma.siteSetting) {
      // @ts-ignore
      await prisma.siteSetting.upsert({
        where: { key: "bg_color" },
        update: { value: color },
        create: { key: "bg_color", value: color },
      });
    }
  } catch (err) {
    console.warn("Could not save theme to database, fallback file used instead:", err);
  }

  return { success: true, backgroundColor: color };
}
