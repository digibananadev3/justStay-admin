import { FiBarChart2 } from "react-icons/fi"
import SummaryCard from "./SummaryCard"

const SummaryCardList = () => {
    return (
        <>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <SummaryCard
              title="Revenue Trends"
              iconRight={<FiBarChart2 />}
              value="₹1,234,567"
              rows={[
                { label: "This Year", value: "₹1,234,567" },
              
              ]}
            />
            <SummaryCard
              title="Total Revenue"
              iconRight={<FiBarChart2 />}
              value="₹1,234,567"
              rows={[
                { label: "This Year", value: "₹1,234,567" },
                { label: "Last Year", value: "₹1,234,567" },
              ]}
            />
          </div>
        </>
    )
}

export default SummaryCardList