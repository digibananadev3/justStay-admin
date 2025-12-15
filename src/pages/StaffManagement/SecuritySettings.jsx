const SecuritySettings = ({ staff }) => {
  const twoFA = staff?.twoFA ?? true;
  const sessions = staff?.sessions ?? 2;
  const lastLogin = staff?.lastLogin ?? "2025-10-10 9:30 AM";

  return (
    <div className="mt-6">
      <h3 className="text-[16px] font-semibold text-[#0F172A] mb-3">Security Settings</h3>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-[#0F172A]">Two-Factor Authentication</p>
            <p className="text-[12px] text-[#6A7282]">Add extra security layer</p>
          </div>
          <span
            className={`inline-flex items-center rounded-xl px-2.5 py-1 text-[12px] border ${
              twoFA
                ? "bg-[#DCFCE7] text-[#016630] border-[#DCFCE7] font-medium"
                : "bg-gray-100 text-gray-700 border-gray-200 font-medium"
            }`}
          >
            {twoFA ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className="p-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-[#0F172A]">Active Sessions</p>
            <p className="text-[12px] text-[#6A7282]">Currently logged in devices</p>
          </div>
          <span className="inline-flex items-center rounded-xl px-2.5 py-1 text-[12px] bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
            {sessions} {sessions === 1 ? "session" : "sessions"}
          </span>
        </div>

        <div className="p-4">
          <p className="text-[13px] font-medium text-[#0F172A]">Last Login</p>
          <p className="text-[13px] text-[#4A5565] mt-1">{lastLogin}</p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;