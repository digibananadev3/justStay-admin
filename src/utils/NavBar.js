import {
  LuLayoutDashboard,
  LuUsers,
  LuHotel,
  LuDollarSign,
  LuSettings,
} from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineChatBubble } from "react-icons/md";
import { BsCalendar4 } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";

export const NavBarConfig = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    url: "/",
  },
  {
    title: "Guests Management",
    icon: LuUsers,
    url: "/guests-management",
  },
{
  title: "Hotels Management",
  icon: LuHotel,
  children: [
    {
      title: "Dashboard",
      url: "/hotel-management",
    },
    {
      title: "Master Management",
      icon: MdAdminPanelSettings,
      children: [
        {
          title: "Property Type",
          url: "/master-management/property",
        },
        {
          title: "Property List Type",
          url: "/master-management/property-list",
        },
        {
          title: "Amenities",
          url: "/master-management/amenities",
        },
      ],
    },
  ],
},
  // {
  //   title: "Master Management",
  //   icon: MdAdminPanelSettings,
  //   url: "/master-management",
  //   children: [
  //     {
  //       title: "Property",
  //       url: "/master-management/amenities",
  //     },
  //     {
  //       title: "Property List",
  //       url: "/master-management/room-types",
  //     },
  //     {
  //       title: "Ammenities",
  //       url: "/master-management/reviews",
  //     },
  //     {
  //       title: "Review",
  //       url: "/master-management/performance",
  //     },
  //   ],
  // },
  {
    title: "Verification",
    icon: FaUserCheck,
    url: "/verification",
  },
  {
    title: "Booking Management",
    icon: BsCalendar4,
    url: "/booking-management",
  },
  {
    title: "Content Management",
    icon: FiFileText,
    url: "/content-management",
  },
  {
    title: "Financial Oversight",
    icon: LuDollarSign,
    url: "/finacial-management",
  },
  {
    title: "Analytics",
    icon: FaRegChartBar,
    url: "/analytics-report",
  },
  {
    title: "System Config",
    icon: LuSettings,
    url: "/system-configuration",
  },
  {
    title: "Customer Support",
    icon: MdOutlineChatBubble,
    url: "/customer-support",
  },
  {
    title: "Staff Management",
    icon: RiUserSettingsLine,
    url: "/staff-management",
  },
];
