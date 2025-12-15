import SearchCard from "../../components/Cards/SearchCard"
import SearchPreferences from "./Search/SearchPreferences"
import { IoLocationOutline } from 'react-icons/io5';

const GuestSearch = () => {
  return(
    <>
      <div className="border border-gray-200 rounded-2xl p-4">
        <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px] text-[#101828] mb-9">Recent Searches</p>
        <SearchCard
          title={"Hotels in Mumbai"}
          subTitle={"Luxury, 5-star"}
          time={"2 hours ago"}
        />
      </div>
      <div className="border border-gray-200 rounded-2xl p-4">
        <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px] text-[#101828] mb-9">Search Preferences</p>
        <div className="grid grid-cols-2 gap-4">
          <SearchPreferences
            title={"Preferred Locations"}
            subTitle={"Mumbai, Delhi, Goa"}
            icon={<IoLocationOutline className="text-[#1447E6] mr-2" />}
            fontColor={"text-[#1447E6]"}
            borderColor="border-[#DBEAFE]"
            bgColor="bg-[#EFF6FF]"
          />
          <SearchPreferences
            title={"Preferred Locations"}
            subTitle={"Mumbai, Delhi, Goa"}
            icon={<IoLocationOutline className="text-[#1447E6]" />}
            fontColor={"text-[#1447E6]"}
            borderColor="border-[#DBEAFE]"
            bgColor="bg-[#EFF6FF]"
          />
        </div>
      </div>
    </>
  )
}

export default GuestSearch