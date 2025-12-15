import CardComponent from "../../../components/Cards/CardComponent";
import { LuStar } from "react-icons/lu";
import { AiFillStar } from 'react-icons/ai';
import { FiMessageSquare } from 'react-icons/fi';
import Container from "../../../components/BasicComponent/Container";
import ReviewList from "./ReviewList";

const HotelReview = () => {
  const ReviewListCard = [
    {
      title: "Total Reviews",
      totalNumber: 456,
      borderColor: "border-[#FFF085]",
      bgColor: "bg-[linear-gradient(135deg,#FEFCE8_0%,#FEF9C2_100%)]",
      fontTitleColor: "text-[#D08700]",
      symbolIcon: <LuStar className="text-[#D08700]" />,
      isIcon: true,
    },
    {
      title: "Average Rating",
      totalNumber: 4.5,
      borderColor: "border-[#B9F8CF]",
      bgColor: "bg-[linear-gradient(135deg,#F0FDF4_0%,#DCFCE7_100%)]",
      fontTitleColor: "text-[#008236]",
      symbolIcon: <AiFillStar className="text-[#008236]" />,
      isIcon: true,
    },
    {
      title: "Response Rate",
      totalNumber: 456,
      borderColor: "border-[#BEDBFF]",
      bgColor: "bg-[linear-gradient(135deg,#EFF6FF_0%,#EFF6FF_100%)]",
      fontTitleColor: "text-[#1447E6]",
      symbolIcon: <FiMessageSquare className="text-[#1447E6]" />,
      isIcon: true,
    }
  ]
  return (
    <>
      <div className="flex gap-4">
        {
          ReviewListCard.map((item) => (
            <CardComponent
              key={item.title}
              title={item.title}
              totalNumber={item.totalNumber}
              borderColor={item.borderColor}
              bgColor={item.bgColor}
              fontTitleColor={item.fontTitleColor}
              symbolIcon={item.symbolIcon}
              isIcon={item.isIcon}
            />
          ))
        }
      </div>
      
      <div className="mt-4">
        <Container title={"Recent Reviews"}>
          <ReviewList items={[
              { name: "Rahul Sharma", text: "Excellent service and beautiful property!", time: "2 days ago", rating: 5 },
              { name: "Priya Patel", text: "Good experience, would recommend.", time: "1 week ago", rating: 4 },
              { name: "Amit Kumar", text: "Amazing location and staff were very friendly.", time: "2 weeks ago", rating: 5 },
            ]}
          />
        </Container>
      </div>
    </>
  )
}

export default HotelReview