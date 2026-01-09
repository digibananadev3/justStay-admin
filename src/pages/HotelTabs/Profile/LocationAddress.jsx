import { LuMapPin } from 'react-icons/lu';
const LocationAddress = ({ location }) => {
  // const data = {
  //   addressLine1: "123 MG Road, Colaba",
  //   city: "Mumbai",
  //   state: "Maharashtra",
  //   pincode: "400001",
  //   lat: 18.922,
  //   lng: 72.8347,
  //   landmarks: [
  //   "Gateway of India - 500m",
  //   "Colaba Market - 200m",
  //   ],
  //   ...location,
  // };


    const {
    house,
    area,
    city,
    state,
    pincode,
    country,
    lat,
    lng,
    landmarks = [],
  } = location;

  const addressLine1 = [house, area].filter(Boolean).join(", ");
  const addressLine2 = [city, state, pincode].filter(Boolean).join(" - ");

  return (
    <div className="space-y-5">
      <div>
        {/* {console.log("This is the value of the location in the Location Address component", location)} */}
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Complete Address</p>
        {/* <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px] mb-1">{data.addressLine1}</p> */}
        {addressLine1 && (
          <p className="text-[#101828] font-semibold text-[14px] mb-1">
            {addressLine1}
          </p>
        )}
        {/* <p className="text-[#667085] text-[14px] leading-5 tracking-[0px]">{data.city}, {data.state} - {data.pincode}</p> */}
        {addressLine2 && (
          <p className="text-[#667085] text-[14px]">
            {addressLine2}
            {country ? `, ${country}` : ""}
          </p>
        )}

          {!addressLine1 && !addressLine2 && (
          <p className="text-gray-400 text-sm">Address not available</p>
        )}
      </div>
      {/* <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-1">Coordinates</p>
        <p className="text-[#101828] font-semibold text-[14px] leading-5 tracking-[0px]">Lat: {data.lat}, Long: {data.lng}</p>
      </div> */}

       {/* Coordinates */}
      {(lat || lng) && (
        <div>
          <p className="text-[#4A5565] text-[12px] mb-1">
            Coordinates
          </p>
          <p className="text-[#101828] font-semibold text-[14px]">
            {lat && `Lat: ${lat}`}
            {lat && lng && ", "}
            {lng && `Long: ${lng}`}
          </p>
        </div>
      )}


      {/* <div>
        <p className="text-[#4A5565] text-[12px] leading-4 tracking-[0px] mb-2">Nearby Landmarks</p>
        <div className="flex flex-wrap gap-2">
          {data.landmarks.map((lm, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[12px] font-medium">
          <LuMapPin className="text-blue-600" />
          {lm}
          </span>
          ))}
        </div>
      </div> */}

       {/* Landmarks */}
      {landmarks.length > 0 && (
        <div>
          <p className="text-[#4A5565] text-[12px] mb-2">
            Nearby Landmarks
          </p>

          <div className="flex flex-wrap gap-2">
            {landmarks.map((lm, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1
                           rounded-full bg-blue-50 text-blue-700
                           text-[12px] font-medium"
              >
                <LuMapPin className="text-blue-600" />
                {lm}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationAddress