import { LuClock, LuShieldCheck } from "react-icons/lu";
import SelectComponent from "../../components/BasicComponent/SelectComponent";
import HotelApprovalCard from "./HotelApprovalCard";

const sampleApprovals = [
  {
    name: "Grand Palace Hotel",
    status: "Pending",
    statusTone: "yellow",
    city: "Mumbai, Maharashtra",
    rating: 4.5,
    qualityScore: 85,
    verification: "verified",
    tags: [{ label: "Hourly Booking", tone: "teal", symbol: <LuClock /> }],
    submittedBy: "Hotel Paradise Ltd.",
    date: "2024-03-15",
    photos: [
      "https://images.unsplash.com/photo-1501117716987-c8e2aeb6f6d1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501117716987-c8e2aeb6f6d1?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    name: "Budget Stay Inn",
    status: "Under review",
    statusTone: "blue",
    city: "Delhi, NCR",
    rating: 3.8,
    qualityScore: 72,
    verification: "partial",
    tags: [{ label: "goSafe", tone: "green", symbol: <LuShieldCheck /> }],
    submittedBy: "Budget Hotels Pvt.",
    date: "2024-03-14",
    photos: [
      "https://images.unsplash.com/photo-1501117716987-c8e2aeb6f6d1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501117716987-c8e2aeb6f6d1?q=80&w=600&auto=format&fit=crop",
    ],
  },
];

const HotelListingApprovals = () => {
  return (
    <>
      <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold text-[#101828] mr-4">
            Hotel Listing Approvals
          </h2>
          <div>
            <SelectComponent options={["All Status", "Pending", "Under review", "Approved", "Rejected"]} />
          </div>
        </div>

        <div className="space-y-6">
          {sampleApprovals.map((item, idx) => (
            <HotelApprovalCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default HotelListingApprovals;