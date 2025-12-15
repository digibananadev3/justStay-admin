import { LuUsers, LuCheck, LuActivity, LuShield } from "react-icons/lu";

const StatCard = ({ title, value, icon: Icon, badgeBg, badgeText, badgeBorder }) => (
  <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 flex items-start justify-between">
    <div>
      <p className="text-[13px] text-[#6A7282]">{title}</p>
      <p className="mt-2 font-poppins text-[22px] leading-7 font-semibold text-[#0F172A]">{value}</p>
    </div>
    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${badgeBg} ${badgeText} border ${badgeBorder}`}>
      <Icon size={18} />
    </span>
  </div>
);

const CardInfo = () => {
  const cards = [
    {
      title: "Total Staff",
      value: 6,
      icon: LuUsers,
      badgeBg: "bg-[#E5EDFF]",
      badgeText: "text-[#3A6FF8]",
      badgeBorder: "border-[#E5EDFF]",
    },
    {
      title: "Active Staff",
      value: 5,
      icon: LuCheck,
      badgeBg: "bg-[#DCFCE7]",
      badgeText: "text-[#016630]",
      badgeBorder: "border-[#DCFCE7]",
    },
    {
      title: "Active Sessions",
      value: 6,
      icon: LuActivity,
      badgeBg: "bg-[#F3E8FF]",
      badgeText: "text-[#7C3AED]",
      badgeBorder: "border-[#F3E8FF]",
    },
    {
      title: "2FA Enabled",
      value: 4,
      icon: LuShield,
      badgeBg: "bg-[#FFEAD5]",
      badgeText: "text-[#EA580C]",
      badgeBorder: "border-[#FFEAD5]",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c) => (
        <StatCard key={c.title} {...c} />
      ))}
    </div>
  );
};

export default CardInfo;