import { LuBadgeCheck, LuShieldCheck, LuClock3, LuRibbon } from "react-icons/lu";

const StatusPill = ({ active, color = "#9333EA" }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      active ? "text-white" : "text-gray-700"
    }`}
    style={{ backgroundColor: active ? color : "#E5E7EB" }}
  >
    {active ? "Active" : "Inactive"}
  </span>
);

const Tile = ({ icon, title, active, accent }) => {
  const activeClasses = active
    ? "bg-opacity-10"
    : "bg-white";
  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-4 py-4 border`}
      style={{
        borderColor: active ? accent : "#E5E7EB",
        backgroundColor: active ? `${accent}1A` : undefined, // ~10% opacity
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center"
          style={{ color: accent, backgroundColor: active ? `${accent}1A` : "#F3F4F6" }}
        >
          {icon}
        </div>
        <p className="text-[16px] font-semibold text-[#0A0A0A]">{title}</p>
      </div>
      <StatusPill active={active} color={accent} />
    </div>
  );
};

const BadgeManagement = ({
  items = [
    { title: "Verified Badge", active: false, icon: <LuBadgeCheck />, accent: "#2563EB" },
    { title: "goSafe Badge", active: false, icon: <LuShieldCheck />, accent: "#0D9488" },
    { title: "Hourly Booking", active: true, icon: <LuClock3 />, accent: "#8B5CF6" },
    { title: "Couple Friendly", active: true, icon: <LuRibbon />, accent: "#EC4899" },
  ],
}) => {
  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Badge Management</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((b, i) => (
            <Tile key={i} icon={b.icon} title={b.title} active={b.active} accent={b.accent} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BadgeManagement;