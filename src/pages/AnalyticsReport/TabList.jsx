import BookingAnalytic from "./BookingAnalytic";
import Overview from "./Overview";
import UserBehavior from "./UserBehavior";
import FinancialReports from "./FinancialReports";
import Referrals from "./Referrals";
import Verification from "./Verification";

export const TabList = [[
  {
    label: "Overview",
    content: <Overview />
  },
  {
    label: "Booking Analytics",
    content: <BookingAnalytic />
  },
  {
    label: "User Behavior",
    content: <UserBehavior />
  },
  {
    label: "Financial Reports",
    content: <FinancialReports />
  },
  {
    label: "Referrals",
    content: <Referrals />
  },
  {
    label: "Verification",
    content: <Verification />
  }
]]