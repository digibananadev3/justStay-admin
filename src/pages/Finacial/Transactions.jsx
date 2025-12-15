import SearchComponent from "../../components/BasicComponent/SearchComponent";
import SelectComponent from "../../components/BasicComponent/SelectComponent";
import TableComponent from "../../components/BasicComponent/TableComponent";
import { LuDownload, LuTrendingUp, LuTrendingDown, LuDollarSign } from "react-icons/lu";

const StatusBadge = ({ status }) => {
  const map = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };
  const cls = map[status] || map.Pending;
  return <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${cls}`}>{status}</span>;
};

const sampleRows = [
  { transactionId: "TXN001", type: "Booking", amount: "₹5,000", user: "Rajesh Sharma", status: "Completed", date: "2024-03-15 10:30 AM" },
  { transactionId: "TXN002", type: "Withdrawal", amount: "₹15,000", user: "Hotel Paradise", status: "Pending", date: "2024-03-15 9:45 AM" },
  { transactionId: "TXN003", type: "Commission", amount: "₹750", user: "Platform", status: "Completed", date: "2024-03-14 8:20 PM" },
];

const typeIcon = (type) => {
  if (type === "Booking") return <LuTrendingUp className="text-green-600" />;
  if (type === "Withdrawal") return <LuTrendingDown className="text-red-600" />;
  return <LuDollarSign className="text-purple-600" />;
};

const columns = [
  {
    header: "TRANSACTION ID",
    accessor: "transactionId",
    render: (value) => <span className="font-semibold text-[#111827]">{value}</span>,
  },
  {
    header: "TYPE",
    accessor: "type",
    render: (value) => (
      <div className="flex items-center gap-2">
        {typeIcon(value)}
        <span className="text-[#374151]">{value}</span>
      </div>
    ),
  },
  {
    header: "AMOUNT",
    accessor: "amount",
    render: (value) => <span className="text-[#00A63E] font-medium">{value}</span>,
  },
  { header: "USER", accessor: "user" },
  {
    header: "STATUS",
    accessor: "status",
    render: (value) => <StatusBadge status={value} />,
  },
  { header: "DATE", accessor: "date" },
];

const Transactions = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <SearchComponent placeholder="Search transactions..." />
        </div>
        <div className="w-40">
          <SelectComponent options={["All Type", "Booking", "Withdrawal", "Commission"]} />
        </div>
        <button className="inline-flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">
          <LuDownload />
          Export
        </button>
      </div>
      <div className="mt-12">
        <TableComponent columns={columns} data={sampleRows} />
      </div>
    </div>
  );
};

export default Transactions;