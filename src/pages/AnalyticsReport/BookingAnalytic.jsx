import { FiClock, FiCalendar, FiTrendingUp } from "react-icons/fi";
import CancellationAnalytics from "./CancellationAnalytics";
import Revenue from "./Revenue";

const ProgressBar = ({ label, value, total, color, subtext }) => {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <p className="text-[#364153] text-[14px] font-medium">{label}</p>
        <p className="text-[#0B1220] text-[14px] font-medium">{value.toLocaleString()}</p>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <p className="mt-1 text-[12px] text-[#6A7282]">{subtext}</p>
    </div>
  );
};

const TrendItem = ({ icon, title, desc, tone }) => {
  const tones = {
    teal: " text-[#009689]",
    indigo: " text-[#193CB8]",
    purple: " text-[#6E11B0]",
  };

  const chip = tones[tone] || tones.teal;

  const bg = {
    teal: "bg-[#F0FDFA]",
    indigo: "bg-[#EFF6FF]",
    purple: "bg-[#FAF5FF]",
  }[tone] || "bg-[#E6FFFA]";

  return (
    <div className={`rounded-2xl ${bg} p-4`}>
      <div className="flex items-start gap-3">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${chip}`}>
          {icon}
        </span>
        <div className={`${chip}`}>
          <p className="text-[14px] font-semibold">{title}</p>
          <p className="text-[14px] mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const BookingAnalytic = () => {
  const hourly = 2345;
  const daily = 4321;
  const total = hourly + daily;
  return (
    <>    
      <div className="border rounded-2xl border-[#E5E7EB] p-5 bg-white">
        <p className="text-[#101828] text-[18px] font-semibold">Hourly vs Daily Booking Analysis</p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-[#1F2A37] text-[14px] font-semibold mb-4">Booking Distribution</p>
            <ProgressBar
              label="Hourly Bookings"
              value={hourly}
              total={total}
              color="#10B981"
              subtext={`${Math.round((hourly / total) * 100)}% of total bookings`}
            />
            <ProgressBar
              label="Daily Bookings"
              value={daily}
              total={total}
              color="#3B82F6"
              subtext={`${Math.round((daily / total) * 100)}% of total bookings`}
            />
          </div>

          <div>
            <p className="text-[#1F2A37] text-[14px] font-semibold mb-4">Peak Times & Trends</p>
            <div className="space-y-3">
              <TrendItem
                tone="teal"
                icon={<FiClock />}
                title="Peak Hourly Times"
                desc="2 PM - 6 PM sees highest hourly bookings (45% of hourly total)"
              />
              <TrendItem
                tone="indigo"
                icon={<FiCalendar />}
                title="Daily Booking Trends"
                desc="Weekends show 40% higher daily bookings than weekdays"
              />
              <TrendItem
                tone="purple"
                icon={<FiTrendingUp />}
                title="Growth Rate"
                desc="Hourly bookings growing 25% faster than daily bookings"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CancellationAnalytics />
      </div>
      
      <div className="mt-6">
        <Revenue />
      </div>
    </>
  );
}

export default BookingAnalytic;