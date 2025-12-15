import { LuBuilding, LuUserPlus, LuWallet, LuUserCheck, LuCircleCheckBig, LuClock } from "react-icons/lu";

const StatusPill = ({ status }) => {
  const statusMap = {
    "CheckIn": { label: "Check In", isCompleted: true },
    "CheckOut": { label: "Check Out", isCompleted: true },
    "Completed": { label: "Completed", isCompleted: true },
    "New": { label: "New", isCompleted: false },
    "processing": { label: "Processing", isCompleted: false },
    "Pending": { label: "Pending", isCompleted: false },
  };
  
  const statusInfo = statusMap[status] || { label: status, isCompleted: false };
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  return (
    <span className={`${base} ${statusInfo.isCompleted ? "bg-[#DCFCE7] text-[#00A63E]" : "bg-[#FEF3C7] text-[#B45309]"}`}>
      {statusInfo.isCompleted ? <LuCircleCheckBig className="mr-1" /> : <LuClock className="mr-1" />}
      {statusInfo.label}
    </span>
  );
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const ActivityItem = ({ icon: Icon, iconBg, iconColor, title, status, subtitle, meta, amount }) => {
  return (
    <div className="flex items-start justify-between rounded-2xl bg-[#F8FAFC] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`text-[20px] ${iconColor}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-[#101828]">{title}</p>
            {status && <StatusPill status={status} />}
          </div>
          <p className="text-[13px] text-[#4A5565]">{subtitle}</p>
          <p className="text-[13px] text-[#98A2B3]">{meta}</p>
        </div>
      </div>
      {amount && <div className="text-right text-[14px] font-semibold text-[#101828]">{amount}</div>}
    </div>
  );
};

const RecentActivity = ({ recentActivity = [] }) => {
  const getActivityConfig = (activity) => {
    const configs = {
      booking: {
        icon: LuBuilding,
        iconBg: "bg-[#CBFBF1]",
        iconColor: "text-[#009689]",
        title: "Booking",
        getSubtitle: () => `Booking ID: ${activity.id?.slice(-8) || ""}`,
      },
      property: {
        icon: LuBuilding,
        iconBg: "bg-[#E9FBF3]",
        iconColor: "text-[#00A63E]",
        title: "New Property",
        getSubtitle: () => activity.title || "New hotel listing",
      },
      settlement: {
        icon: LuWallet,
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#7C3AED]",
        title: "Settlement",
        getSubtitle: () => "Settlement request",
      },
    };

    return configs[activity.type] || {
      icon: LuBuilding,
      iconBg: "bg-[#CBFBF1]",
      iconColor: "text-[#009689]",
      title: activity.type || "Activity",
      getSubtitle: () => "",
    };
  };

  const items = recentActivity.map((activity) => {
    const config = getActivityConfig(activity);
    return {
      icon: config.icon,
      iconBg: config.iconBg,
      iconColor: config.iconColor,
      title: config.title,
      status: activity.status,
      subtitle: config.getSubtitle(),
      meta: formatTimeAgo(activity.createdAt),
      amount: activity.amount ? `₹${activity.amount.toLocaleString("en-IN")}` : null,
    };
  });

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-semibold text-[#101828]">Recent Activity</h2>
          <p className="text-[14px] text-[#98A2B3]">Latest bookings, sign-ups, and withdrawals</p>
        </div>
        <button className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-[14px] font-medium text-[#101828] hover:bg-[#F8FAFC]">View All</button>
      </div>

      <div className="mt-8">
        {items.map((it, idx) => (
          <ActivityItem key={idx} {...it} />
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
