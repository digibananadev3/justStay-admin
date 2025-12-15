import { FiAlertTriangle } from "react-icons/fi";
import PageHeading from "../components/PageHeading/PageHeading"
import VerificationCard from "./Verification/VerificationCard"
import { AiOutlineCalendar } from 'react-icons/ai';
import { LuCircleCheckBig, LuClock } from 'react-icons/lu';
import TabComponent from "../components/BasicComponent/TabComponent";
import { TabList } from "./Booking/TabList";
import BookingFilter from "./Booking/BookingFilter";
import BookingListDrawer from "./Booking/BookingListDrawer";
import { useState } from "react";
const BookingManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mb-8">
        <PageHeading
          title={"Booking Management"}
          subTitle={"Centralized view of all bookings from JustStay and OTA platforms"}
        />
      </div>
    
      <div className="grid grid-cols-4 gap-5 mb-8">
        <VerificationCard
          title="Today's Check-ins"
          count="0"
          symbole={<AiOutlineCalendar size={24} className=" text-[#155DFC] w-[48px] h-[48px] bg-[#DBEAFE] p-3 rounded-xl"/>}
        />
        <VerificationCard 
          title="Today's Check-outs"
          count="23"
          symbole={<LuClock size={24} className=" text-[#9810FA] w-[48px] h-[48px] bg-[#F3E8FF] p-3 rounded-xl"/>}
        />
        <VerificationCard
          title="Pending Actions"
          count="23"
          symbole={<FiAlertTriangle size={24} className=" text-[#F54900] w-[48px] h-[48px] bg-[#FFEDD4] p-3 rounded-xl"/>}
        />
        <VerificationCard
          title="Active Bookings"
          count="23"
          symbole={<LuCircleCheckBig size={24} className=" text-[#00A63E] w-[48px] h-[48px] bg-[#DCFCE7] p-3 rounded-xl"/>} />
      </div>

      <div className="w-full">
        <TabComponent
          tabSection={ TabList({ onRowClick: () => setIsOpen(true) }) }
          style={"w-7/12"}
        >
          <div className="my-4 w-10/12">
            <BookingFilter />
          </div>
        </TabComponent>
      </div>
      <BookingListDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )
}

export default BookingManagement