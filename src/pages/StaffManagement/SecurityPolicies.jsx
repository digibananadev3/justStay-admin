import { useState } from "react";

const Toggle = ({ checked, onChange, ariaLabel }) => (
  <button
    type="button"
    onClick={onChange}
    aria-pressed={checked}
    aria-label={ariaLabel}
    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
      checked ? "bg-[#0B1023]" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-5" : "translate-x-1"
      }`}
    />
  </button>
);

const PolicyRow = ({ title, description, value, onChange, id }) => (
  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
    <div className="min-w-0 pr-4">
      <p className="text-[14px] font-semibold text-[#0F172A] truncate">{title}</p>
      <p className="text-[12px] text-[#6A7282]">{description}</p>
    </div>
    <Toggle id={id} checked={value} onChange={onChange} />
  </div>
);

const SecurityPolicies = () => {
  const [require2FA, setRequire2FA] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);

  return (
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <h3 className="text-[16px] font-semibold text-[#0F172A] mb-3">Security Policies</h3>
        <PolicyRow
          id="policy-2fa"
          title="Require Two-Factor Authentication"
          description="Force all staff to enable 2FA"
          value={require2FA}
          onChange={(val) => setRequire2FA((prev) => !prev)}
        />

        <PolicyRow
          id="policy-password-expiry"
          title="Password Expiry"
          description="Require password change every 90 days"
          value={passwordExpiry}
          onChange={(val) => setPasswordExpiry((prev) => !prev)}
        />

        <PolicyRow
          id="policy-session-timeout"
          title="Session Timeout"
          description="Auto logout after 30 minutes of inactivity"
          value={sessionTimeout}
          onChange={(val) => setSessionTimeout((prev) => !prev)}
        />

        <PolicyRow
          id="policy-ip-whitelist"
          title="IP Whitelist"
          description="Restrict access to specific IP addresses"
          value={ipWhitelist}
          onChange={(val) => setIpWhitelist((prev) => !prev)}
        />
      </div>
  );
};

export default SecurityPolicies;