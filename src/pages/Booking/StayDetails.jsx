import { LuMapPin } from "react-icons/lu";

const Field = ({ label, primary, secondary }) => (
  <div>
    <p className="text-[12px] text-[#6A7282]">{label}</p>
    <p className="text-[#0A0A0A] font-semibold text-[16px] leading-6">{primary}</p>
    {secondary ? <p className="text-[12px] text-[#6A7282] mt-0.5">{secondary}</p> : null}
  </div>
);

const StayDetails = ({
  hotel = {
    name: "Luxury Palace Hotel",
    roomType: "Executive Suite",
    address: "MI Road, Jaipur",
  },
  checkIn = { date: "2025-10-10", time: "12:00 PM" },
  checkOut = { date: "2025-10-10", time: "6:00 PM" },
  duration = "6 hours",
  guests = "2 Guests",
}) => {
  return (
    <div className="px-6">
      <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Hotel & Stay Details</h3>

      <div className="rounded-2xl border border-gray-200 p-4">
        <div>
          <p className="text-[16px] font-semibold text-[#101828] leading-6">{hotel.name}</p>
          <p className="text-[14px] text-[#6A7282] leading-5">{hotel.roomType}</p>
          <div className="flex items-center gap-2 text-[14px] text-[#6A7282] mt-2">
            <LuMapPin className="text-[#6A7282]" />
            <span>{hotel.address}</span>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Check-in" primary={checkIn.date} secondary={checkIn.time} />
          <Field label="Check-out" primary={checkOut.date} secondary={checkOut.time} />
          <Field label="Duration" primary={duration} />
          <Field label="Guests" primary={guests} />
        </div>
      </div>
    </div>
  );
};

export default StayDetails;