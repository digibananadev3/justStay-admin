import BookingSyncLogs from "./BookingSyncLogs"
import OtaBookingPerformance from "./OtaBookingPerformance"
import OtaChannelStatus from "./OtaChannelStatus"

const BookingOtaSync = () => {
  return (
    <>
      <div>
        <OtaChannelStatus />
      </div>
      <div className="mt-4">
        <BookingSyncLogs />
      </div>
      <div className="mt-4">
        <OtaBookingPerformance />
      </div>
    </>
  )
}

export default BookingOtaSync