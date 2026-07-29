"use client";

/**
 * EXAMPLE ONLY — shows how to wire your existing
 * "Request Free Site Audit & Quote" form to the new /api/enquiry endpoint.
 *
 * Copy the handleSubmit logic (and the field names) into your real form
 * component — keep your existing design/animations, just swap in this
 * submit handler and state.
 */

import { useState } from "react";

export default function SiteAuditForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    monthlyBill: "",
    roofType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "SITE_AUDIT" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        monthlyBill: "",
        roofType: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="p-6 text-center">
        <p className="font-medium">Thanks — we've got your details.</p>
        <p className="text-sm text-gray-500 mt-1">
          Our team will reach out shortly with your free site audit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        placeholder="Full name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
      />
      <input
        required
        placeholder="Phone number"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
      />
      <input
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <input
        placeholder="City"
        value={form.city}
        onChange={(e) => update("city", e.target.value)}
      />
      <input
        placeholder="Average monthly electricity bill"
        value={form.monthlyBill}
        onChange={(e) => update("monthlyBill", e.target.value)}
      />
      <textarea
        placeholder="Anything else we should know?"
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request Free Site Audit & Quote"}
      </button>
    </form>
  );
}
