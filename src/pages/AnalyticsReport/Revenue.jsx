import RevenueBreakdown from "./RevenueBreakdown";

const CategoryCard = ({ title, amount, percent, tone }) => {
  const tones = {
    pink: "from-[#FAF5FF] to-[#F3E8FF] text-[#9B1BB0]",
    indigo: "from-[#EFF6FF] to-[#DBEAFE] text-[#1447E6]",
    teal: "from-[#F0FDFA] to-[#CBFBF1] text-[#00786F]",
    gray: "from-[#F9FAFB] to-[#F3F4F6] text-[#364153]",
  };
  const toneCls = tones[tone] || tones.gray;
  return (
    <div className={`rounded-2xl p-4 bg-gradient-to-br ${toneCls}`}>
      <p className="text-[14px] font-semibold opacity-90">{title}</p>
      <p className="mt-2 text-[22px] leading-[26px] font-semibold text-[#0B1220]">
        {amount}
      </p>
      <p className="mt-1 text-[12px]">{percent} of total</p>
    </div>
  );
};

const Revenue = () => {
  const data = [
    { title: "Luxury Hotels", amount: "₹8,45,000", percent: "45%", tone: "pink" },
    { title: "Budget Hotels", amount: "₹5,23,000", percent: "28%", tone: "indigo" },
    { title: "Hourly Bookings", amount: "₹3,12,000", percent: "17%", tone: "teal" },
    { title: "Others", amount: "₹1,89,000", percent: "10%", tone: "gray" },
  ];

  return (
    <>
      <div className="border rounded-2xl border-[#E5E7EB] p-5 bg-white">
        <p className="text-[#101828] text-[18px] font-semibold">Revenue by Category</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((d, i) => (
            <CategoryCard key={i} {...d} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Revenue;