import { FaEdit } from "react-icons/fa";
import { FiPercent, FiCalendar, FiDollarSign } from "react-icons/fi";

const RuleCard = ({ title, icon, primary, description }) => (
  <div className="rounded-2xl bg-[#F8FAFC] p-4">
    <p className="text-[#364153] text-[14px] font-semibold">{title}</p>
    <div className="mt-3 flex items-start gap-3">
      <div className="mt-0.5 text-[#99A1AF]">{icon}</div>
      <div>
        <p className="text-[#101828] text-[14px] font-medium">{primary}</p>
        <p className="text-[#6A7282] text-[12px] mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const CommissionRules = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-[#101828] text-[18px] leading-[24px]">E. Commission Rules</p>
          <p className="text-[#4A5565] text-[13px] leading-[18px]">Global commission calculation and policy settings</p>
        </div>
        <button className="inline-flex items-center gap-2 border px-4 py-2 rounded-lg text-[14px] text-[#111827]">
          <FaEdit />
          Edit Rules
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RuleCard
          title="Commission Calculation Method"
          icon={<FiDollarSign />}
          primary="Percentage of total booking amount"
          description="Commission calculated on the final booking value including all charges"
        />

        <RuleCard
          title="Minimum Commission Amount"
          icon={<FiDollarSign />}
          primary="₹50 per booking"
          description="Minimum commission charged even if percentage is lower"
        />

        <RuleCard
          title="Tax Handling"
          icon={<FiPercent />}
          primary="GST Exclusive (18% GST added)"
          description="GST is calculated separately and added to base commission rate"
        />

        <RuleCard
          title="Rate Change Effective Date"
          icon={<FiCalendar />}
          primary="30 days notice period"
          description="All rate changes require 30-day advance notification to hotels"
        />
      </div>
    </div>
  );
};

export default CommissionRules;