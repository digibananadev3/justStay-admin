import { FiFileText } from "react-icons/fi";

const TemplateButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 border border-[#E5E7EB] bg-white hover:bg-[#F8FAFC] text-[#111827] text-[14px] px-4 py-2 rounded-lg shadow-sm"
  >
    <FiFileText className="text-[#111827]" />
    {label}
  </button>
);

const QuickExport = () => {
  const templates = [
    { label: "Monthly P&L" },
    { label: "Tax Report" },
    { label: "Commission Report" },
    { label: "Payout Statement" },
  ];

  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-5 bg-white">
      <p className="text-[#101828] text-[16px] font-semibold">Quick Export Templates</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {templates.map((t, i) => (
          <TemplateButton key={i} label={t.label} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default QuickExport;