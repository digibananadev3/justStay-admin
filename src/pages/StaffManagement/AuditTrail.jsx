import { LuActivity, LuTriangleAlert, LuLock } from "react-icons/lu";
import StaffRecentActivity from "./StaffRecentActivity";
import SecurityPolicies from "./SecurityPolicies";

const toneMap = {
  blue: {
    badge: "bg-indigo-100 text-indigo-700",
    icon: "text-indigo-600",
  },
  red: {
    badge: "bg-rose-100 text-rose-700",
    icon: "text-rose-600",
  },
  amber: {
    badge: "bg-amber-100 text-amber-700",
    icon: "text-amber-600",
  },
};

const StatsCard = ({ title, value, icon, tone = "blue" }) => {
  const t = toneMap[tone] || toneMap.blue;
  const Icon = icon;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 flex items-center justify-between">
      <div>
        <p className="text-[12px] text-[#6A7282]">{title}</p>
        <p className="mt-1 text-[22px] font-semibold text-[#0F172A] leading-7">{value}</p>
      </div>
      <div className={`h-10 w-10 rounded-xl inline-flex items-center justify-center ${t.badge}`}>
        <Icon size={18} className={t.icon} />
      </div>
    </div>
  );
};

const AuditTrail = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <StatsCard title="Total Actions Today" value={347} icon={LuActivity } tone="blue" />
        <StatsCard title="Failed Login Attempts" value={12} icon={LuTriangleAlert } tone="red" />
        <StatsCard title="Password Expiring Soon" value={3} icon={LuLock} tone="amber" />
      </div>
      <div className="mt-6">
        <StaffRecentActivity />
      </div>
      <div className="mt-6">
        <SecurityPolicies />
      </div>
    </>
  );
};

export default AuditTrail;