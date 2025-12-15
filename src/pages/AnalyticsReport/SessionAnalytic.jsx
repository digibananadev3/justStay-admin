const StatRow = ({ label, value, accent }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-[#6A7282] text-[14px]">{label}</span>
    <span className={`text-[14px] font-semibold ${accent || "text-[#0B1220]"}`}>{value}</span>
  </div>
);

const ListCard = ({ title, rows }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
    <p className="text-[#101828] text-[16px] font-semibold">{title}</p>
    <div className="mt-2 divide-y divide-[#F1F5F9]">
      {rows.map((r, i) => (
        <StatRow key={i} {...r} />
      ))}
    </div>
  </div>
);

// Reusable container. Pass custom rows via props or use defaults below
const SessionAnalytic = ({
  sessionRows = [
    { label: "Average Session Duration", value: "14m 32s" },
    { label: "Pages per Session", value: "4.7" },
    { label: "New vs Returning", value: "32% / 68%" },
    { label: "Peak Usage Time", value: "8 PM - 11 PM" },
  ],
  deviceRows = [
    { label: "Mobile App", value: "62%" },
    { label: "Mobile Web", value: "28%" },
    { label: "Desktop", value: "10%" },
    { label: "App Downloads (This Month)", value: "1,234", accent: "text-[#009689]" },
  ],
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ListCard title="Session Analytics" rows={sessionRows} />
      <ListCard title="Device & Platform" rows={deviceRows} />
    </div>
  );
};

export default SessionAnalytic;