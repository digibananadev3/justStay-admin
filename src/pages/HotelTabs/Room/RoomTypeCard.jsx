import { TbBed, TbEdit } from "react-icons/tb";
import { LuClock } from "react-icons/lu";

const StatBox = ({ label, value }) => (
  <div className="bg-gray-50 rounded-md px-4 py-3 flex-1 min-w-[160px]">
    <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">{label}</p>
    <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{value}</p>
  </div>
);

const RoomTypeCard = ({
  name,
  rooms,
  available,
  size,
  beds,
  occupancy,
  dailyRate,
  hourlyBooking,
  onEdit,
}) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED]">
            <TbBed />
          </div>
          <div>
            <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{name}</p>
            <p className="text-[#667085] text-[12px] leading-4 tracking-[0px]">{rooms} rooms • {available} available</p>
          </div>
        </div>
        <button onClick={onEdit} className="text-[#667085] hover:text-[#101828]">
          <TbEdit />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4 max-md:grid-cols-2">
        <StatBox label="Size" value={size} />
        <StatBox label="Beds" value={beds} />
        <StatBox label="Occupancy" value={occupancy} />
        <StatBox label="Daily Rate" value={dailyRate} />
      </div>

      {hourlyBooking?.available && (
        <div className="mt-4 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1447E6]">
            <LuClock />
            <p className="text-[13px] leading-5">Hourly Booking Available</p>
          </div>
          <p className="text-[#1447E6] text-[13px] font-medium">₹{hourlyBooking.price} / {hourlyBooking.duration}</p>
        </div>
      )}
    </div>
  );
};

export default RoomTypeCard;