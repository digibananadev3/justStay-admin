import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
const Favorite = ({
  hotelName,
  location,
  date,
}) => {
  return(
    <>
      <div className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-xl flex justify-between items-center p-3 mb-3">
        <div className="flex items-center">
          <div className="bg-[#FFE2E2] p-3 rounded-md">
            <FaHeart className="text-[16px] text-[#E7000B]"/>
          </div>
          <div className="pl-4">
            <p className="font-medium text-[14px] leading-4 tracking-[0px] text-[#101828] mb-1">{hotelName}</p>
            <div className="flex items-center">
              <IoLocationOutline className="text-[#6A7282] mr-1" />
              <p className="text-[12px] leading-4 tracking-[0px] mr-2">{location}</p>
              <FaStar className="text-[#F0B100] mr-2" />
              <p className="">4.8</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-normal text-[12px] leading-4 tracking-[0px] text-[#6A7282]">{date}</p>
        </div>
      </div>
    </>
  )
}

export default Favorite;
