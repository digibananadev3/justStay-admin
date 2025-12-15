import { FiArrowDownRight } from "react-icons/fi";

const StatRow = ({ label, value, accent }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-[#6A7282] text-[14px]">{label}</span>
    <span className={`text-[14px] font-semibold ${accent || "text-[#0B1220]"}`}>{value}</span>
  </div>
);

const ReasonRow = ({ label, percent, color }) => (
  <div className="py-2">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[#384253] text-[14px]">{label}</span>
      <span className="text-[#6A7282] text-[13px]">{percent}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-[#EEF2F7] overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }} />
    </div>
  </div>
);

const CancellationAnalytics = () => {
  const total = 6666;
  const successful = 6234; // 93.5%
  const cancelled = 432; // 6.5%
  const avgValue = "₹3,250";
  const reasons = [
    { label: "Change of Plans", percent: 38, color: "#EF4444" },
    { label: "Better Price Found", percent: 24, color: "#F59E0B" },
    { label: "Property Not Available", percent: 18, color: "#FBBF24" },
    { label: "Payment Issues", percent: 12, color: "#3B82F6" },
    { label: "Other Reasons", percent: 8, color: "#6B7280" },
  ];

  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-5 bg-white">
      <p className="text-[#101828] text-[18px] font-semibold">Cancellation Rates & Reasons</p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Stats */}
        <div>
          <p className="text-[#1F2A37] text-[14px] font-semibold mb-3">Cancellation Statistics</p>
          <div className="divide-y divide-[#F1F5F9]">
            <StatRow label="Total Bookings" value={total.toLocaleString()} />
            <StatRow label="Successful Bookings" value={`${successful.toLocaleString()} (93.5%)`} accent="text-[#059669]" />
            <StatRow label="Cancelled Bookings" value={`${cancelled.toLocaleString()} (6.5%)`} accent="text-[#DC2626]" />
            <StatRow label="Average Booking Value" value={avgValue} />
            <div className="flex items-center justify-between py-2">
              <span className="text-[#6A7282] text-[14px]">Cancellation Rate Trend</span>
              <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#10B981]">
                <FiArrowDownRight /> -1.2%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Reasons */}
        <div>
          <p className="text-[#1F2A37] text-[14px] font-semibold mb-3">Top Cancellation Reasons</p>
          <div className="space-y-3">
            {reasons.map((r, i) => (
              <ReasonRow key={i} label={r.label} percent={r.percent} color={r.color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancellationAnalytics;