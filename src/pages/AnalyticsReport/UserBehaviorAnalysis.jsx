import { FiGlobe, FiRefreshCw } from "react-icons/fi";

const MiniStat = ({ icon, label, value }) => (
  <div className="rounded-2xl bg-[#F8FAFC] p-4 w-56">
    <div className="flex items-center gap-2 text-[#6A7282] text-[13px]">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#4F46E5] border border-[#E5E7EB]">
        {icon}
      </span>
      <span className="font-medium text-[#364153]">{label}</span>
    </div>
    <p className="mt-3 text-[24px] leading-[28px] font-semibold text-[#0B1220]">{value}</p>
  </div>
);

const UserBehaviorAnalysis = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 bg-white">
      <p className="text-[#364153] text-[14px] font-semibold mb-4">User Behavior Analysis</p>
      <div className="flex items-center gap-4">
        <MiniStat icon={<FiGlobe />} label="Bounce Rate" value="24.5%" />
        <MiniStat icon={<FiRefreshCw />} label="Return Users" value="68.3%" />
      </div>
    </div>
  );
}

export default UserBehaviorAnalysis;