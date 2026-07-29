import nodemailer from "nodemailer";

export type MultiStepLeadData = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  location: string;
  message?: string;
};

export async function sendEmailAlert(lead: MultiStepLeadData): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const ownerEmail = process.env.OWNER_EMAIL ?? gmailUser;

  if (!gmailUser || !gmailAppPassword || !ownerEmail) {
    console.warn("[alerts:email] Skipped: GMAIL_USER, GMAIL_APP_PASSWORD, or OWNER_EMAIL missing in .env");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #FAF8F3; padding: 24px; color: #1C1F1D;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E7E3D8; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: #012c2d; padding: 16px 24px; border-radius: 12px; margin-bottom: 24px;">
            <h2 style="color: #c9ff35; margin: 0; font-size: 20px;">🔆 New Solar Lead Estimate Request</h2>
            <p style="color: #ffffff; margin: 4px 0 0 0; font-size: 13px;">Konark Solar • Multi-Step Customer Inquiry</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #F0EEE5;">
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C; width: 140px;">Customer Name:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #012c2d;">${lead.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0EEE5;">
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C;">Phone Number:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #012c2d;">${lead.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0EEE5;">
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C;">Email Address:</td>
              <td style="padding: 10px 0; color: #1C1F1D;">${lead.email || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0EEE5;">
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C;">Selected Service:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #012c2d;">${lead.service}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0EEE5;">
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C;">Budget Range:</td>
              <td style="padding: 10px 0; color: #1C1F1D;">${lead.budget}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0EEE5;">
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C;">Timeline / Urgency:</td>
              <td style="padding: 10px 0; color: #1C1F1D;">${lead.timeline}</td>
            </tr>
            <tr style="border-bottom: 1px solid #F0EEE5;">
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C;">Location / City:</td>
              <td style="padding: 10px 0; color: #1C1F1D;">${lead.location}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #6B6F6C;">Message Details:</td>
              <td style="padding: 10px 0; color: #1C1F1D;">${lead.message || "None provided"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; pt: 16px; border-top: 1px dashed #E7E3D8; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" style="background: #012c2d; color: #c9ff35; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: bold; font-size: 13px; display: inline-block;">View in Admin Dashboard →</a>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Solaryn Konark Solar" <${gmailUser}>`,
      to: ownerEmail,
      subject: `🔆 New Lead: ${lead.name} (${lead.service})`,
      html: htmlContent,
    });

    console.log("[alerts:email] Email alert sent successfully to:", ownerEmail);
    return true;
  } catch (err) {
    console.error("[alerts:email] Email alert failed:", err);
    return false;
  }
}

export async function sendWhatsAppAlert(lead: MultiStepLeadData): Promise<boolean> {
  const ownerPhone = process.env.OWNER_PHONE ?? process.env.WHATSAPP_ALERT_PHONE;
  const apiKey = process.env.CALLMEBOT_API_KEY ?? process.env.WHATSAPP_CALLMEBOT_APIKEY;

  if (!ownerPhone || !apiKey) {
    console.warn("[alerts:whatsapp] Skipped: OWNER_PHONE or CALLMEBOT_API_KEY missing in .env");
    return false;
  }

  const lines = [
    "🔆 New Solaryn Lead Request",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    `Service: ${lead.service}`,
    `Budget: ${lead.budget}`,
    `Timeline: ${lead.timeline}`,
    `Location: ${lead.location}`,
    lead.message ? `Notes: ${lead.message}` : null,
    `Dashboard: ${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/admin`,
  ].filter(Boolean);

  const text = lines.join("\n");

  try {
    const url = new URL("https://api.callmebot.com/whatsapp.php");
    url.searchParams.set("phone", ownerPhone.replace(/\D/g, ""));
    url.searchParams.set("text", text);
    url.searchParams.set("apikey", apiKey);

    const res = await fetch(url.toString(), { method: "GET" });
    if (!res.ok) {
      console.error("[alerts:whatsapp] CallMeBot API status:", res.status);
      return false;
    }
    console.log("[alerts:whatsapp] WhatsApp alert sent successfully!");
    return true;
  } catch (err) {
    console.error("[alerts:whatsapp] WhatsApp alert error:", err);
    return false;
  }
}

export async function triggerDualAlerts(lead: MultiStepLeadData): Promise<{ emailSent: boolean; whatsappSent: boolean }> {
  // Both fire independently — if one fails, the other still fires!
  const [emailSent, whatsappSent] = await Promise.all([
    sendEmailAlert(lead).catch(() => false),
    sendWhatsAppAlert(lead).catch(() => false),
  ]);

  return { emailSent, whatsappSent };
}
