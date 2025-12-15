import { FiChevronDown } from "react-icons/fi";
import TabComponent from "../components/BasicComponent/TabComponent";
import { TabList } from "./AnalyticsReport/TabList";


const AnalyticsReport = () => {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-[#101828] text-[30px] leading-[32px] tracking-[0px]">Analytics & Reporting</p>
          <p className="text-[#4A5565] text-[14px] leading-[20px] tracking-[0px] mt-1">Monitor app usage, conversion rates, and user behavior</p>
        </div>
        <div>
          <div className="relative">
            <select className="appearance-none border rounded-lg px-3 py-2 pr-8 text-[14px] text-[#111827] bg-white shadow-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
              <option>This quarter</option>
              <option>Custom range</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6A7282] pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="my-9">
        <TabComponent tabSection={TabList}/>
      </div>
    </>
  );
}

export default AnalyticsReport;