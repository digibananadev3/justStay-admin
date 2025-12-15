import { LuMail, LuPhone, LuBuilding2, LuCalendarDays } from "react-icons/lu";

const StaffMamerInfo = ({ staff }) => {
  const name = staff?.name || "-";
  const email = staff?.email || "-";
  const phone = staff?.phone || "+91 98765 43210";
  const department = staff?.department || "Operations";
  const role = staff?.role || "Super Admin";
  const status = staff?.status || "active";
  const staffId = staff?.id || "S001";
  const joined = staff?.joined || "2024-01-15";

  const Initial = name?.[0]?.toUpperCase() || "?";

  return (
    <div className="p-4">
      <h3 className="text-[14px] font-semibold text-[#0F172A] mb-3">Staff Information</h3>

      <div className="rounded-lg border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#CBFBF1] text-[#00786F] border border-[#CBFBF1] text-[14px] font-semibold">
            {Initial}
          </span>
          <div>
            <p className="font-medium text-[14px] text-[#0F172A]">{name}</p>
            <p className="text-[12px] text-[#6A7282]">Staff ID: {staffId}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-[#0F172A]">
            <LuMail size={16} className="text-[#6A7282]" />
            <span className="text-[13px]">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-[#0F172A]">
            <LuPhone size={16} className="text-[#6A7282]" />
            <span className="text-[13px]">{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-[#0F172A]">
            <LuBuilding2 size={16} className="text-[#6A7282]" />
            <span className="text:[13px]">{department}</span>
          </div>
          <div className="flex items-center gap-2 text-[#0F172A]">
            <LuCalendarDays size={16} className="text-[#6A7282]" />
            <span className="text-[13px]">Joined {joined}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl text-[12px] bg-[#F3E8FF] text-[#7C3AED] border border-[#F3E8FF]">{role}</span>
          <span className={`px-2.5 py-1 rounded-xl text-[12px] border ${status === "active" ? "bg-[#DCFCE7] text-[#016630] border-[#DCFCE7]" : "bg-[#FFE2E2] text-[#9F0712] border-[#FFE2E2]"}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StaffMamerInfo;
