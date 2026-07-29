"use client";

import { useEffect, useState, use as usePromise } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";

type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
  monthlyBill: string | null;
  roofType: string | null;
  message: string | null;
  status: string;
  source: string;
  notes: string | null;
  whatsappSent: boolean;
};

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"];

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = usePromise(params);
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/leads/${id}`);
      if (res.status === 401) return router.push("/admin/login");
      if (res.status === 404) return router.push("/admin");
      const data = await res.json();
      setLead(data.lead);
      setNotes(data.lead.notes ?? "");
      setLoading(false);
    })();
  }, [id, router]);

  async function updateStatus(status: string) {
    if (!lead) return;
    setLead({ ...lead, status });
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function saveNotes() {
    setSaving(true);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this lead permanently? This cannot be undone.")) return;
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    router.push("/admin");
  }

  if (loading || !lead) {
    return <div className="max-w-3xl mx-auto px-6 py-10 text-sm font-medium text-[#6B6F6C]">Loading lead detail…</div>;
  }

  const waLink = `https://wa.me/${lead.phone.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1C1F1D] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/admin" className="text-xs font-bold text-[#012c2d] hover:underline flex items-center gap-1 mb-4">
          ← Back to Enquiries Dashboard
        </Link>

        <div className="bg-white rounded-2xl border border-[#E7E3D8] p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#012c2d]">{lead.name}</h1>
              <p className="text-xs font-medium text-[#6B6F6C] mt-1">
                Received {new Date(lead.createdAt).toLocaleString()}
                {lead.whatsappSent ? " · WhatsApp Alert Sent" : " · WhatsApp Alert Pending"}
              </p>
            </div>
            <StatusBadge status={lead.status} />
          </div>

          {/* Status changer */}
          <div className="mt-6 pt-6 border-t border-[#E7E3D8]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6F6C] mb-2">
              Update Lead Status:
            </label>
            <div className="flex gap-2 flex-wrap">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    lead.status === s
                      ? "bg-[#012c2d] text-[#c9ff35] border-[#012c2d] shadow-sm"
                      : "bg-white text-[#1C1F1D] border-[#E7E3D8] hover:border-[#012c2d]"
                  }`}
                >
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-white rounded-2xl border border-[#E7E3D8] p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
          <Detail label="Phone" value={lead.phone} link={waLink} linkLabel="Open WhatsApp Chat" />
          <Detail label="Email" value={lead.email} link={lead.email ? `mailto:${lead.email}` : undefined} linkLabel="Send Email" />
          <Detail label="City" value={lead.city} />
          <Detail label="Address" value={lead.address} />
          <Detail label="Monthly Bill" value={lead.monthlyBill} />
          <Detail label="Roof Type / Installation" value={lead.roofType} />
          <Detail label="Source" value={lead.source.replace("_", " ")} />
        </div>

        {lead.message && (
          <div className="bg-white rounded-2xl border border-[#E7E3D8] p-6 shadow-sm mb-4">
            <p className="text-xs uppercase tracking-wider font-bold text-[#6B6F6C] mb-2">Customer Message</p>
            <p className="text-sm text-[#1C1F1D] whitespace-pre-wrap leading-relaxed">{lead.message}</p>
          </div>
        )}

        {/* Internal Notes */}
        <div className="bg-white rounded-2xl border border-[#E7E3D8] p-6 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs uppercase tracking-wider font-bold text-[#6B6F6C]">Internal Team Notes</p>
            {saving && <p className="text-xs font-bold text-emerald-600">Autosaving…</p>}
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            rows={4}
            placeholder="Add internal notes — e.g. call summary, quote details, follow-up date..."
            className="w-full rounded-xl border border-[#E7E3D8] p-3 text-sm outline-none focus:ring-2 focus:ring-[#012c2d] resize-none text-[#1C1F1D]"
          />
        </div>

        <button
          onClick={handleDelete}
          className="text-xs font-bold text-red-600 hover:underline bg-red-50 border border-red-200 px-4 py-2 rounded-full"
        >
          Delete Lead Permanently
        </button>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  link,
  linkLabel,
}: {
  label: string;
  value: string | null;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider font-bold text-[#6B6F6C] mb-1">{label}</p>
      <p className="text-sm font-semibold text-[#1C1F1D]">{value || "—"}</p>
      {link && value && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-emerald-700 hover:underline mt-1 inline-block"
        >
          {linkLabel ?? "Open"} →
        </a>
      )}
    </div>
  );
}
