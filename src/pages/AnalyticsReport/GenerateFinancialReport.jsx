import { FiDownloadCloud, FiEye } from "react-icons/fi";

const Field = ({ label, children }) => (
  <div className="flex-1 min-w-[180px]">
    <p className="text-[13px] text-[#6A7282] mb-1">{label}</p>
    {children}
  </div>
);

const Select = ({ options, defaultValue }) => (
  <div className="relative">
    <select defaultValue={defaultValue} className="w-full appearance-none border rounded-lg px-3 py-2 pr-8 text-[14px] text-[#111827] bg-white shadow-sm focus:outline-none">
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full border rounded-lg px-3 py-2 text-[14px] text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none"
  />
);

const PrimaryBtn = ({ icon, children }) => (
  <button className="inline-flex items-center gap-2 bg-[#009689] hover:bg-[#00897d] text-white text-[14px] font-medium px-4 py-2 rounded-lg">
    {icon}
    {children}
  </button>
);

const SecondaryBtn = ({ icon, children }) => (
  <button className="inline-flex items-center gap-2 border px-4 py-2 rounded-lg text-[14px] text-[#111827] bg-white">
    {icon}
    {children}
  </button>
);

const GenerateFinancialReport = () => {
  const reportTypes = [
    { label: "Revenue Report", value: "revenue" },
    { label: "Commission Report", value: "commission" },
    { label: "Payout Report", value: "payout" },
  ];

  const exportFormats = [
    { label: "PDF", value: "pdf" },
    { label: "CSV", value: "csv" },
    { label: "XLSX", value: "xlsx" },
  ];

  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-5 bg-white">
      <p className="text-[#101828] text-[18px] font-semibold">Generate Financial Report</p>

      <div className="mt-4 flex flex-wrap gap-4">
        <Field label="Report Type">
          <Select options={reportTypes} defaultValue="revenue" />
        </Field>
        <Field label="Start Date">
          <Input type="date" defaultValue="2024-03-01" />
        </Field>
        <Field label="End Date">
          <Input type="date" defaultValue="2024-03-31" />
        </Field>
        <Field label="Export Format">
          <Select options={exportFormats} defaultValue="pdf" />
        </Field>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <PrimaryBtn icon={<FiDownloadCloud />}>Generate & Download</PrimaryBtn>
        <SecondaryBtn icon={<FiEye />}>Preview Report</SecondaryBtn>
      </div>
    </div>
  );
};

export default GenerateFinancialReport;