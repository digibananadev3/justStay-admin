import BookingPattern from "./Bookings/BookingPattern";
import BookingTiles from "./Bookings/BookingTiles";
import BookingTimeline from "./Bookings/BookingTimeline";
import HotelType from "./Bookings/HotelType";
import RecentBookings from "./Bookings/RecentBookings";
import { useQuery } from "@tanstack/react-query";
import { fetchGuestBookings } from "../../services/guestUser";
import Loader from "../../components/BasicComponent/Loader";
import { useSelector } from "react-redux";

const GuestsBookings = () => {
  const {guestId} = useSelector((state) => state.guest)
  const {data, isLoading, error} = useQuery({
    queryKey: ["guestBookings"],
    queryFn: () => fetchGuestBookings(guestId)
  })

  if(isLoading) return <Loader />
  return(
    <>
      <div className="w-full">
        <BookingTiles
          tiles = {data?.data}
        />
      </div>
      <div className="border border-gray-200 rounded-2xl mt-4 p-4">
        <BookingTimeline
          timelineList = {data?.data?.timeline}
        />
      </div>
      <div className="border border-gray-200 rounded-2xl mt-4 p-4">
        <HotelType
          hotelTypeList = {data?.data?.preferredTypes}
        />
      </div>
      <div className="border border-gray-200 rounded-2xl mt-4 p-4">
        <BookingPattern 
          frequencyList = {data?.data?.frequency}
        />
      </div>
      <div className="border border-gray-200 rounded-2xl mt-4 p-4">
        <RecentBookings />
      </div>
    </>
  )
}

export default GuestsBookings;