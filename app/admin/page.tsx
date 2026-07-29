"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { CMSManager } from "@/components/admin/CMSManager";
import { Sparkles, MessageSquare } from "lucide-react";

type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  monthlyBill: string | null;
  status: string;
  source: string;
  whatsappSent: boolean;
};

type StatusCount = { status: string; _count: number };

const STATUS_TABS = [
  { key: "ALL", label: "All" },
  { key: "NEW", label: "New" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "QUOTED", label: "Quoted" },
  { key: "WON", label: "Won" },
  { key: "LOST", label: "Lost" },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [mainView, setMainView] = useState<"enquiries" | "cms">("enquiries");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<StatusCount[]>([]);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status !== "ALL") params.set("status", status);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/leads?${params.toString()}`);
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setLeads(data.leads ?? []);
    setCounts(data.counts ?? []);
    setLoading(false);
  }, [status, search, router]);

  useEffect(() => {
    if (mainView === "enquiries") {
      const t = setTimeout(load, search ? 300 : 0);
      return () => clearTimeout(t);
    }
  }, [load, search, mainView]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const countFor = (key: string) =>
    key === "ALL"
      ? leads.length
      : counts.find((c) => c.status === key)?._count ?? 0;

  const newCount = counts.find((c) => c.status === "NEW")?._count ?? 0;

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1C1F1D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <header className="flex items-center justify-between mb-6 pb-4 border-b border-[#E7E3D8]">
          <div>
            <h1 className="text-3xl font-extrabold text-[#012c2d]">Solaryn Admin Center</h1>
            <p className="text-sm font-medium text-[#6B6F6C] mt-1">
              Manage lead enquiries and live website content.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-[#012c2d] hover:underline bg-white px-3.5 py-2 rounded-full border border-[#E7E3D8]"
            >
              ← View Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-600 hover:underline bg-red-50 px-3.5 py-2 rounded-full border border-red-200"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Top-level Admin Mode Switcher */}
        <div className="flex bg-white p-1.5 rounded-full border border-[#E7E3D8] mb-8 w-fit shadow-sm text-xs font-bold">
          <button
            onClick={() => setMainView("enquiries")}
            className={`px-6 py-2.5 rounded-full flex items-center gap-2 transition-all ${
              mainView === "enquiries"
                ? "bg-[#012c2d] text-[#c9ff35] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Lead Enquiries ({leads.length})
            {newCount > 0 && (
              <span className="bg-[#c9ff35] text-[#012c2d] text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1">
                {newCount} NEW
              </span>
            )}
          </button>
          <button
            onClick={() => setMainView("cms")}
            className={`px-6 py-2.5 rounded-full flex items-center gap-2 transition-all ${
              mainView === "cms"
                ? "bg-[#012c2d] text-[#c9ff35] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#E8A33D]" /> Website Content & Image Manager (CMS)
          </button>
        </div>

        {/* View 1: Lead Enquiries */}
        {mainView === "enquiries" && (
          <div>
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setStatus(tab.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      status === tab.key
                        ? "bg-[#012c2d] text-[#c9ff35] border-[#012c2d] shadow-sm"
                        : "bg-white text-[#1C1F1D] border-[#E7E3D8] hover:border-[#012c2d]"
                    }`}
                  >
                    {tab.label}
                    {tab.key !== "ALL" && countFor(tab.key) > 0 && (
                      <span className="ml-1.5 opacity-80 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
                        {countFor(tab.key)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search name, phone, email, city…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:max-w-xs rounded-full border border-[#E7E3D8] bg-white px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-[#012c2d] shadow-sm text-[#1C1F1D]"
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#E7E3D8] overflow-hidden shadow-sm">
              {loading ? (
                <div className="p-10 text-center text-sm font-medium text-[#6B6F6C]">Loading enquiries…</div>
              ) : leads.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-sm font-semibold text-[#6B6F6C]">No enquiries found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E7E3D8] bg-[#F7F5EF] text-left text-[11px] font-extrabold uppercase tracking-wider text-[#6B6F6C]">
                        <th className="px-5 py-3.5">Name</th>
                        <th className="px-5 py-3.5">Phone</th>
                        <th className="px-5 py-3.5 hidden md:table-cell">City</th>
                        <th className="px-5 py-3.5 hidden lg:table-cell">Monthly Bill</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 hidden sm:table-cell">Received</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EEE5]">
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => router.push(`/admin/leads/${lead.id}`)}
                          className="hover:bg-[#FAF8F3] cursor-pointer transition-colors"
                        >
                          <td className="px-5 py-4 font-bold text-[#012c2d]">
                            <Link href={`/admin/leads/${lead.id}`} className="hover:underline">
                              {lead.name}
                            </Link>
                          </td>
                          <td className="px-5 py-4 font-medium text-[#4A4D49]">{lead.phone}</td>
                          <td className="px-5 py-4 text-[#4A4D49] hidden md:table-cell">
                            {lead.city ?? "—"}
                          </td>
                          <td className="px-5 py-4 text-[#4A4D49] hidden lg:table-cell font-semibold">
                            {lead.monthlyBill ?? "—"}
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={lead.status} />
                          </td>
                          <td className="px-5 py-4 text-xs font-medium text-[#8A8D89] hidden sm:table-cell">
                            {timeAgo(lead.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View 2: CMS Content Manager */}
        {mainView === "cms" && <CMSManager />}
      </div>
    </div>
  );
}
