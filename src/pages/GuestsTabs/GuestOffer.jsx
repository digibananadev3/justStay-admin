import { LuGift } from 'react-icons/lu';
import { LuTag } from 'react-icons/lu';
import { LuPercent } from 'react-icons/lu';
import { LuDollarSign } from 'react-icons/lu';
import ReviewCard from "./Review/ReviewCard"
import Container from '../../components/BasicComponent/Container';
import OfferList from './Offer/OfferList';
import ProgressBar from '../../components/BasicComponent/ProgressBarComponent';

const GuestOffer = () => {
  const progressData = [
      { label: "Percentage Discounts", Icon: LuPercent, percentage: 35, color: "#AD46FF" },
      { label: "Cashback Offers", Icon: LuDollarSign, percentage: 75, color: "#00C950" },
      { label: "Bonus & Rewards", Icon: LuGift, percentage: 65, color: "#FF6900" },
    ];
  return(
    <>
      <div className='grid grid-cols-4 gap-4'>
        <ReviewCard
          title="Offers Received"
          totalNumber={42}
          borderColor="border-[#FCCEE8]"
          bgColor="bg-[linear-gradient(135deg,#FDF2F8_0%,#FCE7F3_100%)]"
          fontColor="text-[#C6005C]"
          symbol={<LuGift className='text-[#C6005C]' />}
        />

        <ReviewCard
          title="Offers Used"
          totalNumber={42}
          borderColor="border-[#B9F8CF]"
          bgColor="bg-[linear-gradient(135deg,#F0FDF4_0%,#DCFCE7_100%)]"
          fontColor="text-[#008236]"
          symbol={<LuTag className='text-[#008236]' />}
        />

        <ReviewCard
          title="Response Rate"
          totalNumber={42}
          borderColor="border-[#E9D4FF]"
          bgColor="bg-[linear-gradient(135deg,#FAF5FF_0%,#F3E8FF_100%)]"
          fontColor="text-[#8200DB]"
          symbol={<LuPercent className='text-[#8200DB]' />}
        />

        <ReviewCard
          title="Savings"
          totalNumber={42}
          borderColor="border-[#FFD6A7]"
          bgColor="bg-[linear-gradient(135deg,#FFF7ED_0%,#FFEDD4_100%)]"
          fontColor="text-[#CA3500]"
          symbol={<LuDollarSign className='text-[#CA3500]' />}
        />
      </div>
      <div className='mt-4'>
        <Container title={"Recent Offer Interactions"}>
          <OfferList />
        </Container>
      </div>
      <div className='mt-4'>
        <Container title={"Preferred Offer Types"}>
          {
            progressData.map((item) => (
              <ProgressBar
                key={item.label}
                label={item.label}
                Icon={item.Icon}
                percentage={item.percentage}
                color={item.color}
              />
            ))
          }
        </Container>
      </div>
    </>
  )
}

export default GuestOffer