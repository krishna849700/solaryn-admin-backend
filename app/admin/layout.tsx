import type { ReactNode } from "react";

export const metadata = {
  title: "Solaryn Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#1C1F1D]">
      {children}
    </div>
  );
}
