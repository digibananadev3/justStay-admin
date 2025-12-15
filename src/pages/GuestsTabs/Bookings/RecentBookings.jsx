import { useQuery } from '@tanstack/react-query';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Loader from '../../../components/BasicComponent/Loader';
import { fetchGuestBookingsList } from '../../../services/guestUser';

const RecentBooking = ({
  label,
  value,
  status,
  date,
  roomNumber,
  symbol,
  bgColor,
  bgStatus,
  statusTextColor,
}) => {
  return(
    <>
      <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200 mb-3">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div className={`p-2 ${bgColor} rounded-lg`}>
            {symbol}
          </div>

          {/* Hotel Info */}
          <div>
            <h3 className="font-poppins font-semibold text-[15px] text-gray-900">
              {label}
            </h3>
            <p className="text-sm text-gray-500">
              {`${date} • ${roomNumber}`}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end space-y-1">
          <span className="font-poppins font-semibold text-[15px] text-gray-900">
            ₹{value}
          </span>
          <span className={`text-xs font-medium ${statusTextColor} ${bgStatus} px-3 py-1 rounded-full`}>
            {status}
          </span>
        </div>
      </div>
    </>
  )
}

const RecentBookings = () => {
  const [recentBooking, setRecentBooking] = useState([])
  const {guestId} = useSelector((state) => state.guest)
  const { data, isFetching, error } = useQuery({
    queryKey: ["guest-bookings", guestId],
    queryFn: () => fetchGuestBookingsList(guestId)
  })

  if(isFetching) return <Loader />

  // const recentBooking = [
  //   {
  //     label: "The Grand Oberoi",
  //     value: "12,500",
  //     status: "Upcoming",
  //     date: "2025-01-15",
  //     roomNumber: "Room 502",
  //     symbol: <HiOutlineOfficeBuilding className="text-purple-600 text-xl" />,
  //     bgColor: "bg-[#F3E8FF]",
  //     bgStatus: "bg-[#DBEAFE]",
  //     statusTextColor: "text-[#193CB8]"
  //   },
  //   {
  //     label: "Taj Palace Hotel",
  //     value: "3,500",
  //     status: "Ongoing",
  //     date: "2025-01-10",
  //     roomNumber: "Room 505",
  //     symbol: <HiOutlineOfficeBuilding className="text-[#009689] text-xl" />,
  //     bgColor: "bg-[#CBFBF1]",
  //     bgStatus: "bg-[#FEF9C2]",
  //     statusTextColor: "text-[#894B00]"
  //   }
  // ]
  
  return(
    <>
      <p className="font-medium text-[14px] leading-5, tracking-[0px] text-[#101828] mb-8">Recent Bookings</p>
      <div>
        {
          recentBooking.map((booking) => (
            <RecentBooking
              key={booking.label}
              label={booking.label}
              value={booking.value}
              status={booking.status}
              date={booking.date}
              roomNumber={booking.roomNumber}
              symbol={booking.symbol}
              bgColor = {booking.bgColor}
              statusTextColor={booking.statusTextColor}
              bgStatus={booking.bgStatus}
            />
          ))
        }
      </div>
    </>
  )
}

export default RecentBookings;