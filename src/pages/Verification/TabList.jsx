import TableComponent from "../../components/BasicComponent/TableComponent";
import { columns, data, hotelColumns, hotelData } from "./VerificationTableColumns";

export const TabList = ({ onGuestRowClick, onHotelRowClick } = {}) => ([[
  {
    label: "Guests Verification",
    content: <TableComponent columns={columns} data={data} onRowClick={onGuestRowClick} />
  },
  {
    label: "Hotels Verification",
    content: <TableComponent columns={hotelColumns} data={hotelData} onRowClick={onHotelRowClick} />
  }
]]);