import TableComponent from "../../components/BasicComponent/TableComponent";
import { LuUser, LuMail, LuMessageSquare, LuShieldCheck, LuWallet, LuCalendarCheck, LuEye } from "react-icons/lu";

const Avatar = ({ name }) => {
  const initial = name?.[0]?.toUpperCase() || "?";
  const colors = {
    bg: "bg-[#CBFBF1]",
    text: "text-[#00786F]",
    border: "border-[#CBFBF1]",
  };
  return (
    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${colors.bg} ${colors.text} border ${colors.border} text-[12px] font-semibold`}>
      {initial}
    </span>
  );
};

const chip = (label, tone) => {
  const map = {
    high: "bg-[#FFE2E2] text-[#9F0712] border-[#FFE2E2]",
    medium: "bg-[#FEF9C2] text-[#9F0712] border-[#FEF9C2]",
    low: "bg-[#DCFCE7] text-[#016630] border-[#DCFCE7]",
    open: "bg-[#FFE2E2] text-[#9F0712] border-[#FFE2E2]",
    inprogress: "bg-[#FEF9C2] text-[#9F0712] border-[#FEF9C2]",
    resolved: "bg-[#DCFCE7] text-[#016630] border-[#DCFCE7]",
  };
  return (
    <span className={`px-2.5 py-1 text-[12px] rounded-xl border font-medium ${map[tone] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {label}
    </span>
  );
};

const SupportTickets = () => {
  const data = [
    {
      id: "TKT001",
      userName: "Rajesh Sharma",
      userEmail: "rajesh@email.com",
      subject: "Document verification rejected",
      type: { label: "Verification", icon: LuShieldCheck },
      priority: "High",
      status: "Open",
      channel: { label: "Email", icon: LuMail },
      created: "2024-03-15 10:30 AM",
    },
    {
      id: "TKT002",
      userName: "Hotel Paradise",
      userEmail: "paradise@hotel.com",
      subject: "Withdrawal not processed",
      type: { label: "Payment", icon: LuWallet },
      priority: "Medium",
      status: "In progress",
      channel: { label: "Sms", icon: LuMessageSquare },
      created: "2024-03-14 2:15 PM",
    },
    {
      id: "TKT003",
      userName: "Priya Patel",
      userEmail: "priya@email.com",
      subject: "Booking cancellation issue",
      type: { label: "Booking", icon: LuCalendarCheck },
      priority: "Low",
      status: "Resolved",
      channel: { label: "Email", icon: LuMail },
      created: "2024-03-13 5:20 PM",
    },
  ];

  const columns = [
    { header: "Ticket ID", accessor: "id" },
    {
      header: "User",
      accessor: "userName",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={value} />
          <div>
            <p className="font-poppins font-medium text-[14px] leading-5">{value}</p>
            <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">{row.userEmail}</p>
          </div>
        </div>
      ),
    },
    { header: "Subject", accessor: "subject" },
    {
      header: "Type",
      accessor: "type",
      render: (value) => (
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 border border-blue-100">
            <value.icon size={14} />
          </span>
          <span className="text-[13px] text-[#0F172A]">{value.label}</span>
        </div>
      ),
    },
    {
      header: "Priority",
      accessor: "priority",
      render: (value) => chip(value, value.toLowerCase()),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => chip(value, value.replace(/\s+/g, '').toLowerCase()),
    },
    {
      header: "Sent By",
      accessor: "channel",
      render: (value) => (
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 border border-blue-100">
            <value.icon size={14} />
          </span>
          <span className="text-[13px] text-[#0F172A]">{value.label}</span>
        </div>
      ),
    },
    { header: "Created", accessor: "created" },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex items-center gap-3 text-gray-600">
          <button className="hover:text-blue-600" aria-label={`View ${row.id}`} onClick={(e) => e.stopPropagation()}>
            <LuEye size={16} />
          </button>
          {row.status !== 'Resolved' && (
            <button className="inline-flex items-center h-8 px-3 rounded-lg bg-emerald-600 text-white text-[12px] hover:bg-emerald-700" onClick={(e) => e.stopPropagation()}>
              Respond
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-10">
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default SupportTickets;