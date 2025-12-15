const DeviseInfoCart = ({
  title,
  info
}) => {
  return(
    <>
      <div className="bg-[#F9FAFB] rounded-lg p-4">
        <p className="text-[12px] leading-4 tracking-[0px] text-[#4A5565] md-1">{title}</p>
        <p className="font-medium text-[14px] leading-5 tracking-[0px] text-[#101828]">{info}</p>
      </div>
    </>
  )
}

export default DeviseInfoCart;