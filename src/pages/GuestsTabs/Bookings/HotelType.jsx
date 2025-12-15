import { LuSparkles, LuBuilding2 } from 'react-icons/lu';
import { BiTimeFive } from 'react-icons/bi';
import ProgressBar from '../../../components/BasicComponent/ProgressBarComponent';

const HotelType = ({hotelTypeList}) => {
  const progressData = [
    { label: "Luxury", Icon: LuSparkles, percentage: 35, color: "#d946ef"},
    { label: "Budget", Icon: LuBuilding2, percentage: 40, color: "#2563eb" },
    { label: "Hourly Booking", Icon: BiTimeFive, percentage: 25, color: "#14b8a6" },
  ];

  return(
    <>
      <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px] text-[#101828] mb-8">Preferred Hotel Types</p>
      <div className="w-full mx-auto">
        {hotelTypeList.map((item, index) => (
          <ProgressBar
            key={index}
            label={item.type}
            Icon={progressData[index]['Icon']}
            percentage={item.percent}
            color={progressData[index]['color']}
          />
        ))}
      </div>
    </>
  )
}

export default HotelType;