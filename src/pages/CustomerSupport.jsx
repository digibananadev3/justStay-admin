import { LuPlus } from "react-icons/lu";
import TabComponent from "../components/BasicComponent/TabComponent";
import { TabList } from "./CustomerSupport/TabList";

const CustomerSupport = () => {
  return (
    <>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 font-poppins text-[22px] leading-7 font-semibold text-[#0F172A]">Customer Support</h2>
            <p className="text-[13px] text-[#6A7282]">Manage user queries and support tickets</p>
          </div>
          <div className="mr-18">
            <button type="button" className="inline-flex items-center gap-2 h-10 px-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition">
              <LuPlus size={16} />
              <span className="text-[13px] font-medium">Create Ticket</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <TabComponent tabSection={TabList} />
      </div>
    </>
  );
};

export default CustomerSupport;