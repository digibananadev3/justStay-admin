const ActivityComponent = ({
  title,
  subTitle,
  icon,
  bgIcon,
  rightSideElement

}) => {
  return(
    <div className="bg-[#F9FAFB] rounded-xl flex justify-between items-center p-3 mb-2">
      <div className="flex items-center">
        {icon && <div className={`${bgIcon} p-2 rounded-lg`}>
          {icon}
        </div>}
        <div className="pl-4">
          <p className="font-medium text-[14px] leading-4 tracking-[0px] text-[#101828]">{title}</p>
          <p className="text-[12px] leading-4 tracking-[0px]">{subTitle}</p>
        </div>
      </div>
      <div>
        {rightSideElement}
      </div>
    </div>
  )
}

export default ActivityComponent