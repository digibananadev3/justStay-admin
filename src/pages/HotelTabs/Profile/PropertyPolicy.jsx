const Pill = ({ yes }) => (
  <span className={`${yes ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"} inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium`}>
    {yes ? "Yes" : "No"}
  </span>
);

const PropertyPolicy = ({ policy }) => {
  const data = {
    checkIn: "14:00",
    checkOut: "11:00",
    cancellation: "Free cancellation up to 24 hours before check-in",
    coupleFriendly: true,
    petFriendly: false,
    ...policy,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-x-10">
        <div>
          <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Check-in Time</p>
          <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.checkIn}</p>
        </div>
        <div>
          <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Check-out Time</p>
          <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.checkOut}</p>
        </div>
      </div>

      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Cancellation Policy</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.cancellation}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-10">
        <div>
          <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-2">Couple Friendly</p>
          <Pill yes={data.coupleFriendly} />
        </div>
        <div>
          <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-2">Pet Friendly</p>
          <Pill yes={data.petFriendly} />
        </div>
      </div>
    </div>
  );
};
  
export default PropertyPolicy;