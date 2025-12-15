const lableList = [{label: "Total Bookings", value: "0", access: "totalBookings"},
  {label: "Total Spent", value: "0", access: "totalSpent"},
  {label: "Referrals", value: "0", access: "referrals"},
  {label: "Earnings", value: "0", access: "earnings"}

]

const AccountStatistics = ({accountDetail}) => {
  console.log(accountDetail)
  return(
    <>
      <p className="font-poppins font-medium text-[14px] leading-5 tracking-[0px]">Account Statistics</p>
      <div className="flex gap-30 mt-9">
        {
          lableList.map((item) => (
            <div key={item.label}>
              <p className="font-poppins font-normal text-[12px] leading-4 tracking-[0px] text-[#4A5565]">{item.label}</p>
              <p className="font-poppins font-semibold text-[20px] leading-7 tracking-[0px] text-[#4A5565]">{accountDetail?.[item.access] || item.value}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default AccountStatistics;