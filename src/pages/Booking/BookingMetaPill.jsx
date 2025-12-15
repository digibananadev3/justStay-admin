import { LuLink2 } from "react-icons/lu";

const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const StatusPill = ({ status = "checked-in" }) => {
  const map = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-purple-100 text-purple-700",
    "checked-in": "bg-emerald-100 text-emerald-700",
    completed: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-rose-100 text-rose-700",
  };
  const cls = map[status] || "bg-gray-100 text-gray-700";
  return <Pill className={cls}>{status}</Pill>;
};

const SourcePill = ({ source = "Booking.com" }) => (
  <Pill className="bg-indigo-100 text-indigo-700">
    <LuLink2 className="text-indigo-600" />
    {source}
  </Pill>
);

const TypePill = ({ type = "Hourly", hours = 6 }) => (
  <Pill className="bg-purple-100 text-purple-700">
    {type}: {hours}-hour
  </Pill>
);

const BookingMetaPills = ({ status, source, type = "Hourly", hours }) => (
  <div className="flex flex-wrap items-center gap-2">
    <StatusPill status={status} />
    <SourcePill source={source} />
    {hours ? <TypePill type={type} hours={hours} /> : null}
  </div>
);

export default BookingMetaPills;