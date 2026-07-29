import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json({ settings });
  } catch (err) {
    console.error("[api/admin/content] Error:", err);
    return NextResponse.json({ error: "Failed to load content settings." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
    }

    try {
      const updates = Object.entries(settings).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      );
      await prisma.$transaction(updates);
    } catch (dbErr) {
      console.warn("[api/admin/content] Transaction warn, trying sequential save:", dbErr);
      for (const [key, value] of Object.entries(settings)) {
        try {
          await prisma.siteSetting.upsert({
            where: { key },
            update: { value: String(value) },
            create: { key, value: String(value) },
          });
        } catch (itemErr) {
          console.warn(`[api/admin/content] Failed key ${key}:`, itemErr);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/admin/content] Save error:", err);
    return NextResponse.json({ error: "Failed to save content settings." }, { status: 500 });
  }
}
