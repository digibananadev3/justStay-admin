import { LuUserCog, LuShieldCheck, LuRotateCcw, LuLogOut, LuUserX, LuList } from "react-icons/lu";

const ActionBtn = ({ children, danger }) => (
  <button
    type="button"
    className={`h-10 rounded-lg border px-3 text-[14px] font-medium inline-flex items-center justify-center gap-2 w-full
      ${danger ? "border-red-200 text-red-600" : "border-gray-200 text-[#0F172A]"}`}
  >
    {children}
  </button>
);

const AdminAction = () => {
  return (
    <div className="mt-6">
      <h3 className="text-[16px] font-semibold text-[#0F172A] mb-3">Admin Actions</h3>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="grid grid-cols-2 gap-3">
          <ActionBtn>
            <LuUserCog size={16} />
            Edit Profile
          </ActionBtn>
          <ActionBtn>
            <LuShieldCheck size={16} />
            Edit Permissions
          </ActionBtn>
          <ActionBtn>
            <LuRotateCcw size={16} />
            Reset Password
          </ActionBtn>
          <ActionBtn>
            <LuLogOut size={16} />
            Force Logout
          </ActionBtn>
          <ActionBtn danger>
            <LuUserX size={16} />
            Deactivate Account
          </ActionBtn>
          <ActionBtn>
            <LuList size={16} />
            View Activity Log
          </ActionBtn>
        </div>
      </div>
    </div>
  );
};

export default AdminAction;