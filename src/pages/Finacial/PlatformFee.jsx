import { LuPlus } from "react-icons/lu";
import { FiCheckCircle } from 'react-icons/fi';

const plans = [
  {
    name: "Basic Plan",
    subtitle: "For small properties",
    price: "₹999",
    per: "/month",
    features: ["Up to 5 rooms", "Basic analytics", "Standard support"],
    activeHotels: 120,
    highlight: false,
  },
  {
    name: "Professional Plan",
    subtitle: "For mid-size hotels",
    price: "₹2,499",
    per: "/month",
    features: ["Up to 20 rooms", "Advanced analytics", "Priority support", "Marketing tools"],
    activeHotels: 350,
    highlight: true,
    ribbon: "Most Popular",
  },
  {
    name: "Enterprise Plan",
    subtitle: "For hotel chains",
    price: "₹9,999",
    per: "/month",
    features: ["Unlimited rooms", "Custom analytics", "Dedicated support", "White-label options", "API access"],
    activeHotels: 45,
    highlight: false,
  },
];

const PlatformFee = () => {
  return (
    <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-[#101828] text-[18px] leading-[24px]">C. Platform Fee Monthly</p>
          <p className="text-[#4A5565] text-[13px] leading-[18px]">Subscription-based monthly platform fees</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#009689] text-white text-[14px] font-medium px-4 py-2 rounded-lg">
          <LuPlus />
          Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={
              "relative border rounded-2xl p-5 " +
              (p.highlight ? "bg-[#E6FFFA] border-[#00BBA7] border-2" : "border-[#E5E7EB]")
            }
          >
            {p.ribbon && (
              <span className="absolute -top-2 right-4 bg-[#009689] text-white text-[11px] px-2 py-0.5 rounded-full">
                {p.ribbon}
              </span>
            )}

            <p className="text-[#101828] text-[16px] font-semibold">{p.name}</p>
            <p className="text-[#6A7282] text-[12px] mt-0.5">{p.subtitle}</p>

            <div className="mt-4 flex items-end gap-1">
              <p className="text-[#101828] text-[30px] leading-[34px] font-semibold">{p.price}</p>
              <p className="text-[#6A7282] text-[13px] mb-1">{p.per}</p>
            </div>

            <ul className="mt-4 space-y-2">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#111827]">
                  <FiCheckCircle className="text-[#10B981] mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <span className={`inline-block text-[12px] text-[#111827] ${ p.highlight ? "bg-[#009689] text-white" : "bg-[#F3F4F6]" } px-3 py-1 rounded-full border border-[#E5E7EB]`}>
                {p.activeHotels} Active Hotels
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformFee;