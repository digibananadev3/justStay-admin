import { FiDollarSign, FiTrendingUp } from "react-icons/fi";

const StatSummaryCard = ({ icon, title, value, delta, tone = "teal" }) => {
  const tones = {
    teal: { chip: "bg-[#E6FFFA] text-[#009689]", badge: "bg-[#ECFDF5] text-[#065F46]" },
    purple: { chip: "bg-[#F5F3FF] text-[#6D28D9]", badge: "bg-[#ECFDF5] text-[#065F46]" },
    indigo: { chip: "bg-[#EEF2FF] text-[#4F46E5]", badge: "bg-[#ECFDF5] text-[#065F46]" },
  }[tone];

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
      <div className="flex items-start justify-between">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${tones.chip}`}>{icon}</span>
        <span className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${tones.badge}`}>{delta}</span>
      </div>

      <p className="mt-6 text-[#364153] text-[14px] font-medium">{title}</p>
      <p className="mt-2 text-[26px] leading-[30px] font-semibold text-[#0B1220]">{value}</p>
      <p className="mt-6 text-[12px] text-[#6A7282]">Last 30 days</p>
    </div>
  );
};

const CardInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatSummaryCard
        icon={<FiDollarSign />}
        title="Total Revenue"
        value="₹12,45,67,890"
        delta="+15.2%"
        tone="teal"
      />
      <StatSummaryCard
        icon={<FiTrendingUp />}
        title="Commission Earned"
        value="₹1,86,85,184"
        delta="+22.8%"
        tone="purple"
      />
      <StatSummaryCard
        icon={<FiTrendingUp />}
        title="Payouts Processed"
        value="₹10,58,82,706"
        delta="+8.5%"
        tone="indigo"
      />
    </div>
  );
};

export default CardInfo;