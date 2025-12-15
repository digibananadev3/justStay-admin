import { LuBuilding, LuDollarSign, LuUsers, LuUserCheck, LuCircleAlert, LuTrendingUp } from "react-icons/lu";


const StatCard = ({ title, value, icon: Icon, trendText, color, isAlert, symbol }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-sm rounded-2xl p-4 xl:p-5 w-full">
      <div>
        <p className="text-[14px] text-[#4A5565]">{title}</p>
        <h2 className="text-[24px] font-semibold mt-1 text-[#101828] leading-[32px] tracking-[0px]">{value}</h2>
        <p
          className={`flex items-center text-[14px] mt-2 ${
            isAlert ? "text-[#E7000B]" : "text-[#00A63E]"
          }`}
        >
          {isAlert ? (
            <LuCircleAlert className="mr-1" />
          ) : (
            <LuTrendingUp className="mr-1" />
          )}
          {trendText}
        </p>
      </div>

      <div
        className={`w-11 h-11 xl:w-12 xl:h-12 flex items-center justify-center rounded-xl ${
          isAlert ? "bg-orange-100 text-orange-500" : `${color} bg-opacity-10`
        }`}
      >
        <Icon className={`text-[24px] ${color} ${symbol}`} />
      </div>
    </div>
  );
};

const DashbordTill = ({ headerData }) => {
  const formatNumber = (num) => {
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)}L`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)}K`;
    }
    return `₹${num?.toLocaleString("en-IN") || 0}`;
  };

  const formatCount = (num) => {
    return num?.toLocaleString("en-IN") || 0;
  };

  const stats = [
    {
      title: "Total Bookings",
      value: formatCount(headerData?.totalBookings),
      icon: LuBuilding,
      trendText: "+12.5% from last week",
      color: "bg-[#CBFBF1]",
      symbol: "text-[#009689]"
    },
    {
      title: "Total Revenue",
      value: formatNumber(headerData?.totalRevenue),
      icon: LuDollarSign,
      trendText: "+18.2% from last week",
      color: "bg-[#DCFCE7]",
      symbol: "text-[#00A63E]"
    },
    {
      title: "Active Users",
      value: formatCount(headerData?.activeUsers),
      icon: LuUsers,
      trendText: "+8.3% from last week",
      color: "bg-[#DBEAFE]",
      symbol: "text-[#155DFC]"
    },
    {
      title: "Pending Verifications",
      value: formatCount(headerData?.pendingVerifications),
      icon: LuUserCheck,
      trendText: headerData?.pendingVerifications > 0 ? "Requires attention" : "All clear",
      color: "bg-[#FFEDD4]",
      symbol: "text-[#F54900]",
      isAlert: headerData?.pendingVerifications > 0,
    },
  ];

  return (
    <div className="mt-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default DashbordTill;