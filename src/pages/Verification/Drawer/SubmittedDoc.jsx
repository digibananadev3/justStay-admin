import { LuEye, LuDownload } from "react-icons/lu";
import { StatusBadge } from "../VerificationTableColumns";

const Row = ({ title, submittedAt, idText, status = "Verified", onView, onDownload }) => (
  <div className="border border-gray-200 rounded-2xl p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[14px] font-semibold text-[#101828]">{title}</p>
        <div className="mt-1 text-[12px] text-[#6A7282]">
          <p>Submitted: {submittedAt}</p>
          <p className="mt-0.5 text-[#4A5565] leading-5 tracking-[0px]">{idText}</p>
        </div>
      </div>
      <StatusBadge status={status} />
    </div>

    <div className="flex items-center gap-3 mt-4">
      <button
        type="button"
        onClick={onView}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-[#0A0A0A] font-medium hover:bg-gray-100"
      >
        <LuEye />
        View
      </button>
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-[#0A0A0A] font-medium hover:bg-gray-100"
      >
        <LuDownload />
        Download
      </button>
    </div>
  </div>
);

const SubmittedDoc = ({
  items = [
    { title: "PAN", submittedAt: "2025-01-10 10:30 AM", idText: "ABCDE1234F", status: "Verified" },
    { title: "Aadhaar", submittedAt: "2025-01-10 10:35 AM", idText: "XXXX-XXXX-1234", status: "Pending" },
  ],
  onView = () => {},
  onDownload = () => {},
}) => {
  return (
    <>
      <div className="p-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Submitted Documents</h3>
        <div className="space-y-4">
          {items.map((d, i) => (
            <Row
              key={i}
              title={d.title}
              submittedAt={d.submittedAt}
              idText={d.idText}
              status={d.status}
              onView={() => onView(d)}
              onDownload={() => onDownload(d)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SubmittedDoc;