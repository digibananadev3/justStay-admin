import PaymentGatewayConfiguration from "./PaymentGatewayConfiguration";
import EmailSmsTemplate from "./EmailSmsTemplate";
import VarificationRules from "./VarificationRules";
import Localization from "./Localization";

export const TabList = [[
  {
    label: "Payment Gateway",
    content: <PaymentGatewayConfiguration />
  },
  {
    label: "Email/SMS Templates",
    content: <EmailSmsTemplate />
  },
  {
    label: "Varification Rules",
    content: <VarificationRules />
  },
  {
    label: "Localization",
    content: <Localization />
  }
]]
    