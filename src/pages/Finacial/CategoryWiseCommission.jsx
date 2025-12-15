import TableComponent from "../../components/BasicComponent/TableComponent";
import { LuPlus } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

const rows = [
  { category: "Luxury Hotels", baseRate: "15%", taxHandling: "+GST", finalRate: "17.7%" },
  { category: "Budget Hotels", baseRate: "12%", taxHandling: "+GST", finalRate: "14.16%" },
  { category: "Hourly Stays", baseRate: "18%", taxHandling: "+GST", finalRate: "21.24%" },
  { category: "Apartments", baseRate: "10%", taxHandling: "+GST", finalRate: "11.8%" },
];

const columns = [
  { header: "CATEGORY", accessor: "category", render: (v) => <span className="text-[#101828] font-medium">{v}</span> },
  { header: "BASE RATE", accessor: "baseRate" },
  { header: "TAX HANDLING", accessor: "taxHandling" },
  { header: "FINAL RATE", accessor: "finalRate", render: (v) => <span className="text-[#0EA5A2] font-medium">{v}</span> },
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

const CategoryWiseCommission = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-[#101828] text-[18px] leading-[24px]">A. Category-wise Commission</p>
          <p className="text-[#4A5565] text-[13px] leading-[18px]">Default commission rates for different hotel categories</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#009689] text-white text-[14px] font-medium px-4 py-2 rounded-lg">
          <LuPlus />
          Add Category
        </button>
      </div>

      <TableComponent columns={columns} data={rows} />
    </div>
  );
}

export default CategoryWiseCommission;