import { LuStar } from 'react-icons/lu';
import ReviewCard from './Review/ReviewCard';
import { AiFillStar } from 'react-icons/ai';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import Container from '../../components/BasicComponent/Container';
import ReviewList from './Review/ReviewList';

const GuestReview = () => {
  return(
    <>
      <div className='grid grid-cols-3 gap-4'>
        <ReviewCard
          title="Total Reviews"
          totalNumber={212}
          borderColor="border-[#FFF085]"
          bgColor="bg-[linear-gradient(135deg,#FEFCE8_0%,#FEF9C2_100%)]"
          fontColor="text-[#A65F00]"
          symbol={<LuStar className='text-[#D08700]' />}
        />

        <ReviewCard
          title="Avg Rating Given"
          totalNumber={212}
          borderColor="border-[#B9F8CF]"
          bgColor="bg-[linear-gradient(135deg,#F0FDF4_0%,#DCFCE7_100%)]"
          fontColor="text-[#008236]"
          symbol={<AiFillStar className='text-[#00A63E]' />}
        />

        <ReviewCard
          title="Helpful Votes"
          totalNumber={156}
          borderColor="border-[#BEDBFF]"
          bgColor="bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)]"
          fontColor="text-[#1447E6]"
          symbol={<RiCheckboxCircleLine className='text-[#1447E6]' />}
        />
      </div>
      
      <div className="mt-4">
        <Container title={"Recent Reviews"}>
          <ReviewList />
        </Container>
      </div>
    </>
  )
}

export default GuestReview;