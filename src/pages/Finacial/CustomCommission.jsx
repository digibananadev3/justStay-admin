import TableComponent from "../../components/BasicComponent/TableComponent";
import { LuPlus } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

const rows = [
  {
    hotel: "Grand Taj Hotel Chain",
    properties: "15 Properties",
    category: "Luxury Hotels",
    customRate: { base: "12%", tax: "+GST", final: "14.16%" },
    volume: { label: "High Volume", color: "bg-[#F3E8FF] text-[#6E11B0]" },
    date: "2024-01-01",
    status: { label: "Active", color: "bg-emerald-50 text-emerald-700" },
  },
  {
    hotel: "Paradise Resorts",
    properties: "8 Properties",
    category: "Luxury Hotels",
    customRate: { base: "13%", tax: "+GST", final: "15.34%" },
    volume: { label: "Medium Volume", color: "bg-[#DBEAFE] text-[#193CB8]" },
    date: "2024-02-15",
    status: { label: "Active", color: "bg-emerald-50 text-emerald-700" },
  },
  {
    hotel: "QuickStay Hourly",
    properties: "Single Property",
    category: "Hourly Stays",
    customRate: { base: "16%", tax: "+GST", final: "18.88%" },
    volume: { label: "Standard", color: "bg-[#F3F4F6] text-[#1E2939]" },
    date: "2024-03-01",
    status: { label: "Active", color: "bg-emerald-50 text-emerald-700" },
  },
];

const columns = [
  {
    header: "HOTEL NAME",
    accessor: "hotel",
    render: (v, row) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 text-sm">
          🏨
        </div>
        <div>
          <p className="text-[#101828] font-medium">{v}</p>
          <p className="text-[#6A7282] text-[12px]">{row.properties}</p>
        </div>
      </div>
    ),
  },
  { header: "CATEGORY", accessor: "category" },
  {
    header: "CUSTOM RATE",
    accessor: "customRate",
    render: (rate) => (
      <div className="text-[#009689] font-medium">
        {rate.base} <span>({rate.tax} = </span>
        <span> {rate.final} </span>
        <span> ) </span>
      </div>
    ),
  },
  {
    header: "VOLUME TIER",
    accessor: "volume",
    render: (vol) => (
      <span className={`inline-block font-medium text-[12px] px-2.5 py-1 rounded-full ${vol.color}`}>{vol.label}</span>
    ),
  },
  { header: "EFFECTIVE DATE", accessor: "date" },
  {
    header: "STATUS",
    accessor: "status",
    render: (s) => (
      <span className={`inline-block text-[12px] px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span>
    ),
  },
  {
    header: "ACTIONS",
    accessor: "actions",
    render: () => (
      <button className="inline-flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm text-[#111827]">
        <FaEdit /> Edit
      </button>
    ),
  },
];

const CustomCommission = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-[#101828] text-[18px] leading-[24px]">D. Hotel-specific Custom Commission</p>
          <p className="text-[#4A5565] text-[13px] leading-[18px]">Override category rates for specific properties with custom negotiated rates</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#009689] text-white text-[14px] font-medium px-4 py-2 rounded-lg">
          <LuPlus />
          Add Custom Rate
        </button>
      </div>

      <TableComponent columns={columns} data={rows} />
    </div>
  );
};

export default CustomCommission;