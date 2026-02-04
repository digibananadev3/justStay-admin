import React from "react";
import PageHeading from "../components/PageHeading/PageHeading";
import FoodStatsCard from "./Food/FoodStatsCard";
import { FiAlertTriangle, FiUserCheck } from "react-icons/fi";
import { LuBuilding, LuCircleCheckBig } from "react-icons/lu";
import TabComponent from "../components/BasicComponent/TabComponent";
import { TabList } from "./Booking/TabList";
import { FoodTabList } from "./Food/FoodTabList";

const FoodManagement = () => {
  return (
    <>
      <div>
        <PageHeading
          title="Food & Restaurant Management"
          subTitle="Manage your food services and restaurant operations efficiently."
        />
      </div>
      <div className="grid grid-cols-4 gap-5 my-8">
        <FoodStatsCard
          title="Total Restaurants"
          count="20"
          symbole={
            <FiUserCheck
              size={24}
              className=" text-[#D08700] w-[48px] h-[48px] bg-[#FEF9C2] p-3 rounded-xl"
            />
          }
        />
        <FoodStatsCard
          title="Food Items Available"
          count="60"
          symbole={
            <LuBuilding
              size={24}
              className=" text-[#155DFC] w-[48px] h-[48px] bg-[#DBEAFE] p-3 rounded-xl"
            />
          }
        />
        <FoodStatsCard
          title="Property assigned Food"
          count="10"
          symbole={
            <LuCircleCheckBig
              size={24}
              className=" text-[#00A63E] w-[48px] h-[48px] bg-[#DCFCE7] p-3 rounded-xl"
            />
          }
        />
        <FoodStatsCard
          title="Room assigned Food"
          count="30"
          symbole={
            <FiAlertTriangle
              size={24}
              className=" text-[#F54900] w-[48px] h-[48px] bg-[#FFEDD4] p-3 rounded-xl"
            />
          }
        />
      </div>


      <div className="w-full">
        <TabComponent
          tabSection={FoodTabList({ onRowClick: () => setIsOpen(true) })}
          style={"w-7/12"}
        >
          {/* <div className="my-4 w-10/12">
            <BookingFilter />
          </div> */}
        </TabComponent>
      </div>


    </>
  );
};

export default FoodManagement;
