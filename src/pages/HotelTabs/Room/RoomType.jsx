import { FaPlus } from 'react-icons/fa';
import { TbBed, TbChartBar } from "react-icons/tb";
import CardComponent from "../../../components/Cards/CardComponent";
import Container from '../../../components/BasicComponent/Container';
import RoomTypeCard from "./RoomTypeCard";
import { useProperty } from "../../HotelManagementDrawer";

const RoomType = () => {
  const { property, propertyRooms } = useProperty() || {};
  
  // Calculate total rooms from propertyRooms
  const totalRooms = propertyRooms?.reduce((sum, room) => sum + (room.numberOfRooms || 0), 0) || property?.roomCount || 0;
  return(
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[14px] leading-5 tracking-[0px]">Room Type & Configuration</p>
          <button 
            className="bg-[#0F766E]
            text-white
            px-4 py-2
            rounded-md
            flex items-center gap-2
            text-[14px]
            leading-5
            tracking-[0px]
            font-medium
            ">
            <FaPlus />
            Add Room Type
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 my-4">
            <CardComponent
            title="Total Rooms"
            totalNumber={totalRooms}
            isIcon={true}
            symbolIcon={<TbBed className="text-[#155DFC]" />}
            borderColor="border-[#BEDBFF]"
            bgColor="bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)]"
            fontTitleColor="text-[#155DFC]"
            />
            <CardComponent
            title="Occupancy Rate"
            totalNumber={"N/A"}
            isIcon={true}
            symbolIcon={<TbChartBar className="text-[#008236]" />}
            borderColor="border-[#B9F8CF]"
            bgColor="bg-[linear-gradient(135deg,#F0FDF4_0%,#DCFCE7_100%)]"
            fontTitleColor="text-[#008236]"
            />
          </div>

          <div>
            <div>
              {propertyRooms && propertyRooms.length > 0 ? (
                propertyRooms.map((room, idx) => {
                  const roomData = {
                    name: room.type || "Standard Room",
                    rooms: room.numberOfRooms || 0,
                    available: room.numberOfRooms || 0, // Not available in API
                    size: `${room.area || 0} sq ft`,
                    beds: `${room.bed || 0} Bed${room.bed !== 1 ? 's' : ''}`,
                    occupancy: `${room.bed || 0} Adults`, // Approximate
                    dailyRate: `₹${room.price?.oneNight || 0}`,
                    hourlyBooking: { 
                      available: room.price?.threeHours ? true : false, 
                      price: room.price?.threeHours || 0, 
                      duration: "3hrs" 
                    },
                  };
                  return (
                    <div key={room._id || idx} className="mb-4">
                      <RoomTypeCard {...roomData} onEdit={() => {}} />
                    </div>
                  );
                })
              ) : (
                <div className="p-5 text-gray-500 text-center">
                  No rooms available for this property
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default RoomType