const PropertyDetails = ({ hotel }) => {
  const data = {
    name: "Hotel Taj Palace",
    category: "Hotel",
    rating: 5,
    propertyType: "Entire Property",
    totalRooms: 45,
    yearBuilt: 2015,
    ...hotel,
  };
  const stars = Array.from({ length: 5 }, (_, i) => i < data.rating);
  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-10">
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px]">Hotel Name</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.name}</p>
      </div>
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px]">Category</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.category}</p>
      </div>
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px]">Star Rating</p>
        <div className="flex gap-1">
          {stars.map((on, idx) => (
          <span key={idx} className={on ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px]">Property Type</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.propertyType}</p>
      </div>
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px]">Total Rooms</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.totalRooms}</p>
      </div>
      <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px]">Year Built</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">{data.yearBuilt}</p>
      </div>
    </div>
  );
  };

export default PropertyDetails;
