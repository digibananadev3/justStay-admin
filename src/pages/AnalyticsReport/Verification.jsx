const ProgressBar = ({ label, value, percent, color }) => (
  <div className="mb-5">
    <div className="flex items-center justify-between">
      <p className="text-[#364153] text-[14px]">{label}</p>
      <p className="text-[#0B1220] text-[14px] font-semibold">{value}</p>
    </div>
    <div className="mt-2 h-2 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
      <div className="h-full rounded-full" style={{ width: percent, backgroundColor: color }} />
    </div>
    <p className="mt-1 text-[12px] text-[#6A7282]">{percent} of total users</p>
  </div>
);

const StatRow = ({ label, value, accent, strong }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-[#6A7282] text-[14px]">{label}</span>
    <span className={`text-[14px] ${strong ? "font-semibold" : "font-medium"} ${accent || "text-[#0B1220]"}`}>{value}</span>
  </div>
);

const Card = ({ title, children }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
    <p className="text-[#101828] text-[16px] font-semibold mb-2">{title}</p>
    {children}
  </div>
);

const Verification = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card title="Verification Status Distribution">
        <ProgressBar label="Verified Users" value="8,945" percent="78%" color="#16A34A" />
        <ProgressBar label="Unverified Users" value="2,534" percent="22%" color="#F97316" />
      </Card>

      <Card title="Withdrawal Patterns">
        <div className="divide-y divide-[#F1F5F9]">
          <StatRow label="Verified User Withdrawals" value="95.2%" accent="text-[#059669]" />
          <StatRow label="Unverified User Attempts" value="4.8%" accent="text-[#DC2626]" />
          <StatRow label="Average Processing Time" value="2.3 hours" strong />
          <StatRow label="Fraud Prevention Rate" value="99.1%" accent="text-[#2563EB]" />
        </div>
      </Card>
    </div>
    </>
  );
}

export default Verification