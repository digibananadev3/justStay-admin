import { useState } from "react";
import { LuEye, LuEyeOff, LuPencilLine, LuBadge } from "react-icons/lu";

const PaymentGatewayConfiguration = () => {
  const [showKey, setShowKey] = useState(false);

  const gateway = {
    name: "Razorpay",
    status: "Active",
    apiKey: "rzp_test_1234567890",
    transactionFee: 2.5,
    currencies: ["INR", "USD"],
  };

  const maskedKey = (key) => {
    if (!key) return "-";
    const visible = 8;
    if (key.length <= visible) return key;
    return `${key.slice(0, visible)}**********`;
  };

  return (
    <div className="space-y-4">
      <h2 className="font-poppins text-[22px] leading-7 font-semibold text-[#0F172A]">
        Payment Gateway Configuration
      </h2>

      <div className="border border-gray-200 rounded-2xl p-5 bg-white max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 grid place-items-center border border-blue-100">
              {/* Generic payment badge icon */}
              <LuBadge size={16} />
            </span>
            <p className="font-poppins font-semibold text-[16px] text-[#0F172A]">{gateway.name}</p>
          </div>
          <span className="px-2.5 py-1 text-[12px] rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
            {gateway.status}
          </span>
        </div>

        {/* API Key */}
        <div className="flex items-center justify-between py-2">
          <span className="text-[14px] text-[#6A7282]">API Key:</span>
          <div className="flex items-center gap-2">
            <span className="font-poppins text-[14px] text-[#0F172A]">
              {showKey ? gateway.apiKey : maskedKey(gateway.apiKey)}
            </span>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowKey((s) => !s)}
              aria-label={showKey ? "Hide API Key" : "Show API Key"}
            >
              {showKey ? <LuEyeOff size={18} /> : <LuEye size={18} />}
            </button>
          </div>
        </div>

        {/* Transaction Fee */}
        <div className="flex items-center justify-between py-2">
          <span className="text-[14px] text-[#6A7282]">Transaction Fee:</span>
          <span className="font-poppins font-medium text-[14px] text-[#0F172A]">
            {gateway.transactionFee}%
          </span>
        </div>

        {/* Supported Currencies */}
        <div className="py-2">
          <p className="text-[14px] text-[#6A7282] mb-2">Supported Currencies:</p>
          <div className="flex items-center gap-2">
            {gateway.currencies.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 text-[12px] font-medium rounded-xl border bg-[#ECEEF2] text-[#030213] border-gray-200"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
          >
            <LuPencilLine size={16} />
            <span className="font-medium">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayConfiguration;
