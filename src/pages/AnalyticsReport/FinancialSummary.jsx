const StatRow = ({ label, value, accent }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-[#6A7282] text-[14px]">{label}</span>
    <span className={`text-[14px] font-semibold ${accent || "text-[#0B1220]"}`}>{value}</span>
  </div>
);

const ListCard = ({ title, rows = [], footer }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
    <p className="text-[#101828] text-[16px] font-semibold mb-2">{title}</p>
    <div className="divide-y divide-[#F1F5F9]">
      {rows.map((r, i) => (
        <StatRow key={i} {...r} />
      ))}
      {footer && (
        <div className="pt-3 mt-1 border-t border-[#E5E7EB]">
          <StatRow {...footer} />
        </div>
      )}
    </div>
  </div>
);

const FinancialSummary = () => {
  const commissionRows = [
    { label: "Platform Commission", value: "₹1,78,75,184" },
    { label: "Payment Gateway Fees", value: "₹8,10,000" },
    { label: "GST (18%)", value: "₹33,63,533" },
  ];
  const commissionFooter = { label: "Net Commission", value: "₹1,37,01,651", accent: "text-[#059669]" };

  const payoutRows = [
    { label: "Total Payouts", value: "₹10,58,82,706" },
    { label: "Pending Payouts", value: "₹45,23,890", accent: "text-[#E85523]" },
    { label: "Processing Time (Avg.)", value: "2.3 hours" },
  ];
  const payoutFooter = { label: "Success Rate", value: "98.7%", accent: "text-[#059669]" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ListCard title="Commission Details" rows={commissionRows} footer={commissionFooter} />
      <ListCard title="Payout Summary" rows={payoutRows} footer={payoutFooter} />
    </div>
  );
};

export default FinancialSummary;