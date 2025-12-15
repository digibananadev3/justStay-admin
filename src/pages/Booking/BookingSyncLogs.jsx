
import { LuCircleX, LuDownload } from 'react-icons/lu';
import { FiAlertTriangle } from 'react-icons/fi';
import { FiCheckCircle } from 'react-icons/fi';

const variants = {
  success: { bg: "bg-emerald-50", border: "border-emerald-200", icon: <FiCheckCircle className="text-emerald-600" /> },
  warning: { bg: "bg-yellow-50", border: "border-yellow-200", icon: <FiAlertTriangle className="text-yellow-600" /> },
  error:   { bg: "bg-rose-50",   border: "border-rose-200",   icon: <LuCircleX className="text-rose-600" /> },
};

const LogRow = ({ status = "success", title, subtitle, timestamp }) => {
  const v = variants[status] || variants.success;
  return (
    <div className={`rounded-xl border ${v.border} ${v.bg} px-4 py-3`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{v.icon}</div>
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-[#0A0A0A]">{title}</p>
          {subtitle ? <p className="text-[12px] text-[#4A5565]">{subtitle}</p> : null}
          {timestamp ? <p className="text-[12px] text-[#6A7282] mt-0.5">{timestamp}</p> : null}
        </div>
      </div>
    </div>
  );
};

const BookingSyncLogs = ({
  title = "Recent Sync Logs",
  logs = [
    {
      status: "success",
      title: "Successful Sync - Booking.com",
      subtitle: "15 bookings synced, 23 inventory updates",
      timestamp: "2025-10-10 10:35 AM",
    },
    {
      status: "success",
      title: "Successful Sync - Expedia",
      subtitle: "8 bookings synced, 17 rate updates",
      timestamp: "2025-10-10 10:28 AM",
    },
    {
      status: "error",
      title: "Failed Sync - Agoda",
      subtitle: "Connection timeout - retrying in 5 minutes",
      timestamp: "2025-10-10 8:15 AM",
    },
    {
      status: "warning",
      title: "Partial Sync - Booking.com",
      subtitle: "3 inventory conflicts detected and resolved",
      timestamp: "2025-10-09 11:45 PM",
    },
  ],
  onExport = () => {},
}) => {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 p-4 space-y-3 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[16px] font-semibold text-[#101828]">{title}</h3>
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-[#0A0A0A] font-medium hover:bg-gray-50"
          >
            <LuDownload />
            Export Logs
          </button>
        </div>
        {logs.map((log, i) => (
          <LogRow
            key={i}
            status={log.status}
            title={log.title}
            subtitle={log.subtitle}
            timestamp={log.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingSyncLogs;