const Stat = ({ label, value }) => (
  <div>
    <p className="text-[14px] text-[#6A7282] leading-5 tracking-[0px]">{label}</p>
    <p className="text-[#101828] font-semibold text-[18px] leading-6 tracking-[0px]">{value}</p>
  </div>
);

const ListingDetail = ({
  stats = { rooms: 12, images: 15, amenities: 8 },
}) => {
  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Listing Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Stat label="Total Rooms" value={stats.rooms} />
          <Stat label="Images" value={stats.images} />
          <Stat label="Amenities" value={stats.amenities} />
        </div>
      </div>
    </>
  );
};

export default ListingDetail;