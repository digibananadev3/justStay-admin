import FAQManagement from "./FAQManagement";
import LiveChat from "./LiveChat";
import SupportTickets from "./SupportTickets";
import VerificationSupport from "./VerificationSupport";

export const TabList = [[
  {
    label: "Support Tickets",
    content: <SupportTickets />
  },
  {
    label: "Live Chat",
    content: <LiveChat />
  },
  {
    label: "FAQ Management",
    content: <FAQManagement />
  },
  {
    label: "Verification Support",
    content: <VerificationSupport />
  },
]]