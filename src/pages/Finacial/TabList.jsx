import CommissionRates from "./CommissionRates";
import Refunds from "./Refunds";
import Transactions from "./Transactions";
import Withdrawals from "./Withdrawals";

export const TabList = [[
  {
    label: "Transactions",
    content: <Transactions />,
  },
  {
    label: "Withdrawals",
    content: <Withdrawals />,
  },
  {
    label : "Commissions Rates",
    content: <CommissionRates />,
  },
  {
    label : "Refunds",
    content: <Refunds />,
  }
]]