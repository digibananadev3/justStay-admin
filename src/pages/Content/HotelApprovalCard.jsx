import { LuMapPin, LuStar, LuCircleCheckBig } from "react-icons/lu";
import { GiCancel } from 'react-icons/gi';
import { MdOutlineVisibility } from 'react-icons/md';

const StatusPill = ({ label, tone = "yellow" }) => {
  const map = {
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-[#005F5A]",
    green: "bg-[#DCFCE7] text-[#016630]",
    gray: "bg-gray-100 text-gray-700",
  };
  const cls = map[tone] || map.gray;
  return <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${cls}`}>{label}</span>;
};

const Tag = ({ children, tone = "teal" }) => {
  const colors = {
    teal: "bg-[#CBFBF1] text-teal-700",
    green: "bg-green-100 text-green-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${colors[tone] || colors.gray}`}>
      {children}
    </span>
  );
};

const QualityColor = (verification) => {
  if (verification === "verified") return "text-[#00A63E]";
  if (verification === "partial") return "text-[#D08700]";
};


const HotelApprovalCard = ({
  name,
  status,
  statusTone,
  city,
  rating,
  qualityScore,
  verification,
  tags = [],
  submittedBy,
  date,
  photos = [],
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-[18px] font-semibold text-[#101828] truncate">{name}</h3>
            <StatusPill label={status} tone={statusTone} />
          </div>

          <div className="flex items-center gap-2 text-[14px] text-[#4A5565] mb-2">
            <LuMapPin className="text-[#6B7280]" />
            <span>{city}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#4A5565] mb-3">
            <span className="inline-flex items-center gap-1"><LuStar className="text-yellow-500" /> {rating} rating</span>
            <span className={`font-medium ${QualityColor(verification)}`}>Quality Score: {qualityScore}%</span>
            <span className="inline-flex items-center gap-1">Verification: {verification}</span>
          </div>

          <div className="flex items-center gap-2 mb-4 ">
            {tags.map((t, i) => (
              <Tag key={i} tone={t.tone}>
                <span className="mr-2">{t.symbol}</span>{t.label}</Tag>
            ))}
          </div>

          <div className="text-[12px] text-[#4A5565] space-y-[0.5]">
            {submittedBy && <p>Submitted by: {submittedBy}</p>}
            {date && <p>Date: {date}</p>}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button className="px-4 h-9 rounded-lg bg-[#00A63E] text-white text-[14px]      font-medium cursor-pointer">
              <div className="flex items-center gap-2">
                <span><LuCircleCheckBig /></span>
                Approve
              </div>
            </button>
            <button className="px-4 h-9 rounded-lg bg-[#D4183D] text-white text-[14px] font-medium cursor-pointer">
              <div className="flex items-center gap-2">
                <span><GiCancel /></span>
                Reject
                </div>
              </button>
            <button className="px-4 h-9 rounded-lg bg-[#FFFFFF] border border-[#0000001A] text-[#111827] text-[14px] font-medium cursor-pointer">
              <div className="flex items-center gap-2">
                <span><MdOutlineVisibility /></span>
                Review Details
              </div>
            </button>
          </div>
        </div>

        {photos?.length > 0 && (
          <div className="shrink-0 flex items-center gap-3">
            {photos.slice(0, 2).map((src, i) => (
              <img key={i} src={src} alt="hotel" className="w-[80px] h-[64px] object-cover rounded-xl border" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelApprovalCard
