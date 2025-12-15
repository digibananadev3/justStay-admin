import { LuFilter, LuDownload, LuClock3, LuGlobe } from "react-icons/lu";

const toneMap = {
  verification: "bg-indigo-100 text-indigo-700",
  financial: "bg-emerald-100 text-emerald-700",
  system: "bg-cyan-100 text-cyan-700",
  content: "bg-violet-100 text-violet-700",
  support: "bg-sky-100 text-sky-700",
  staff: "bg-teal-100 text-teal-700",
  analytics: "bg-amber-100 text-amber-700 border border-amber-200",
};

const Badge = ({ children, tone = "verification" }) => (
  <span className={` font-medium inline-flex items-center rounded-xl px-2.5 py-1 text-[12px] ${toneMap[tone] || toneMap.verification}`}>
    {children}
  </span>
);

const ActivityItem = ({ actor, badge, badgeTone, actionTitle, detail, time, ip }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-[#0F172A] truncate">{actor}</p>
            <Badge tone={badgeTone}>{badge}</Badge>
          </div>
          <p className="mt-1 text-[14px] text-[#0F172A]">{actionTitle}</p>
          <p className="mt-1 text-[12px] text-[#6A7282] leading-5">{detail}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-[12px] text-[#6A7282]">
        <span className="inline-flex items-center gap-1">
          <LuClock3 size={14} />
          {time}
        </span>
        <span className="inline-flex items-center gap-1">
          <LuGlobe size={14} />
          {ip}
        </span>
      </div>
    </div>
  );
};

const StaffRecentActivity = () => {
  const items = [
    {
      actor: "Priya Sharma",
      badge: "Verification",
      badgeTone: "verification",
      actionTitle: "Approved Guest KYC",
      detail: "Approved KYC for Guest ID: G001 - Rahul Sharma",
      time: "2025-10-10 10:35 AM",
      ip: "192.168.1.45",
    },
    {
      actor: "Sneha Reddy",
      badge: "Financial",
      badgeTone: "financial",
      actionTitle: "Processed Withdrawal",
      detail: "Processed withdrawal of ₹45,000 for Hotel ID: H002",
      time: "2025-10-10 10:20 AM",
      ip: "192.168.1.78",
    },
    {
      actor: "Rajesh Kumar",
      badge: "System Config",
      badgeTone: "system",
      actionTitle: "Updated System Settings",
      detail: "Modified payment gateway settings - Razorpay credentials updated",
      time: "2025-10-10 9:45 AM",
      ip: "192.168.1.12",
    },
    {
      actor: "Ananya Gupta",
      badge: "Content",
      badgeTone: "content",
      actionTitle: "Published Offer",
      detail: "Published new offer: 'Weekend Special - 20% OFF'",
      time: "2025-10-10 9:30 AM",
      ip: "192.168.1.89",
    },
    {
      actor: "Amit Patel",
      badge: "Support",
      badgeTone: "support",
      actionTitle: "Responded to Support Ticket",
      detail: "Resolved ticket #TTK1234 - Booking cancellation issue",
      time: "2025-10-09 8:50 PM",
      ip: "192.168.1.56",
    },
    {
      actor: "Priya Sharma",
      badge: "Verification",
      badgeTone: "verification",
      actionTitle: "Rejected Hotel Verification",
      detail: "Rejected verification for Hotel ID: H003 - Invalid GST documents",
      time: "2025-10-09 5:30 PM",
      ip: "192.168.1.45",
    },
    {
      actor: "Rajesh Kumar",
      badge: "Staff Management",
      badgeTone: "staff",
      actionTitle: "Created Staff Account",
      detail: "Created new staff account for: Karan Mehta (Support Agent)",
      time: "2025-10-09 3:15 PM",
      ip: "192.168.1.12",
    },
    {
      actor: "Sneha Reddy",
      badge: "Analytics",
      badgeTone: "analytics",
      actionTitle: "Exported Financial Report",
      detail: "Exported monthly revenue report for September 2025",
      time: "2025-10-09 2:45 PM",
      ip: "192.168.1.78",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-semibold text-[#0F172A]">Recent Activity Log</h3>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="font-semibold inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-gray-200 text-[14px] text-[#0A0A0A]">
            <LuFilter size={16} />
            All Employees
          </button>
          <button type="button" className="font-semibold inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-gray-200 text-[14px] text-[#0A0A0A]">
            <LuDownload size={16} />
            Export Logs
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((it, idx) => (
          <ActivityItem key={idx} {...it} />
        ))}
      </div>
    </div>
  );
};

export default StaffRecentActivity;