import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.trim();

    const where: Record<string, any> = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { city: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const counts = await prisma.lead.groupBy({
      by: ["status"],
      _count: true,
    });

    return NextResponse.json({ leads, counts });
  } catch (err) {
    console.error("[api/admin/leads] Error:", err);
    return NextResponse.json({ error: "Failed to load leads." }, { status: 500 });
  }
}
