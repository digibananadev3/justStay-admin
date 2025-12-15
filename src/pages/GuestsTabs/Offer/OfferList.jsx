import { LuPercent } from "react-icons/lu";
import ActivityComponent from "../../../components/BasicComponent/ActivityComponent";

const OfferList = () => {
  return(
    <>
      <ActivityComponent
        title="30% Off Luxury Hotels"
        subTitle="3 days ago • Saved ₹3500"
        icon={<LuPercent className='text-[#8200DB]' />}
        bgIcon={"bg-[#F3E8FF]"}
        rightSideElement={<p className="bg-[#DCFCE7] text-[#016630] text-[12px] leading-4 tracking-[0px] font-medium px-2 py-1 rounded-md">Used</p>}
      />
    </>
  )
}

export default OfferList;