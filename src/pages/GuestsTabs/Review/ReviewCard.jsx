const ReviewCard = ({
  title,
  totalNumber,
  borderColor,
  bgColor,
  fontColor,
  symbol,
}) => {
  return(
    <div className={`border ${borderColor} ${bgColor} rounded-2xl p-4`}>
      <div className="flex justify-between items-center mb-8">
        <p className={`text-[14px] leading-4 tracking-[0px] ${fontColor}`}>{title}</p>
        {symbol && symbol}
      </div>
      <p className="font-semibold text-[24px] leading-8 tracking-[0px]">{totalNumber}</p>
    </div>
  )
}

export default ReviewCard