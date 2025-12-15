import { FaEdit } from "react-icons/fa";

const statusStyles = {
  Scheduled: { dot: "bg-yellow-400", pill: "bg-blue-100 text-[#005F5A]" },
  Sent: { dot: "bg-green-500", pill: "bg-green-100 text-green-700" },
};

const StatusPill = ({ label = "Scheduled" }) => {
  const style = statusStyles[label] || statusStyles.Scheduled;
  return (
    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${style.pill}`}>
      {label}
    </span>
  );
};

const NotificationCard = ({
  title,
  status = "Scheduled",
  description,
  target,
  leftLabel,   // "Scheduled" or "Sent"
  leftValue,   // date string
  rightLabel,  // "Recipients" or "Open Rate"
  rightValue,  // number or percentage
  rightLabel2,
  rightValue2,
}) => {
  const style = statusStyles[status] || statusStyles.Scheduled;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
            <h3 className="text-[16px] font-semibold text-[#101828] truncate leading-6">{title}</h3>
          </div>
          <StatusPill label={status} />
        </div>

        {description && (
          <p className="text-[14px] text-[#4A5565] mt-2">{description}</p>
        )}

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-[14px] text-[#4A5565]">
          <p><span className="text-[#6A7282]">Target:</span> {target}</p>
          {rightLabel && (
            <p><span className="text-[#6A7282]">{rightLabel}:</span> {rightValue}</p>
          )}
          {leftLabel && (
            <p><span className="text-[#6A7282]">{leftLabel}:</span> {leftValue}</p>
          )}
          {rightLabel2 && (
            <p><span className="text-[#6A7282]">{rightLabel2}:</span> {rightValue2}</p>
          )}
        </div>

        <div className="mt-6 flex items-center gap-4 text-[#6A7282]">
          <button className="hover:text-gray-900 cursor-pointer" aria-label="edit">
            <FaEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;