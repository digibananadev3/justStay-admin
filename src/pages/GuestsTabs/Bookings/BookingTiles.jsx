import CardComponent from "../../../components/Cards/CardComponent";
import { BookingTilesArr } from "../../../utils/Constant/GuestBooking";

const BookingTiles = ({tiles}) => {
  return(
    <>
      <div className="flex justify-between gap-4">
        {
          BookingTilesArr.map((booking) => {
            const Icon = booking.symbol
            return <CardComponent
              key={booking.title}
              title={booking.title}
              totalNumber={tiles?.[booking.access] || 0}
              isIcon={true}
              symbolIcon={<Icon className={booking.fontTitleColor}/>}
              borderColor={booking.borderColor}
              bgColor={booking.bgColor}
              fontTitleColor={booking.fontTitleColor}
            />
          })
        }
      </div>
    </>
  )
}

export default BookingTiles;