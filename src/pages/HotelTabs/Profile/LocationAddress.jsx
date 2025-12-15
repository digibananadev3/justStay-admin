import { LuMapPin } from 'react-icons/lu';
const LocationAddress = ({ location }) => {
  const data = {
    addressLine1: "123 MG Road, Colaba",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    lat: 18.922,
    lng: 72.8347,
    landmarks: [
    "Gateway of India - 500m",
    "Colaba Market - 200m",
    ],
    ...location,
  };
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Complete Address</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px] mb-1">{data.addressLine1}</p>
        <p className="text-[#667085] text-[14px] leading-5 tracking-[0px]">{data.city}, {data.state} - {data.pincode}</p>
      </div>
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Coordinates</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">Lat: {data.lat}, Long: {data.lng}</p>
      </div>
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-2">Nearby Landmarks</p>
        <div className="flex flex-wrap gap-2">
          {data.landmarks.map((lm, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[12px] font-medium">
          <LuMapPin className="text-blue-600" />
          {lm}
          </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationAddress