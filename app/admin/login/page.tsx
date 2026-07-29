"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Incorrect password.");
        setLoading(false);
        return;
      }
      const from = searchParams.get("from") || "/admin";
      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#012c2d] text-[#c9ff35] font-extrabold text-xl mb-4 shadow-md">
            S
          </div>
          <h1 className="text-2xl font-extrabold text-[#1C1F1D]">Solaryn Admin</h1>
          <p className="text-sm text-[#6B6F6C] mt-1">Sign in to view customer enquiries</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#E7E3D8] p-6 shadow-xl space-y-4"
        >
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#1C1F1D] mb-2">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="w-full rounded-xl border border-[#DDD8C9] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#012c2d] focus:border-transparent text-[#1C1F1D]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#012c2d] text-[#c9ff35] text-sm font-bold py-3 hover:bg-[#16301F] transition-colors disabled:opacity-60 shadow-md"
          >
            {loading ? "Signing in…" : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
