import { LuLink2, LuRefreshCw } from "react-icons/lu";

const StatusPill = ({ status = "connected" }) => {
  const map = {
    connected: "bg-emerald-100 text-emerald-700",
    syncing: "bg-yellow-100 text-yellow-700",
    error: "bg-rose-100 text-rose-700",
  };
  const labelMap = { connected: "Connected", syncing: "Syncing", error: "Error" };
  const cls = map[status] || map.connected;
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>{labelMap[status] || status}</span>;
};

const ChannelRow = ({ name, lastSynced, status = "connected", color = "#3B82F6", onSync }) => (
  <div className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}1A`, color }}>
        <LuLink2 />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[#101828]">{name}</p>
        <p className="text-[12px] text-[#6A7282]">Last synced: {lastSynced}</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <StatusPill status={status} />
      <button
        type="button"
        onClick={onSync}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-[#0A0A0A] font-medium hover:bg-gray-50"
      >
        <LuRefreshCw />
        Sync Now
      </button>
    </div>
  </div>
);

const OtaChannelStatus = ({
  title = "OTA Channel Sync Status",
  channels = [
    { name: "Booking.com", lastSynced: "5 minutes ago", status: "connected", color: "#3B82F6" },
    { name: "Expedia", lastSynced: "12 minutes ago", status: "connected", color: "#10B981" },
    { name: "Agoda", lastSynced: "2 hours ago", status: "syncing", color: "#8B5CF6" },
  ],
  onSyncChannel = (ch) => {},
}) => {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 p-4 space-y-3 bg-white">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">{title}</h3>
        {channels.map((c, i) => (
          <ChannelRow
            key={i}
            name={c.name}
            lastSynced={c.lastSynced}
            status={c.status}
            color={c.color}
            onSync={() => onSyncChannel(c)}
          />
        ))}
      </div>
    </div>
  );
};

export default OtaChannelStatus;