const STYLES: Record<string, string> = {
  NEW: "bg-[#FCEFD9] text-[#8A5A00] border-[#F3DBA4]",
  CONTACTED: "bg-[#E4EEF9] text-[#1D5A96] border-[#C6DEF2]",
  QUOTED: "bg-[#EDE7F9] text-[#5B3E9E] border-[#D9CEF0]",
  WON: "bg-[#E3F1E6] text-[#1F6B34] border-[#C4E4CB]",
  LOST: "bg-[#F5E9E9] text-[#8A2E2E] border-[#EBCFCF]",
};

const LABELS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTED: "Quoted",
  WON: "Won",
  LOST: "Lost",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        STYLES[status] ?? "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
