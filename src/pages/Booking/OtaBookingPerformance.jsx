const PerfTile = ({ name, count, color = "#DBEAFE", bgColor = "#DBEAFE", borderColor = "#DBEAFE" }) => (
  <div
    className={`rounded-xl px-4 py-4 border ${borderColor}`}
    style={{ backgroundColor: bgColor }}
  >
    <p className="text-[12px] text-[#6A7282]">{name}</p>
    <p className="text-[28px] font-semibold text-[#0A0A0A] leading-8">{count}</p>
    <p className="text-[12px] text-[#6A7282]">bookings this month</p>
  </div>
);

const OtaBookingPerformance = ({
  title = "OTA Booking Performance",
  tiles = [
    { name: "Booking.com", count: 142, color: "#E8F0FF", bgColor: "#EFF6FF", borderColor: "border-[#BEDBFF]"},  // light blue
    { name: "Expedia",     count: 89,  color: "#FFFBE6", bgColor: "#FEFCE8", borderColor: "border-[#FFF085]" },  // light yellow
    { name: "Agoda",       count: 56,  color: "#F5EEFF", bgColor: "#FAF5FF", borderColor: "border-[#E9D4FF]" },  // light purple
  ],
}) => {
  return (
    <div className=" rounded-2xl border border-gray-200 p-4 bg-white">
      <h3 className="text-[16px] font-semibold text-[#101828] mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tiles.map((t, i) => (
          <PerfTile key={i} name={t.name} count={t.count} color={t.color} bgColor={t.bgColor} borderColor={t.borderColor} />
        ))}
      </div>
    </div>
  );
};

export default OtaBookingPerformance;