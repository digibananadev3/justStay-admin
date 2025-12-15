import PlatformTitle from "./PlatformTitle";
import NotificationCard from "./NotificationCard";

const sampleNotifications = [
  {
    title: "System Maintenance Notice",
    status: "Scheduled",
    description: "Platform will be under maintenance on March 20th from 2-4 AM",
    target: "all",
    leftLabel: "Scheduled",
    leftValue: "2024-03-19",
    rightLabel: "Recipients",
    rightValue: "12,450",
    // rightLabel2: "Open Rate",
    // rightValue2: "78.5%",
  },
  {
    title: "New Feature: Hourly Booking",
    status: "Sent",
    description: "Book hotels by the hour! Perfect for day stays and quick breaks.",
    target: "all",
    leftLabel: "Sent",
    leftValue: "2024-03-14",
    rightLabel: "Open Rate",
    rightValue: "78.5%",
    rightLabel2: "Recipients",
    rightValue2: "12,450",
  },
];

const Notification = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8">
      <div className="mb-6">
        <PlatformTitle title="Platform Notifications" buttonText="Create Notification" />
      </div>

      <div className="space-y-6">
        {sampleNotifications.map((n, idx) => (
          <NotificationCard key={idx} {...n} />
        ))}
      </div>
    </div>
  );
};

export default Notification;