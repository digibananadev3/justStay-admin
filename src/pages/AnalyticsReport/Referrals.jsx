const StatCard = ({ title, value }) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
    <p className="text-[#6A7282] text-[13px]">{title}</p>
    <p className="mt-3 text-[24px] leading-[28px] font-semibold text-[#0B1220]">{value}</p>
  </div>
);

const Referrals = ({ cards = [
  { title: "Total Sign-ups", value: "1,245" },
  { title: "Referral Earnings", value: "₹89,450" },
  { title: "Conversion Rate", value: "12.5%" },
] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <StatCard key={i} title={c.title} value={c.value} />
      ))}
    </div>
  );
}

export default Referrals;