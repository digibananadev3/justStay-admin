import Container from "../../../components/BasicComponent/Container";
import ProgressBar from "../../../components/BasicComponent/ProgressBarComponent";
import CardComponent from "../../../components/Cards/CardComponent";
import { LuCalendarDays, LuDollarSign, LuStar, LuTrendingUp } from "react-icons/lu";

const HotelPerformance = ({ stats }) => {
  const data = {
    bookings: 456,
    revenue: "₹25.0L",
    rating: 4.5,
    occupancy: "82%",
    ...stats,
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <CardComponent
          title="Total Bookings"
          totalNumber={data.bookings}
          isIcon={true}
          symbolIcon={<LuCalendarDays className="text-[#1447E6]" />}
          borderColor="border-[#BEDBFF]"
          bgColor="bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)]"
          fontTitleColor="text-[#1447E6]"
        />

        <CardComponent
          title="Revenue"
          totalNumber={data.revenue}
          isIcon={true}
          symbolIcon={<LuDollarSign className="text-[#00A63E]" />}
          borderColor="border-[#B9F8CF]"
          bgColor="bg-[linear-gradient(135deg,#F0FDF4_0%,#DCFCE7_100%)]"
          fontTitleColor="text-[#00A63E]"
        />

        <CardComponent
          title="Avg Rating"
          totalNumber={data.rating}
          isIcon={true}
          symbolIcon={<LuStar className="text-[#9810FA]" />}
          borderColor="border-[#E9D4FF]"
          bgColor="bg-[linear-gradient(135deg,#FAF5FF_0%,#F3E8FF_100%)]"
          fontTitleColor="text-[#9810FA]"
        />

        <CardComponent
          title="Occupancy"
          totalNumber={data.occupancy}
          isIcon={true}
          symbolIcon={<LuTrendingUp className="text-[#F54900]" />}
          borderColor="border-[#FFD6A7]"
          bgColor="bg-[linear-gradient(135deg,#FFF7ED_0%,#FFEDD4_100%)]"
          fontTitleColor="text-[#F54900]"
        />
      </div>

      <div>
        <Container title="Bookings Trends">
          <ProgressBar
            label="This Month"
            Icon={LuCalendarDays}
            percentage={43}
            color="#00BBA7"
            isText={"124 bookings"}
          />

          <ProgressBar
            label="Last Month"
            Icon={LuCalendarDays}
            percentage={75}
            color="#2B7FFF"
            isText={"98 bookings"}
          />
        </Container>
      </div>
    </>
  );
};

export default HotelPerformance;