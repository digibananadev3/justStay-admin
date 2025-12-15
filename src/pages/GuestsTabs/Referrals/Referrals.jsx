import BookingCardComponent from "../../../components/Cards/BookingCardComponent";
import GenealogyTree from "./GenealogyTree";

const Referrals = () => {

  const referralsList = [{
    title: "Total Referrals",
    value: "1325",
    borderColor: "border-[#EFF6FF]",
    bgColor: "bg-[#EFF6FF]",
    fontTitleColor: "text-[#1447E6]"
  },
  {
    title: "Active Referrals",
    value: "135",
    borderColor: "border-[#F0FDF4]",
    bgColor: "bg-[#F0FDF4]",
    fontTitleColor: "text-[#008236]"
  },
  {
    title: "Earnings",
    value: "212512",
    borderColor: "border-[#FAF5FF]",
    bgColor: "bg-[#FAF5FF]",
    fontTitleColor: "text-[#8200DB]"
  }
]
  return(
    <>
      <div className="w-full rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between">
          <p className="font-medium text-[14px] leading-4 tracking-[0px]">Referral Network</p>
          <p className="font-medium text-[12px] bg-[#CBFBF1] rounded-2xl px-2 py-0.5 text-[#005F5A]">Code: RAHUL2024</p>
        </div>
        <div className="flex gap-4 mt-9">
          {
            referralsList.map((referral => (
              <BookingCardComponent
                title={referral.title}
                totalNumber={referral.value}
                borderColor={referral.borderColor}
                bgColor={referral.bgColor}
                fontTitleColor={referral.fontTitleColor}
              />
            )))
          }
        </div>
        <div className="mt-9">
          <GenealogyTree />
        </div>
      </div>
    </>
  )
}

export default Referrals;