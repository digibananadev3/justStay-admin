import { FiAlertTriangle } from "react-icons/fi";

const variants = {
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    icon: "text-red-500",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    icon: "text-yellow-500",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "text-blue-500",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "text-green-500",
  },
};

const VerificationAlert = ({
  title = "Flags & Alerts",
  message = "Name mismatch on Aadhaar",
  variant = "danger",
  bgClass,
  borderClass,
  textClass,
  icon = <FiAlertTriangle />,
}) => {
  const v = variants[variant] || variants.danger;
  const bg = bgClass || v.bg;
  const border = borderClass || v.border;
  const text = textClass || v.text;

  return (
    <>
      <div className="px-6">
        <h3 className="text-[16px] font-semibold text-[#101828] mb-3">{title}</h3>
        <div className={`rounded-lg border ${border} ${bg} px-4 py-3`}>
          <div className={`flex items-center gap-2 ${text}`}>
            <span className={`${v.icon}`}>{icon}</span>
            <span className="text-[14px] leading-5 font-medium">{message}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationAlert;