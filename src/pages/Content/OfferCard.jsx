import { LuTrash2 } from "react-icons/lu";
import { FaEdit } from 'react-icons/fa';

const StatusPill = ({ label = "Active" }) => (
  <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-green-100 text-green-700">
    {label}
  </span>
);

const OfferCard = ({
  title,
  status = "Active",
  description,
  discount,
  validFrom,
  validTo,
  target,
  used,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-[16px] font-semibold text-[#101828]">{title}</h3>
          <StatusPill label={status} />
        </div>

        {description && (
          <p className="text-[14px] text-[#4A5565]">{description}</p>
        )}

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-6 text-[14px] text-[#4A5565]">
          <p>
            <span className="text-[#4A5565]">Discount:</span> {discount}
          </p>
          <p>
            <span className="text-[#4A5565]">Valid:</span> {validFrom} - {validTo}
          </p>
          <p>
            <span className="text-[#4A5565]">Target:</span> {target}
          </p>
          <p>
            <span className="text-[#4A5565]">Used:</span> {used}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4 text-[#4A5565]">
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

export default OfferCard;