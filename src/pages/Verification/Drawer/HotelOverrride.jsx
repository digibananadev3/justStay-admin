import { useState } from "react";
import { LuCheck, LuCircleX, LuShieldCheck, LuRibbon, LuMessageSquare } from "react-icons/lu";
const HotelOverrride = ({
  defaultNote = "",
  onApprove = () => {},
  onReject = () => {},
  onAssignGoSafe = () => {},
  onManageBadges = () => {},
  onRequestInfo = () => {},
}) => {
  const [note, setNote] = useState(defaultNote);

  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Review & Approval</h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add feedback or rejection reason..."
          className="w-full h-28 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200 text-sm placeholder:text-gray-400"
        />

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => onApprove(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
          >
            <LuCheck />
            Approve Hotel & Listing
          </button>

          <button
            type="button"
            onClick={() => onReject(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600 text-white text-sm font-medium hover:bg-rose-700"
          >
            <LuCircleX />
            Reject Application
          </button>

          <button
            type="button"
            onClick={() => onAssignGoSafe(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-[#0A0A0A] font-medium hover:bg-gray-50"
          >
            <LuShieldCheck />
            Assign goSafe Badge
          </button>

          <button
            type="button"
            onClick={() => onManageBadges(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-[#0A0A0A] font-medium hover:bg-gray-50"
          >
            <LuRibbon />
            Manage Badges
          </button>

          <button
            type="button"
            onClick={() => onRequestInfo(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-[#0A0A0A] font-medium hover:bg-gray-50"
          >
            <LuMessageSquare />
            Request More Info
          </button>
        </div>
      </div>
    </>
  );
};

export default HotelOverrride;