import TableComponent from "../../components/BasicComponent/TableComponent";
import { FiEye } from "react-icons/fi";
import { LuCheck } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

// Reusable small UI primitives
const Pill = ({ color, children }) => (
  <span className={` font-medium  inline-flex items-center gap-1 text-[12px] px-2.5 py-1 rounded-md ${color}`}>{children}</span>
);

const StatusBadge = ({ status }) => {
  const map = {
    Pending: "bg-[#FFF7ED] text-[#CA3500]",
    Approved: "bg-[#ECFDF5] text-[#065F46]",
    Rejected: "bg-[#FEF2F2] text-[#991B1B]",
  };
  return <Pill color={map[status] || "bg-gray-100 text-gray-700"}>{status}</Pill>;
};

const RowActions = ({ status, onApprove, onReject, onView }) => {
  if (status === "Approved") {
    return (
      <button onClick={onView} className="inline-flex items-center gap-1 border px-3 py-1.5 rounded-lg text-[12px] text-[#111827]">
        <FiEye /> View
      </button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <button onClick={onApprove} className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] px-3 py-1.5 rounded-lg">
        <LuCheck className="text-[14px]" /> Approve
      </button>
      <button onClick={onReject} className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[12px] px-3 py-1.5 rounded-lg">
        <RxCross2 className="text-[14px]" /> Reject
      </button>
    </div>
  );
};

// Sample dataset
const rows = [
  { id: "RF001", customer: "Rajesh Kumar", bookingId: "BK12345", amount: "₹2,500", reason: "Hotel facilities not as described", date: "2024-03-15", status: "Pending" },
  { id: "RF002", customer: "Priya Sharma", bookingId: "BK12346", amount: "₹1,800", reason: "Emergency cancellation", date: "2024-03-14", status: "Approved" },
  { id: "RF003", customer: "Amit Patel", bookingId: "BK12347", amount: "₹3,200", reason: "Double booking issue", date: "2024-03-14", status: "Pending" },
  { id: "RF004", customer: "Sneha Gupta", bookingId: "BK12348", amount: "₹950", reason: "Room not available on arrival", date: "2024-03-13", status: "Approved" },
  { id: "RF005", customer: "Vikram Singh", bookingId: "BK12349", amount: "₹4,500", reason: "Policy violation claim", date: "2024-03-12", status: "Rejected" },
  { id: "RF006", customer: "Kavita Joshi", bookingId: "BK12350", amount: "₹2,100", reason: "Medical emergency", date: "2024-03-12", status: "Pending" },
];

const columns = [
  { header: "REQUEST ID", accessor: "id", render: (v) => <span className="font-medium text-[#101828]">{v}</span> },
  { header: "CUSTOMER", accessor: "customer" },
  { header: "BOOKING ID", accessor: "bookingId" },
  { header: "AMOUNT", accessor: "amount" },
  { header: "REASON", accessor: "reason", render: (v) => <span className="text-[#6A7282]">{v}</span> },
  { header: "DATE", accessor: "date" },
  { header: "STATUS", accessor: "status", render: (v) => <StatusBadge status={v} /> },
  { header: "ACTIONS", accessor: "actions", render: (_, row) => (
      <RowActions status={row.status} onApprove={() => {}} onReject={() => {}} onView={() => {}} />
    )
  },
];

const Refunds = () => {
  const counts = rows.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Approved: 0, Rejected: 0 }
  );

  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="font-semibold text-[#101828] text-[18px] leading-[24px]">Refund Requests</p>
          <p className="text-[#4A5565] text-[13px] leading-[18px]">Manage customer refund requests and processing</p>
        </div>
        <div className="flex items-center gap-2">
          <Pill color="bg-[#FFF7ED] text-[#9A3412]">• Pending {counts.Pending}</Pill>
          <Pill color="bg-[#ECFDF5] text-[#065F46]">• Approved {counts.Approved}</Pill>
          <Pill color="bg-[#FEF2F2] text-[#991B1B]">• Rejected {counts.Rejected}</Pill>
        </div>
      </div>

      <TableComponent columns={columns} data={rows} />
    </div>
  );
};

export default Refunds;