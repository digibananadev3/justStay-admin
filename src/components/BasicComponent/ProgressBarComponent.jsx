const ProgressBar = ({ label, Icon, percentage, color, isText }) => {
  return (
    <div className="w-full mb-3">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center pb-1">
          <Icon className={`text-[${color}] text-lg`} />
          <span className="font-poppins text-[14px] text-[#364153] leading-5 tracking-[0px] pl-1">{label}</span>
        </div>
        <p className="text-[13px] font-medium text-gray-700">{ isText ? <span>{isText}</span> : `${percentage}%`}</p>
      </div>

      <div className="flex-1">
        <div className="w-full bg-gray-200 rounded-full h-2 relative">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar
