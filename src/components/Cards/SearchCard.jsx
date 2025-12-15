import { LuSearch, LuFilter } from "react-icons/lu";

const SearchCard = ({
  title,
  subTitle,
  time
}) => {
  return (
    <div className="flex justify-between rounded-xl border border-[#E5E7EB] w-full p-3 bg-[#F9FAFB]">
      {/* Left Section */}
      <div className="flex items-start gap-3">
        {/* Text */}
        <div>
          <div className="flex items-center pb-1">
            <LuSearch className="text-[#009689] mr-2" />
            <p className="font-medium text-gray-900">{ title }</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <LuFilter className="w-4 h-4 text-[#99A1AF] mr-2" />
            <span>{ subTitle }</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <p className="text-sm text-gray-400 whitespace-nowrap">{ time }</p>
    </div>
  );
};

export default SearchCard;
