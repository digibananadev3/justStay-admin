import { LuWifi, LuWaves, LuSnowflake, LuUtensils, LuDumbbell, LuBellRing, LuShieldCheck } from 'react-icons/lu';
import { TbParkingCircle } from 'react-icons/tb';

const AmenityChip = ({ icon: Icon, label }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[12px] font-medium border border-teal-200">
    <Icon className="text-teal-600" />
    {label}
  </span>
);

const AmenitiesManagement = ({ amenities, certification }) => {
  const defaultAmenities = [
    { label: 'WiFi', icon: LuWifi },
    { label: 'Pool', icon: LuWaves },
    { label: 'AC', icon: LuSnowflake },
    { label: 'Parking', icon: TbParkingCircle },
    { label: 'Restaurant', icon: LuUtensils },
    { label: 'Gym', icon: LuDumbbell },
    { label: 'Room Service', icon: LuBellRing },
  ];

const list = amenities?.length
  ? amenities.map(a => ({ label: a, icon: LuShieldCheck }))
  : defaultAmenities;
  const certify = {
    title: 'goSafe Certified',
    description: 'Sanitization protocols, staff training, and safety measures verified',
    ...certification,
  };

  return (
    <div className="space-y-5">
      {console.log("This is the value of the amenities in the Amenities Management component", amenities)}
      <div className="flex flex-wrap gap-2">
        {list.map((am, idx) => (
          <AmenityChip key={idx} icon={am.icon || LuShieldCheck} label={am.label} />
        ))}
      </div>

      <div className="rounded-2xl border border-teal-300 bg-teal-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-teal-600">
            <LuShieldCheck />
          </div>
          <div>
            <p className="text-[#0F766E] font-semibold text-[14px] leading-5 tracking-[0px]">
              {certify.title}
            </p>
            <p className="text-teal-700 text-[13px] leading-5 tracking-[0px]">
              {certify.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesManagement;