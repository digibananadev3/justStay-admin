import TableComponent from "../../components/BasicComponent/TableComponent";
import {LuShield, LuPlus, LuSquarePen, LuTrash2 } from "react-icons/lu";
import AcceptableIDTypes from "./AcceptableIDTypes";

const VarificationRules = () => {

  const rules = [
    {
      id: "pan",
      field: "PAN Number",
      type: "mandatory",
      rule: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
      description: "10-character alphanumeric PAN format",
      status: "Active",
    },
    {
      id: "aadhaar",
      field: "Aadhaar Number",
      type: "mandatory",
      rule: "^[0-9]{12}$",
      description: "12-digit numeric Aadhaar format",
      status: "Active",
    },
    {
      id: "bank_account",
      field: "Bank Account Number",
      type: "mandatory",
      rule: "^[0-9]{9,18}$",
      description: "9-18 digit bank account number",
      status: "Active",
    },
  ];

  const statusBadge = (status) => (
    <span className="px-2.5 py-1 text-[12px] rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">{status}</span>
  );

  const typeChip = (type) => (
    <span className="px-2.5 py-1 text-[12px] font-medium rounded-xl border bg-[#FDECEE] text-[#C1121F] border-rose-200">
      {type}
    </span>
  );

  const columns = [
    {
      header: "Field Name",
      accessor: "field",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <LuShield size={16} />
          <span className="font-poppins font-medium text-[14px] text-[#0F172A]">{value}</span>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      render: (value) => typeChip(value),
    },
    {
      header: "Validation Rule",
      accessor: "rule",
      render: (value) => (
        <code className="px-2.5 py-1 text-[12px] rounded-md bg-gray-100 border border-gray-200 text-gray-800">
          {value}
        </code>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      render: (value) => <span className="text-[14px] text-[#0F172A]">{value}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => statusBadge(value),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex items-center gap-3 text-gray-600">
          <button className="hover:text-blue-600" aria-label={`Edit ${row.field}`} onClick={(e) => e.stopPropagation()}>
            <LuSquarePen size={16} />
          </button>
          <button className="hover:text-red-600" aria-label={`Delete ${row.field}`} onClick={(e) => e.stopPropagation()}>
            <LuTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins text-[22px] leading-7 font-semibold text-[#0F172A]">Verification Rules Configuration</h2>
        <button type="button" className="inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-gray-200 text-white bg-emerald-600 hover:bg-emerald-700 transition">
          <LuPlus size={16} />
          <span className="text-[13px] font-medium">Add Rule</span>
        </button>
      </div>

      <TableComponent columns={columns} data={rules} />

      <div>
        <AcceptableIDTypes />
      </div>
    </div>
  );
};

export default VarificationRules