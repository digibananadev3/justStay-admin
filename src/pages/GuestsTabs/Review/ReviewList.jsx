import { FaStar } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';

const ReviewList = ({
  title
}) => {
  return(
    <div className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-md">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[14px] leading-5 tracking-[0px]">The Grand Oberoi</p>
          <div className="flex">
            <FaStar className='text-[#F0B100]'/>
            <FaStar className='text-[#F0B100]'/>
            <FaStar className='text-[#F0B100]'/>
            <FaStar className='text-[#F0B100]'/>
            <FaStar className='text-[#F0B100]'/>

          </div>
        </div>
        <p className="my-2 font-poppins text-[12px] leading-4 tracking-[0px] text-[#364153]">Excellent service and beautiful rooms!</p>
        <div className="flex justify-between items-center">
          <p className="text-[12px] leading-4 tracking-[0px]">2 days ago</p>
          <div className="flex items-center">
            <FiCheckCircle className="text-[#00A63E]" />
            <p className='text-[12px] leading-4 tracking-[0px] pl-1'>12 found helpful</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewList;