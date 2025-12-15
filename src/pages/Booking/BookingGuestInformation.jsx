import { LuMail, LuPhone } from "react-icons/lu";

const Avatar = ({ name }) => (
  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
    {name?.[0] || "?"}
  </div>
);

const BookingGuestInformation = ({
  name = "Amit Kumar",
  guestId = "G003",
  email = "amit.kumar@email.com",
  phone = "+91 76543 21098",
}) => {
  return (
    <div className="px-6">
      <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Guest Information</h3>

      <div className="rounded-2xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Avatar name={name} />
          <div>
            <p className="text-[14px] font-semibold text-[#101828]">{name}</p>
            <p className="text-[12px] text-[#6A7282]">Guest ID: {guestId}</p>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <div className="inline-flex items-center gap-2 text-[14px] text-[#0A0A0A]">
            <LuMail className="text-[#6A7282]" />
            {email}
          </div>
          <div className="inline-flex items-center gap-2 text-[14px] text-[#0A0A0A]">
            <LuPhone className="text-[#6A7282]" />
            {phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingGuestInformation;