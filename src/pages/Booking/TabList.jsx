import TableComponent from "../../components/BasicComponent/TableComponent";
import { bookingColumns, bookingData } from "./BookingColumnsRow";
import BookingOtaSync from "./BookingOtaSync";

export const TabList = ({ onRowClick } = {}) => ([
  [
    {
      label: "All Bookings",
      content: <TableComponent columns={bookingColumns} data={bookingData} onRowClick={onRowClick} />
    },
    {
      label: "Hourly Bookings",
      content: "Hello"
    },
    {
      label: "Refunds",
      content: "Hello"
    },
    {
      label: "Disputes",
      content: "Hello"
    },
    {
      label: "OTA Sync",
      content: <BookingOtaSync />
    }
  ]
]);