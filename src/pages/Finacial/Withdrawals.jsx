import SelectComponent from "../../components/BasicComponent/SelectComponent";
import TableComponent from "../../components/BasicComponent/TableComponent";
import { LuDownload, LuCircleCheckBig } from "react-icons/lu";
import { GiCancel } from "react-icons/gi";

const Pill = ({ tone = "green", children }) => {
  const map = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${map[tone] || map.gray}`}>{children}</span>;
};

const AvatarName = ({ name }) => (
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-semibold">
      {name?.[0] || "?"}
    </div>
    <span className="text-[#111827]">{name}</span>
  </div>
);

const sampleRows = [
  { requestId: "WD001", user: "Hotel Paradise", amount: "₹15,000", bank: "****1234", verification: "verified", status: "Pending" },
  { requestId: "WD002", user: "Grand Palace Hotel", amount: "₹25,000", bank: "****5678", verification: "verified", status: "Approved" },
];

const columns = [
  { header: "REQUEST ID", accessor: "requestId", render: (v) => <span className="font-semibold text-[#111827]">{v}</span> },
  { header: "USER", accessor: "user", render: (v) => <AvatarName name={v} /> },
  { header: "AMOUNT", accessor: "amount", render: (v) => <span className="text-[#101828] font-medium">{v}</span> },
  { header: "BANK ACCOUNT", accessor: "bank" },
  { header: "VERIFICATION", accessor: "verification", render: (v) => <Pill tone="green">{v}</Pill> },
  { header: "STATUS", accessor: "status", render: (v) => <Pill tone={v === "Approved" ? "green" : v === "Pending" ? "yellow" : "gray"}>{v}</Pill> },
  {
    header: "ACTIONS",
    accessor: "actions",
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <button className="cursor-pointer px-3 h-8 rounded-lg bg-[#00A63E] text-white text-[13px] font-medium inline-flex items-center gap-2">
          <LuCircleCheckBig /> Approve
        </button>
        <button className="cursor-pointer px-3 h-8 rounded-lg bg-[#D4183D] text-white text-[13px] font-medium inline-flex items-center gap-2">
          <GiCancel /> Reject
        </button>
      </div>
    ),
  },
];

const Withdrawals = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-lg font-semibold text-[#101828]">Withdrawal Requests</h2>
        <div className="flex items-center gap-3">
          <div className="w-40">
            <SelectComponent options={["All Status", "Pending", "Approved", "Rejected"]} />
          </div>
          <button className="inline-flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">
            <LuDownload />
            Export
          </button>
        </div>
      </div>

      <TableComponent columns={columns} data={sampleRows} />
    </div>
  );
};

export default Withdrawals;