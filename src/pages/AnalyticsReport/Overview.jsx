import { FiUser, FiTarget, FiSmartphone } from "react-icons/fi";
import SummaryCardList from "./SummaryCardList";
import UserBehaviorAnalysis from "./UserBehaviorAnalysis";

const MetricCard = ({ icon, title, value }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
    <div className="flex items-center gap-2 text-[#6A7282] text-[13px]">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#4F46E5]">
        {icon}
      </span>
      <span className="font-medium text-[#364153]">{title}</span>
    </div>
    <p className="mt-4 text-[28px] leading-[32px] font-semibold text-[#0B1220]">
      {value}
    </p>
  </div>
);

const Overview = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={<FiUser />}
          title="Daily Active Users"
          value="8,249"
        />
        <MetricCard
          icon={<FiTarget />}
          title="Conversion Rate"
          value="3.8%"
        />
        <MetricCard
          icon={<FiSmartphone />}
          title="App Downloads"
          value="1,234"
        />
      </div>
      <div>
        <SummaryCardList />
      </div>
      <div className="mt-4">
        <UserBehaviorAnalysis />
      </div>
    </>
  );
}

export default Overview;