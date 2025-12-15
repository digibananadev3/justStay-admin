const BookingCardComponent = ({
  title,
  subTitle,
  totalNumber,
  symbolIcon,
  isIcon=false,
  borderColor = "border-gray-200",
  bgColor = "bg-white",
  fontTitleColor = "text-[#4A5565]",
}) => {
  return(
    <>
      <div className={`w-full rounded-2xl shadow-sm overflow-hidden border ${borderColor} ${bgColor}`}>
        <div className="py-3 flex flex-col items-center justify-center text-center">
          {isIcon && symbolIcon}
          <p className={`font-poppins font-nomal text-[12px] leading-4 ${fontTitleColor}`}>{title}</p>
          <p className="font-poppins font-semibold text-[20px] leading-7 text-[#101828]">{totalNumber}</p>
          {subTitle && <p className={`font-poppins font-nomal text-[12px] leading-4 ${fontTitleColor}`}>{subTitle}</p>}
        </div>
      </div>
    </>
  )
}

export default BookingCardComponent
