import { LuPlus } from "react-icons/lu";

const cards = [
  { title: "Standard OTA Rate", value: "20%", note: "Applicable for most OTA bookings" },
  { title: "Premium OTA Rate", value: "25%", note: "For premium listings & promotions" },
  { title: "Direct Booking Discount", value: "5%", note: "Reduced rate for direct bookings" },
];

const OTBCommission = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-[#101828] text-[18px] leading-[24px]">B. OTA Commission</p>
          <p className="text-[#4A5565] text-[13px] leading-[18px]">Online Travel Agency commission structure</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#009689] text-white text-[14px] font-medium px-4 py-2 rounded-lg">
          <LuPlus />
          Configure OTA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="border rounded-2xl border-[#E5E7EB] p-4">
            <div className="flex items-start justify-between">
              <p className="text-[#101828] text-[14px] font-medium">{card.title}</p>
              <span className="text-[#6A7282] text-[12px]">%</span>
            </div>
            <p className="text-[#101828] text-[28px] leading-[32px] font-semibold mt-2">{card.value}</p>
            <p className="text-[#6A7282] text-[12px] leading-[18px] mt-1">{card.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OTBCommission