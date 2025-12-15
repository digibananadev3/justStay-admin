import { useState } from "react";
import { LuCheck, LuBan, LuRefreshCw, LuSend } from "react-icons/lu";

const VerificationOverride = ({
  defaultNote = "",
  onVerify = () => {},
  onReject = () => {},
  onBypass = () => {},
  onResend = () => {},
}) => {
  const [note, setNote] = useState(defaultNote);

  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Verification Override</h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add verification notes or rejection reason..."
          className="w-full h-28 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200 text-sm placeholder:text-gray-400"
        />

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => onVerify(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
          >
            <LuCheck />
            Manually Verify
          </button>

          <button
            type="button"
            onClick={() => onReject(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600 text-white text-sm font-medium hover:bg-rose-700"
          >
            <LuBan />
            Reject KYC
          </button>

          <button
            type="button"
            onClick={() => onBypass(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-[#0A0A0A] font-medium hover:bg-gray-50"
          >
            <LuRefreshCw />
            Bypass Automated Check
          </button>

          <button
            type="button"
            onClick={() => onResend(note)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-[#0A0A0A] font-medium hover:bg-gray-50"
          >
            <LuSend />
            Resend Verification Request
          </button>
        </div>
      </div>
    </>
  );
};

export default VerificationOverride;