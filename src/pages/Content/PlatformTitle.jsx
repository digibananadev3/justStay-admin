import { LuPlus } from "react-icons/lu"

const PlatformTitle = ({
  title,
  buttonText
}) => {
  return(
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#101828]">{title}</h2>
        <button className="inline-flex items-center gap-2 bg-[#009689] text-white text-[14px] font-medium px-4 py-2 rounded-lg">
          <LuPlus />
          {buttonText}
        </button>
      </div>
    </>
  )
}

export default PlatformTitle