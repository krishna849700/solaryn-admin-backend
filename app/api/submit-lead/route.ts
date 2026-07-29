import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { triggerDualAlerts, MultiStepLeadData } from "@/lib/alerts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const service = String(body.service ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const timeline = String(body.timeline ?? "").trim();
    const location = String(body.location ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      return NextResponse.json({ error: "Please enter a valid phone number (at least 7 digits)." }, { status: 400 });
    }

    const leadData: MultiStepLeadData = {
      name,
      phone,
      email,
      service,
      budget,
      timeline,
      location,
      message,
    };

    let leadId = `lead-${Date.now()}`;
    
    // Save to Prisma SQLite database if available
    try {
      const dbLead = await prisma.lead.create({
        data: {
          name,
          phone,
          email: email || null,
          city: location || null,
          monthlyBill: budget || null,
          roofType: service || null,
          message: `[Timeline: ${timeline}] ${message}`.trim(),
          source: "MULTI_STEP_FORM",
        },
      });
      leadId = dbLead.id;
      leadData.id = leadId;
    } catch (dbErr) {
      console.warn("[api/submit-lead] Database save warning:", dbErr);
    }

    // Trigger Email & WhatsApp dual alerts independently
    const alertResult = await triggerDualAlerts(leadData);

    if (alertResult.whatsappSent && leadId.length > 20) {
      await prisma.lead.update({
        where: { id: leadId },
        data: { whatsappSent: true },
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      id: leadId,
      emailSent: alertResult.emailSent,
      whatsappSent: alertResult.whatsappSent,
    }, { status: 201 });
  } catch (err) {
    console.error("[api/submit-lead] Error:", err);
    return NextResponse.json(
      { error: "Failed to submit lead request. Please try again." },
      { status: 500 }
    );
  }
}
