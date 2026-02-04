// import TableComponent from "../../components/BasicComponent/TableComponent";
// import { columns, data, hotelColumns, hotelData } from "./VerificationTableColumns";

import FoodSection from "./FoodSection";
import PropertyFoodSection from "./PropertyFoodSection";
import RestaurantSection from "./RestaurantSection";
import RoomFoodSection from "./RoomFoodSection";


export const FoodTabList = ({ onGuestRowClick, onHotelRowClick } = {}) => ([[
  {
    label: "Restaurants",
    content: <RestaurantSection />
  },
  {
    label: "Foods",
    content: <FoodSection />
  },
    {
    label: "Property Foods",
    content: <PropertyFoodSection />
  },
  //   {
  //   label: "Room Foods",
  //   content: <RoomFoodSection />  
  // }
]]);