const SearchPreferences = ({
  title,
  subTitle,
  icon,
  bgColor,
  borderColor,
  fontColor
}) => {
  return(
  <>
    <div className={` border ${borderColor} rounded-xl ${bgColor} p-3`}>
      <div className="flex items-center">
        {icon}
        <p className={`text-[12px] ${fontColor} leading-4 tracking-[0px]`}>{title}</p>
      </div>
      <p className={`font-medium text-[14px] leading-5 tracking-[0px] text-[#101828]`}>{subTitle}</p>
    </div>
  </>
)}

export default SearchPreferences;