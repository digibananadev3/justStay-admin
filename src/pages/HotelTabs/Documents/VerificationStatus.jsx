import { LuFileText } from "react-icons/lu";
import { FiEye } from "react-icons/fi";

const Badge = ({ status = "verified" }) => {
  const map = {
    verified: {
      text: "Verified",
      className: "bg-green-100 text-green-700",
    },
    pending: {
      text: "Pending",
      className: "bg-yellow-100 text-yellow-700",
    },
    rejected: {
      text: "Rejected",
      className: "bg-red-100 text-red-700",
    },
  };
  const s = map[status] || map.verified;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.className}`}>
      {s.text}
    </span>
  );
};

const VerificationStatus = ({
  items = [
    { title: "GST Certificate", uploaded: "2023-05-15", expires: "2026-05-15", status: "verified" },
    { title: "Business License", uploaded: "2023-05-15", expires: "2025-12-31", status: "verified" },
    { title: "Property Ownership", uploaded: "2023-05-15", status: "verified" },
    { title: "Insurance Certificate", uploaded: "2024-01-10", expires: "2025-01-10", status: "pending" },
  ],
  overall = "verified",
  onView = () => {},
}) => {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between p-4">
          <p className="text-[#101828] text-[14px] leading-7 font-semibold">Verification Status</p>
          <Badge status={overall} />
        </div>

        <div className="px-4 pb-4 space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <div className="text-gray-500 mt-0.5">
                  <LuFileText />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#101828]">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Uploaded: {item.uploaded}
                    {item.expires && (
                      <>
                        {" "}•{" "}Expires: {item.expires}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge status={item.status} />
                <button
                  type="button"
                  onClick={() => onView(item)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={`View ${item.title}`}
                >
                  <FiEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VerificationStatus;      