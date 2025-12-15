const CardComponent = ({
  title,
  totalNumber,
  symbolIcon,
  minRequired,
  isIcon=false,
  borderColor = "border-gray-200",
  bgColor = "bg-white",
  fontTitleColor = "text-[#4A5565]",
}) => {
  return(
    <>
      <div className={`w-full rounded-2xl shadow-sm overflow-hidden border ${borderColor} ${bgColor}`}>
        <div className="p-4">
            <div className="flex justify-between">
              <p className={`font-poppins font-nomal text-[12px] leading-4 ${fontTitleColor}`}>
                {title}
              </p>
              <p>{isIcon && symbolIcon}</p>
            </div>

            <p className="font-poppins font-semibold text-[20px] leading-7 text-[#101828] mt-6">
              {totalNumber}
            </p>
            {minRequired && <p className="text-[#7C3AED] text-[12px] leading-4 mt-2">
              Minimum: { minRequired } required
            </p>}
        </div>
      </div>
    </>
  )
}

export default CardComponent