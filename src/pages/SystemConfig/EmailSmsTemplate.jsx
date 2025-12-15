import TableComponent from "../../components/BasicComponent/TableComponent";
import { LuMail, LuMessageSquare, LuEye, LuSquarePen, LuTrash2, LuPlus } from "react-icons/lu";

const EmailSmsTemplate = () => {
  const templates = [
    {
      id: "booking_confirmation",
      name: "Booking Confirmation",
      type: "Booking",
      subject: "Your booking is confirmed – JustStay",
      status: "Active",
      channel: "Email",
      icon: LuMail,
      updatedAt: "2024-03-15",
    },
    {
      id: "cancellation_notice",
      name: "Cancellation Notice",
      type: "Cancellation",
      subject: "Booking cancellation confirmation",
      status: "Active",
      channel: "Sms",
      icon: LuMessageSquare,
      updatedAt: "2024-03-14",
    },
    {
      id: "verification_update",
      name: "Verification Update",
      type: "Verification",
      subject: "Account verification status update",
      status: "Draft",
      channel: "Email",
      icon: LuMail,
      updatedAt: "2024-03-13",
    },
  ];

  const statusBadge = (status) => {
    const map = {
      Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Draft: "bg-amber-50 text-amber-700 border-amber-200",
      Inactive: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return map[status] || map.Inactive;
  };

  const columns = [
    {
      header: "Template Name",
      accessor: "name",
      render: (value) => (
        <span className="font-poppins font-semibold text-[14px] text-[#0F172A]">{value}</span>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      render: (value) => (
        <span className="px-2.5 py-1 text-[12px] font-medium rounded-xl border bg-[#ECEEF2] text-[#030213] border-gray-200">
          {value}
        </span>
      ),
    },
    {
      header: "Subject",
      accessor: "subject",
      render: (value) => <span className="text-[14px] text-[#0F172A]">{value}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span className={`px-2.5 py-1 text-[12px] rounded-full border ${statusBadge(value)}`}>{value}</span>
      ),
    },
    {
      header: "Sent By",
      accessor: "channel",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600 border border-blue-100">
            <row.icon size={14} />
          </span>
          <span className="text-[13px] text-[#0F172A]">{value}</span>
        </div>
      ),
    },
    {
      header: "Last Modified",
      accessor: "updatedAt",
      render: (value) => <span className="text-[13px] text-[#6A7282]">{value}</span>,
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex items-center gap-3 text-gray-600">
          <button type="button" className="hover:text-blue-600" aria-label={`Preview ${row.name}`}>
            <LuEye size={16} />
          </button>
          <button type="button" className="hover:text-blue-600" aria-label={`Edit ${row.name}`}>
            <LuSquarePen size={16} />
          </button>
          <button type="button" className="hover:text-red-600" aria-label={`Delete ${row.name}`}>
            <LuTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins text-[22px] leading-7 font-semibold text-[#0F172A]">Email & SMS Templates</h2>
        <div className="flex items-center gap-3">
          <button type="button" className="inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition">
            <LuPlus size={16} />
            <span className="text-[13px] font-medium">Add Email Template</span>
          </button>
          <button type="button" className="inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition">
            <LuPlus size={16} />
            <span className="text-[13px] font-medium">Add SMS Template</span>
          </button>
        </div>
      </div>

      <TableComponent columns={columns} data={templates} />
    </div>
  );
};

export default EmailSmsTemplate;