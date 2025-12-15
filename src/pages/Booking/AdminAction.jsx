import {
  LuPencilLine,
  LuBan,
  LuSend,
  LuDownload,
  LuMessageSquare,
} from "react-icons/lu";
import { FiCheckCircle } from 'react-icons/fi';

const Section = ({ title, children }) => (
  <div className="px-6">
    <h3 className="text-[16px] font-semibold text-[#101828] mb-3">{title}</h3>
    {children}
  </div>
);

const ActionBtn = ({ icon, label, danger, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full inline-flex items-center gap-2 justify-center sm:justify-start rounded-2xl border px-4 py-3 text-[14px] font-medium
      ${danger ? "text-rose-600 border-rose-200 bg-white hover:bg-rose-50" : "text-[#0A0A0A] border-gray-200 bg-white hover:bg-gray-50"}`}
  >
    <span className={`${danger ? "text-rose-600" : "text-[#0A0A0A]"}`}>{icon}</span>
    {label}
  </button>
);

const Row = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
);

const AdminAction = ({
  onModify = () => {},
  onCancel = () => {},
  onManualCheckIn = () => {},
  onResend = () => {},
  onDownloadVoucher = () => {},
  onContactGuest = () => {},
}) => {
  return (
    <Section title="Admin Actions">
      <div className="space-y-3">
        <Row>
          <ActionBtn
            icon={<LuPencilLine />}
            label="Modify Booking"
            onClick={onModify}
          />
          <ActionBtn
            icon={<LuBan />}
            label="Cancel Booking"
            danger
            onClick={onCancel}
          />
        </Row>
        <Row>
          <ActionBtn
            icon={<FiCheckCircle />}
            label="Manual Check-in"
            onClick={onManualCheckIn}
          />
          <ActionBtn
            icon={<LuSend />}
            label="Resend Confirmation"
            onClick={onResend}
          />
        </Row>
        <Row>
          <ActionBtn
            icon={<LuDownload />}
            label="Download Voucher"
            onClick={onDownloadVoucher}
          />
          <ActionBtn
            icon={<LuMessageSquare />}
            label="Contact Guest"
            onClick={onContactGuest}
          />
        </Row>
      </div>
    </Section>
  );
};

export default AdminAction;