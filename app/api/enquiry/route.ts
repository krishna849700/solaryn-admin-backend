import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppAlert } from "@/lib/whatsapp";

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = process.env.NODE_ENV === "development" ? 2_000 : 60_000;

function isRateLimited(ip: string): boolean {
  if (process.env.NODE_ENV === "development") return false; // Disable rate limiting in local development for smooth testing
  const last = recentSubmissions.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_WINDOW_MS) return true;
  recentSubmissions.set(ip, now);
  return false;
}

const VALID_SOURCES = ["SITE_AUDIT", "CONTACT", "NEWSLETTER", "OTHER"] as const;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = body.email ? String(body.email).trim() : null;
    const address = body.address ? String(body.address).trim() : null;
    const city = body.city ? String(body.city).trim() : null;
    const monthlyBill = body.monthlyBill ? String(body.monthlyBill).trim() : null;
    const roofType = body.roofType ? String(body.roofType).trim() : null;
    const message = body.message ? String(body.message).trim() : null;
    const source = VALID_SOURCES.includes(body.source) ? body.source : "SITE_AUDIT";

    // Minimal validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 && phone !== "N/A" && phone !== "0000000000") {
      return NextResponse.json({ error: "Please enter a valid phone number (at least 7 digits)." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { name, phone: phone || "N/A", email, address, city, monthlyBill, roofType, message, source },
    });

    // Fire the WhatsApp alert asynchronously
    const sent = await sendWhatsAppAlert(lead);
    if (sent) {
      await prisma.lead.update({ where: { id: lead.id }, data: { whatsappSent: true } });
    }

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[api/enquiry] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
