import { LuFileText, LuMessageSquare, LuPhone, LuMail } from "react-icons/lu";

const ActionRow = ({ icon: Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-left"
  >
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
      <Icon size={16} />
    </span>
    <span className="font-poppins font-medium text-[14px] text-[#0F172A]">{label}</span>
  </button>
);

const VerificationSupport = () => {
  const actions = [
    { id: "guidelines", label: "View Verification Guidelines", icon: LuFileText },
    { id: "message", label: "Send Support Message", icon: LuMessageSquare },
    { id: "callback", label: "Schedule Callback", icon: LuPhone },
    { id: "email", label: "Email Documentation", icon: LuMail },
  ];

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-2xl p-6 bg-white">
        <h2 className="font-poppins text-[20px] leading-7 font-semibold text-[#0F172A]">Verification Support</h2>
        <p className="font-poppins text-[14px] font-semibold text-[#0F172A] mt-6 mb-3">Support Actions</p>

        <div className="max-w-xl space-y-3">
          {actions.map((a) => (
            <ActionRow key={a.id} icon={a.icon} label={a.label} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationSupport;
