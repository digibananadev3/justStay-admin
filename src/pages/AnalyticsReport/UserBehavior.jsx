import { FiUser, FiActivity, FiGlobe, FiRefreshCw } from "react-icons/fi";
import ConversionFunnel from "./ConversionFunnel";
import SessionAnalytic from "./SessionAnalytic";

const StatCard = ({ icon, title, value, delta, tone = "indigo" }) => {
  const tones = {
    indigo: { chip: "bg-[#EEF2FF] text-[#4F46E5]", badge: "bg-[#ECFDF5] text-[#065F46]" },
    green: { chip: "bg-[#ECFDF5] text-[#059669]", badge: "bg-[#ECFDF5] text-[#065F46]" },
    purple: { chip: "bg-[#F5F3FF] text-[#6D28D9]", badge: "bg-[#E6FFFA] text-[#009689]" },
    teal: { chip: "bg-[#E6FFFA] text-[#009689]", badge: "bg-[#ECFDF5] text-[#065F46]" },
  }[tone];

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${tones.chip}`}>
          {icon}
        </span>
        <span className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${tones.badge}`}>{delta}</span>
      </div>
      <p className="mt-4 text-[13px] text-[#6A7282]">{title}</p>
      <p className="mt-2 text-[24px] leading-[28px] font-semibold text-[#0B1220]">{value}</p>
    </div>
  );
};

const UserBehavior = () => {
  return (
    <>    
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={<FiUser />} title="Daily Active Users (DAU)" value="8,249" delta="+12.5%" tone="indigo" />
        <StatCard icon={<FiActivity />} title="Monthly Active Users (MAU)" value="45,892" delta="+18.3%" tone="green" />
        <StatCard icon={<FiGlobe />} title="Bounce Rate" value="24.5%" delta="-2.1%" tone="purple" />
        <StatCard icon={<FiRefreshCw />} title="Return User Rate" value="68.3%" delta="+5.4%" tone="teal" />
      </div>

      <div className="mt-6">
        <ConversionFunnel />
      </div>

      <div className="mt-6">
        <SessionAnalytic />
      </div>
    </>
  );
}

export default UserBehavior;