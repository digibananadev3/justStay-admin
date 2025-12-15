import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

const Badge = ({ label, tone = "green" }) => {
  const map = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-100 text-gray-700",
  };
  const cls = map[tone] || map.green;
  return (
    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${cls}`}>{label}</span>
  );
};

const ContentCard = ({
  icon = <LuFileText className="text-[#7C8DA6]" />,
  title,
  statusLabel,
  statusTone = "green",
  description,
  meta = {},
  thumbnail,
}) => {
  return (
    <div className="w-full rounded-2xl shadow-sm overflow-hidden border border-gray-200 bg-white">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 flex items-center justify-center">{icon}</div>
            <p className="font-poppins font-semibold text-[16px] leading-6 text-[#101828]">{title}</p>
          </div>
          {statusLabel && <Badge label={statusLabel} tone={statusTone} />}
        </div>

        {thumbnail && (
          <div className="mt-9">
            <img src={thumbnail} alt="thumbnail" className="w-full h-36 object-cover rounded-xl border" />
          </div>
        )}

        {description && (
          <p className="text-[14px] leading-5 text-[#4A5565] mt-9">{description}</p>
        )}

        <div className="mt-4 text-[12px] leading-4 text-[#4A5565] ">
          {meta.category && <p>Category: {meta.category}</p>}
          {meta.modified && <p>Modified: {meta.modified}</p>}
          {meta.by && <p>By: {meta.by}</p>}
        </div>

        <div className="mt-4 flex items-center gap-4 text-gray-600">
          <button className="hover:text-gray-900 cursor-pointer" aria-label="preview"><LuEye /></button>
          <button className="hover:text-gray-900 cursor-pointer" aria-label="edit"><LuPencil /></button>
          <button className="hover:text-red-600 cursor-pointer" aria-label="delete"><LuTrash2 /></button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard