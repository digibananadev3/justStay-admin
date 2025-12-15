import { LuTrash2 } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";

const StatusPill = ({ label = "Active" }) => (
  <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-green-100 text-green-700">
    {label}
  </span>
);

const BannerCard = ({
  image,
  title,
  position,
  clicks,
  impressions,
  periodFrom,
  periodTo,
  status = "Active",
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            {image && (
              <img
                src={image}
                alt={title}
                className="w-[64px] h-[48px] object-cover rounded-lg border"
              />
            )}
            <div className="min-w-0">
              <h3 className="text-[16px] font-semibold text-[#101828] truncate leading-6">{title}</h3>
              {position && (
                <p className="text-[14px] text-[#4A5565] mt-1">Position: {position}</p>
              )}
            </div>
          </div>
          <StatusPill label={status} />
        </div>

        <div className="mt-4 text-[12px] text-[#6A7282] ml-19">
          {(clicks !== undefined || impressions !== undefined) && (
            <p>
              <span className="text-[#6A7282]">Clicks:</span> {clicks?.toLocaleString?.() || clicks} | {" "}
              <span className="text-[#6A7282]">Impressions:</span> {impressions?.toLocaleString?.() || impressions}
            </p>
          )}
          {(periodFrom || periodTo) && (
            <p>
              <span className="text-[#6A7282]">Period:</span> {periodFrom || "-"} {periodTo ? ` - ${periodTo}` : ""}
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center gap-4 text-[#6A7282]">
          <button className="hover:text-gray-900 cursor-pointer" aria-label="edit">
            <FaEdit />
          </button>
          <button className="hover:text-red-600 cursor-pointer" aria-label="delete">
            <LuTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
