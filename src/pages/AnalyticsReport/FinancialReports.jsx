import CardInfo from "./CardInfo"
import FinancialSummary from "./FinancialSummary"
import GenerateFinancialReport from "./GenerateFinancialReport"
import QuickExport from "./QuickExport"
import RevenueBreakdown from "./RevenueBreakdown"

const FinancialReports = () => {
  return (
    <>
      <GenerateFinancialReport />
      <div className="mt-6">
        <CardInfo />
      </div>
      <div className="mt-4">
        <RevenueBreakdown />  
      </div> 
      <div className="mt-4">
        <FinancialSummary />
      </div>
      <div className="mt-4">
        <QuickExport />
      </div>
    </>
  )
}

export default FinancialReports