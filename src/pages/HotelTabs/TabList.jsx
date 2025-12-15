import HotelProfile from "./Profile/HotelProfile";
import HotelRoom from "./Room/HotelRoom";
import HotelMedia from "./Media/HotelMedia";
import HotelDocument from "./Documents/HotelDocument";
import HotelPerformance from "./Performance/HotelPerformance";
import HotelReview from "./Reviews/HotelReview";

// Make TabList a function so components are created inside the context provider
export const getTabList = () => [[
  {
    label: "Profile",
    content: <HotelProfile />
  },
  { label: "Rooms", content: <HotelRoom /> },
  { label: "Media", content: <HotelMedia /> },
  { label: "Documents", content: <HotelDocument /> },
  { label: "Performance", content: <HotelPerformance /> },
  { label: "Reviews", content: <HotelReview />}
]]

// Keep TabList for backward compatibility if needed elsewhere
export const TabList = getTabList();
