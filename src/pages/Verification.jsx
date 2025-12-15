import { useState } from "react";
import TabComponent from "../components/BasicComponent/TabComponent"
import PageHeading from "../components/PageHeading/PageHeading"
import HotelVerificationDrawer from "./Verification/HotelVerificationDrawer"
import GuestVerificationDrawer from "./Verification/GuestVerificationDrawer"
import { TabList } from "./Verification/TabList"
import VerificationCard from "./Verification/VerificationCard"
import VerificationFilter from "./Verification/VerificationFilter"
import { FiAlertTriangle, FiUserCheck } from 'react-icons/fi';
import { LuBuilding, LuCircleCheckBig } from 'react-icons/lu';
const Verification = () => {
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isHotelOpen, setIsHotelOpen] = useState(false);
  return (
    <>
      <div className="mb-8">
        <PageHeading
          title={"Verification Oversight"}
          subTitle={"Review and approve guest KYC and hotel verification documents"}
        />
      </div>
      <div className="grid grid-cols-4 gap-5 mb-8">
        <VerificationCard
          title="Guest Pending"
          count="23"
          symbole={<FiUserCheck size={24} className=" text-[#D08700] w-[48px] h-[48px] bg-[#FEF9C2] p-3 rounded-xl"/>}
        />
        <VerificationCard 
          title="Hotel Pending"
          count="23"
          symbole={<LuBuilding size={24} className=" text-[#155DFC] w-[48px] h-[48px] bg-[#DBEAFE] p-3 rounded-xl"/>}
        />
        <VerificationCard
          title="Guest Approved"
          count="23"
          symbole={<LuCircleCheckBig size={24} className=" text-[#00A63E] w-[48px] h-[48px] bg-[#DCFCE7] p-3 rounded-xl"/>}
        />
        <VerificationCard
          title="Hotel Approved"
          count="23"
          symbole={<FiAlertTriangle size={24} className=" text-[#F54900] w-[48px] h-[48px] bg-[#FFEDD4] p-3 rounded-xl"/>} />
      </div>
      <div className="w-full">
        <TabComponent tabSection={ TabList({ onGuestRowClick: () => setIsGuestOpen(true), onHotelRowClick: () => setIsHotelOpen(true) }) } style={"w-1/3"}>
          <div className="my-4 w-10/12">
            <VerificationFilter />
          </div>
        </TabComponent>
      </div>

      <GuestVerificationDrawer isOpen={isGuestOpen} setIsOpen={setIsGuestOpen} />
      <HotelVerificationDrawer isOpen={isHotelOpen} setIsOpen={setIsHotelOpen} />

    </>
  )
}

export default Verification