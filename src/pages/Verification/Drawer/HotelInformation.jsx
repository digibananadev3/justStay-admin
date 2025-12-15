import { AiFillStar } from "react-icons/ai";

const Field = ({ label, value, children }) => (
  <div>
    <p className="text-[14px] text-[#6A7282] leading-5 tracking-[0px]">{label}</p>
    {children ? (
      children
    ) : (
      <p className="text-[#101828] font-medium leading-5 tracking-[0px]">{value || "-"}</p>
    )}
  </div>
);

const Stars = ({ value = 0 }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <AiFillStar key={i} className={i < Math.round(value) ? "text-yellow-400" : "text-gray-300"} />
      ))}
    </div>
    <span className="text-[#0A0A0A] font-semibold text-sm">{value}★</span>
  </div>
);

const HotelInformation = ({
  hotel = {
    name: "Hotel Comfort Inn",
    owner: "Comfort Inn Properties",
    email: "info@comfortinn.com",
    phone: "+91 76543 21098",
    location: "Goa, Goa",
    rating: 3,
  },
}) => {
  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Hotel Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <Field label="Hotel Name" value={hotel.name} />
          <Field label="Owner" value={hotel.owner} />
          <Field label="Email" value={hotel.email} />
          <Field label="Phone" value={hotel.phone} />
          <Field label="Location" value={hotel.location} />
          <Field label="Star Rating">
            <Stars value={hotel.rating} />
          </Field>
        </div>
      </div>
    </>
  );
};

export default HotelInformation;