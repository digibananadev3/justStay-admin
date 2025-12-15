import { LuBookmark } from 'react-icons/lu';
import { LuEye } from 'react-icons/lu';

const SearchSaved = ({
  hotelName,
  location
}) => {
  return(
    <>
      <div className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-xl flex justify-between items-center p-3 mb-3">
        <div className="flex items-center">
          <LuBookmark className="text-[16px] text-[#009689]"/>
          <div className="pl-4">
            <p className="font-medium text-[14px] leading-4 tracking-[0px] text-[#101828] mb-1">{hotelName}</p>
            <p className="text-[12px] leading-4 tracking-[0px] mr-2">{location}</p>
          </div>
        </div>
        <div>
          <LuEye />
        </div>
      </div>
    </>
  )
}

export default SearchSaved