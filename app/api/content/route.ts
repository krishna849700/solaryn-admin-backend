import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SITE_SETTINGS } from "@/lib/constants";

export async function GET() {
  try {
    const dbSettings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = { ...DEFAULT_SITE_SETTINGS };

    dbSettings.forEach((item) => {
      settingsMap[item.key] = item.value;
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (err) {
    console.error("[api/content] Error fetching settings:", err);
    return NextResponse.json({ settings: DEFAULT_SITE_SETTINGS });
  }
}
