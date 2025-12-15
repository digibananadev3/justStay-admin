import OfferCard from "./OfferCard";
import PlatformTitle from "./PlatformTitle";
import BannerCard from "./BannerCard";

const sampleOffers = [
  {
    title: "Welcome Offer - 20% Off",
    description: "Special discount for new users on first booking",
    discount: "20%",
    validFrom: "2024-03-01",
    validTo: "2024-03-31",
    target: "new users",
    used: "1245/5000",
    status: "Active",
  },
  {
    title: "Weekend Special",
    description: "Flat ₹500 off on weekend bookings",
    discount: "₹500",
    validFrom: "2024-03-16",
    validTo: "2024-03-17",
    target: "all",
    used: "456",
    status: "Active",
  },
];

const sampleBanners = [
  {
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    title: "Summer Sale Campaign",
    position: "homepage top",
    clicks: 2340,
    impressions: 45620,
    periodFrom: "2024-03-01",
    periodTo: "2024-03-31",
    status: "Active",
  },
  {
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    title: "Download App Banner",
    position: "app banner",
    clicks: 1890,
    impressions: 32150,
    periodFrom: "2024-02-15",
    periodTo: "Ongoing",
    status: "Active",
  },
];

const OfferBanner = () => {
  return(
    <div className="flex justify-between gap-6">
      <div className="border rounded-2xl border-[#E5E7EB] w-1/2 p-5">
        <PlatformTitle title="Platform Offers" buttonText="Create Offer" />
        <div className="space-y-4">
          {sampleOffers.map((item, idx) => (
            <OfferCard key={idx} {...item} />
          ))}
        </div>
      </div>
      <div className="border rounded-2xl border-[#E5E7EB] w-1/2 p-5">
        <PlatformTitle title="Platform Banners" buttonText="Add Banner" />
        <div className="space-y-4">
        {sampleBanners.map((item, idx) => (
          <BannerCard key={idx} {...item} />
        ))}
        </div>
      </div>
    </div>
  )   
}

export default OfferBanner