import { StatusBadge } from "../VerificationTableColumns";

const Field = ({ label, value }) => (
  <div>
    <p className="text-[14px] text-[#6A7282]">{label}</p>
    <p className="text-[#101828] font-medium">{value || "-"}</p>
  </div>
);

const GuestInformation = ({
  guest = {
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    id: "G001",
  },
  status = "Pending",
}) => {
  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">Guest Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <Field label="Name" value={guest.name} />
          <Field label="Email" value={guest.email} />
          <Field label="Phone" value={guest.phone} />
          <Field label="Guest ID" value={guest.id} />
        </div>

        <div className="mt-8">
          <h4 className="text-[16px] font-semibold text-[#101828]">KYC Status</h4>
          <div className="mt-3">
            <p className="text-[12px] text-[#6A7282]">Current Status</p>
            <div>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestInformation;