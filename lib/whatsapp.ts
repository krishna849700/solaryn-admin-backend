type LeadForAlert = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  monthlyBill?: string | null;
  message?: string | null;
  source: string;
};

export async function sendWhatsAppAlert(lead: LeadForAlert): Promise<boolean> {
  const alertPhone = process.env.WHATSAPP_ALERT_PHONE;
  const apiKey = process.env.WHATSAPP_CALLMEBOT_APIKEY;

  if (!alertPhone || !apiKey) {
    console.warn(
      "[whatsapp] Skipped: WHATSAPP_ALERT_PHONE or WHATSAPP_CALLMEBOT_APIKEY not set"
    );
    return false;
  }

  const lines = [
    "🔆 New Solaryn Enquiry",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.city ? `City: ${lead.city}` : null,
    lead.monthlyBill ? `Monthly bill: ${lead.monthlyBill}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    `Source: ${lead.source}`,
    `View: ${process.env.NEXT_PUBLIC_APP_URL ?? ""}/admin/leads/${lead.id}`,
  ].filter(Boolean);

  const text = lines.join("\n");

  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", alertPhone);
  url.searchParams.set("text", text);
  url.searchParams.set("apikey", apiKey);

  try {
    const res = await fetch(url.toString(), { method: "GET" });
    if (!res.ok) {
      console.error("[whatsapp] CallMeBot request failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[whatsapp] Failed to send alert:", err);
    return false;
  }
}
