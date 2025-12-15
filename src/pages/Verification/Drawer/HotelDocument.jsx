import { LuEye, LuDownload, LuFileText } from "react-icons/lu";
import { StatusBadge } from "../VerificationTableColumns";

const Row = ({ title, submittedAt, status = "Verified", onView, onDownload }) => (
  <div className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
        <LuFileText className="text-[#99A1AF]"/>
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[#101828]">{title}</p>
        <p className="text-[12px] text-[#6A7282] mt-0.5">Submitted: {submittedAt}</p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={onView}
        className="inline-flex items-center gap-2 text-sm text-[#0A0A0A] font-medium hover:underline"
      >
        <LuEye />
        View
      </button>
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center gap-2 text-sm text-[#0A0A0A] font-medium hover:underline"
      >
        <LuDownload />
        Download
      </button>

      <StatusBadge status={status} />
    </div>
  </div>
);

const HotelDocument = ({
  items = [
    { title: "GST", submittedAt: "2025-01-05 2:30 PM", status: "Verified" },
    { title: "Business License", submittedAt: "2025-01-05 2:35 PM", status: "Pending" },
    { title: "Property Proof", submittedAt: "2025-01-05 2:40 PM", status: "Pending" },
  ],
  onView = () => {},
  onDownload = () => {},
}) => {
  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Document Verification</h3>
        <div className="space-y-3">
          {items.map((d, i) => (
            <Row
              key={i}
              title={d.title}
              submittedAt={d.submittedAt}
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

export default HotelDocument;