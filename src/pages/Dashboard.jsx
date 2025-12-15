import { useQuery } from "@tanstack/react-query";
import PageHeading from "../components/PageHeading/PageHeading";
import BookingActivityCard from "./Dashboard/BookingActivityCard";
import DashbordTill from "./Dashboard/DahsbordTill";
import RecentActivity from "./Dashboard/RecentActivity";
import RecentChart from "./Dashboard/RecentChart";
import { fetchDashboardOverview } from "../services/dashboard";
import Loader from "../components/BasicComponent/Loader";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: fetchDashboardOverview,
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="p-5">Error loading dashboard data</div>;

  const overviewData = data?.data || {};

  return (
    <>
      <div>
        <PageHeading title="Dashboard & Overview"
          subTitle="Welcome back! Here's what's happening with your platform today."
        />
      </div>
      <div>
        <DashbordTill headerData={overviewData.header} />
      </div>
      <div>
        <RecentChart 
          revenueTrends={overviewData.revenueTrends} 
          quickActions={overviewData.quickActions}
        />
      </div>
      <div>
        <RecentActivity recentActivity={overviewData.recentActivity} />
      </div>
      <div>
        <BookingActivityCard kpis={overviewData.kpis} />
      </div>
    </>
  );
};

export default Dashboard;