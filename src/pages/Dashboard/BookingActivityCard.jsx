import { LuBuilding, LuShieldCheck, LuDollarSign, LuTrendingUp, LuTrendingDown } from "react-icons/lu";

const StatGradientCard = ({
  title,
  value,
  footer,
  icon: Icon,
  arrow: ArrowIcon,
  gradient,
  iconColor,
  footerColor,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 ${gradient}`}>
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-sm`}>
          <Icon className={`text-[18px] ${iconColor}`} />
        </div>
      </div>

      <div className="mt-8">
        <p className="text-[14px]">{title}</p>
        <p className="mt-2 text-[28px] font-semibold leading-8">{value}</p>
        <p className={`mt-4 text-[14px] ${footerColor}`}>{footer}</p>
      </div>
    </div>
  );
};

const BookingActivityCard = ({ kpis }) => {
  const cards = [
    {
      title: "Hourly Bookings",
      value: (kpis?.hourlyBookings || 0).toLocaleString("en-IN"),
      footer: "+15% this week",
      icon: LuBuilding,
      arrow: LuTrendingUp,
      gradient: "bg-gradient-to-br from-[#B9F3E9] to-[#9DE8F8]",
      iconColor: "text-[#00A58A]",
      footerColor: "text-[#155DFC]",
    },
    {
      title: "goLive Hotels",
      value: (kpis?.goLiveHotels || 0).toLocaleString("en-IN"),
      footer: "+8 new certifications",
      icon: LuShieldCheck,
      arrow: LuTrendingUp,
      gradient: "bg-gradient-to-br from-[#D5E4FF] to-[#C7DBF8]",
      iconColor: "text-[#155DFC]",
      footerColor: "text-[#155DFC]",
    },
    {
      title: "Avg Commission",
      value: `${kpis?.avgCommission || 0}%`,
      footer: "Optimized -2%",
      icon: LuDollarSign,
      arrow: LuTrendingDown,
      gradient: "bg-gradient-to-br from-[#F6D9FF] to-[#F3CBF8]",
      iconColor: "text-[#7E22CE]",
      footerColor: "text-[#7E22CE]",
    },
  ];

  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((c, idx) => (
          <StatGradientCard key={idx} {...c} />
        ))}
      </div>
    </section>
  );
};

export default BookingActivityCard;
