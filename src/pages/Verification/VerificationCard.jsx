const VerificationCard = ({
  title,
  count,
  symbole
}) => {
  return(
    <div className="border border-[#E5E7EB] rounded-2xl p-6 flex justify-between items-center">
      <div>
        <p className="text-[#4A5565] text-[14px] leading-5 tracking-[0px]">{title}</p>
        <p className="font-semibold text-[24px] leading-[32px] tracking-[0px]">{count}</p>
      </div>
      <div>
        {symbole}
      </div>
    </div>
  )
}

export default VerificationCard;