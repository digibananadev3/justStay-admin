import { FiSearch, FiEye, FiShoppingCart, FiCheckCircle } from "react-icons/fi";

// Reusable stage row
const FunnelStage = ({ icon, label, sublabel, value, percent, tone = "indigo" }) => {
  const tones = {
    indigo: "from-[#EEF2FF] to-[#E0E7FF] text-[#4F46E5]",
    purple: "from-[#F5F3FF] to-[#F3E8FF] text-[#6D28D9]",
    teal: "from-[#E6FFFA] to-[#D1FAE5] text-[#059669]",
    green: "from-[#ECFDF5] to-[#D1FAE5] text-[#059669]",
  };
  const toneCls = tones[tone] || tones.indigo;
  return (
    <div className={`rounded-2xl bg-gradient-to-r ${toneCls} px-4 py-3 flex items-center justify-between`}>      
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80">
          {icon}
        </span>
        <div>
          <p className="text-[#1F2A37] text-[14px] font-semibold">{label}</p>
          <p className="text-[#6A7282] text-[12px] -mt-0.5">{sublabel}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-[#0B1220] text-[18px] font-semibold">{value}</p>
        <p className="text-[#6A7282] text-[12px]">{percent}</p>
      </div>
    </div>
  );
};

// Insights row item
const Insight = ({ label, value }) => (
  <div className="text-center">
    <p className="text-[#6A7282] text-[13px]">{label}</p>
    <p className="text-[#0B1220] text-[16px] font-semibold mt-1">{value}</p>
  </div>
);

// Main reusable component: accepts stages and insights props with sensible defaults
const ConversionFunnel = ({
  title = "Conversion Funnel: Search to Booking",
  stages = [
    { icon: <FiSearch />, label: "Search Initiated", sublabel: "Users who searched for hotels", value: "10,000", percent: "100%", tone: "indigo" },
    { icon: <FiEye />, label: "Viewed Listings", sublabel: "Clicked on hotel details", value: "6,500", percent: "65%", tone: "purple" },
    { icon: <FiShoppingCart />, label: "Added to Cart", sublabel: "Proceeded to checkout", value: "1,200", percent: "12%", tone: "teal" },
    { icon: <FiCheckCircle />, label: "Booking Completed", sublabel: "Successfully booked", value: "380", percent: "3.8%", tone: "green" },
  ],
  insights = [
    { label: "Search to View", value: "65%" },
    { label: "View to Cart", value: "18.5%" },
    { label: "Cart to Booking", value: "31.7%" },
  ],
}) => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-5 bg-white">
      <p className="text-[#101828] text-[18px] font-semibold">{title}</p>

      <div className="mt-5 space-y-3">
        {stages.map((s, i) => (
          <FunnelStage key={i} {...s} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((ins, idx) => (
            <Insight key={idx} {...ins} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel;