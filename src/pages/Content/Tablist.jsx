import ContentLibrary from "./ContentLibrary";
import HotelListingApprovals from "./HotelListingApprovals";
import Notification from "./Notification";
import OfferBanner from "./OfferBanner";

export const TabList = [[
  {
    label : "Platform Content",
    content: <ContentLibrary />,
  },
  {
    label: "Hotel Approvals",
    content: <HotelListingApprovals />,
  },
  {
    label: "Offers & Banners",
    content: <OfferBanner />,
  },
  {
    label: "Notifications",
    content: <Notification />,
  },
]]