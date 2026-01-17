import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/BasicComponent/Container";
import ProgressBar from "../../../components/BasicComponent/ProgressBarComponent";
import CardComponent from "../../../components/Cards/CardComponent";
import { LuCalendarDays, LuDollarSign, LuStar, LuTrendingUp } from "react-icons/lu";
import { fetchPropertyPerformance } from "../../../services/properties";
import { useProperty } from "../../HotelManagementDrawer";

const HotelPerformance = () => {
  const { propertyId } = useProperty() || {};

  const { data, isLoading, isError } = useQuery({
    queryKey: ["propertyPerformance", propertyId],
    queryFn: () => fetchPropertyPerformance(propertyId),
    enabled: !!propertyId,
  });

  const performance = data?.data;

  const cards = performance?.cards || {
    totalBookings: 0,
    revenue: 0,
    avgRating: 0,
    occupancy: 0,
  };

  const trends = performance?.trends || {
    thisMonth: 0,
    lastMonth: 0,
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading performance...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load performance data.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <CardComponent
          title="Total Bookings"
          totalNumber={cards.totalBookings}
          isIcon={true}
          symbolIcon={<LuCalendarDays className="text-[#1447E6]" />}
          borderColor="border-[#BEDBFF]"
          bgColor="bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)]"
          fontTitleColor="text-[#1447E6]"
        />

        <CardComponent
          title="Revenue"
          totalNumber={`₹${cards.revenue}`}
          isIcon={true}
          symbolIcon={<LuDollarSign className="text-[#00A63E]" />}
          borderColor="border-[#B9F8CF]"
          bgColor="bg-[linear-gradient(135deg,#F0FDF4_0%,#DCFCE7_100%)]"
          fontTitleColor="text-[#00A63E]"
        />

        <CardComponent
          title="Avg Rating"
          totalNumber={cards.avgRating}
          isIcon={true}
          symbolIcon={<LuStar className="text-[#9810FA]" />}
          borderColor="border-[#E9D4FF]"
          bgColor="bg-[linear-gradient(135deg,#FAF5FF_0%,#F3E8FF_100%)]"
          fontTitleColor="text-[#9810FA]"
        />

        <CardComponent
          title="Occupancy"
          totalNumber={`${cards.occupancy}%`}
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
            percentage={trends.thisMonth}
            color="#00BBA7"
            isText={`${trends.thisMonth} bookings`}
          />

          <ProgressBar
            label="Last Month"
            Icon={LuCalendarDays}
            percentage={trends.lastMonth}
            color="#2B7FFF"
            isText={`${trends.lastMonth} bookings`}
          />
        </Container>
      </div>
    </>
  );
};

export default HotelPerformance;
