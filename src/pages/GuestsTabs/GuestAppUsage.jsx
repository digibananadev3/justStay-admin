import ReviewCard from "./Review/ReviewCard";
import { AiOutlineMobile } from 'react-icons/ai';
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineWatchLater } from 'react-icons/md';
import UsagesProgress from "./AppUsage/UsagesProgress";
import UsagesTimeLine from "./AppUsage/UsagesTimeLine";
import DeviseInfo from "./AppUsage/DeviseInfo";
const GuestAppUsage = () => {
  const cardList = [
    {
      title: "Total Sessions",
      totalNumber: 1235,
      borderColor: "border-[#BEDBFF]",
      bgColor:"bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)]",
      fontColor: "text-[#1447E6]",
      symbol: AiOutlineMobile,
    },

    {
      title: "Avg Session Time",
      totalNumber: 1235,
      borderColor: "border-[#B9F8CF]",
      bgColor:"bg-[linear-gradient(135deg,#F0FDF4_0%,#DCFCE7_100%)]",
      fontColor: "text-[#008236]",
      symbol: MdOutlineWatchLater,
    },

    {
      title: "Last Active",
      totalNumber: 1235,
      borderColor: "border-[#E9D4FF]",
      bgColor:"bg-[linear-gradient(135deg,#FAF5FF_0%,#F3E8FF_100%)]",
      fontColor: "text-[#8200DB]",
      symbol: FaClockRotateLeft,
    },

    {
      title: "App Version",
      totalNumber: 1235,
      borderColor: "border-[#FFD6A7]",
      bgColor:"bg-[linear-gradient(135deg,#FFF7ED_0%,#FFEDD4_100%)]",
      fontColor: "text-[#CA3500]",
      symbol: AiOutlineMobile,
    },
  ]

  return(
    <>
      <div className="grid grid-cols-4 gap-4">
        {
          cardList.map((item) => {
            const Icon = item.symbol
            return <ReviewCard
              title={item.title}
              totalNumber={item.totalNumber}
              borderColor={item.borderColor}
              bgColor={item.bgColor}
              fontColor={item.fontColor}
              symbol={ <Icon className={ item.fontColor } /> }
            />
          })
        }
      </div>
      <div className="mt-4">
        <UsagesProgress />
      </div>
      <div className="mt-4">
        <UsagesTimeLine />
      </div>
      <div className="mt-4">
        <DeviseInfo />
      </div>
    </>
  )
}

export default GuestAppUsage;
