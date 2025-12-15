import BookingCardComponent from "../../../components/Cards/BookingCardComponent";

const BookingPattern = ({frequencyList}) => {
  const patternList = [
    {
      label: "Daily Average",
      value: "0.15",
      subLabel: "bookings/day",
      access: "dailyAvg"
    },
    {
      label: "Weekly Average",
      value: "0.15",
      subLabel: "bookings/day",
      access: "weeklyAvg"
    },
    {
      label: "Daily Average",
      value: "0.15",
      subLabel: "bookings/day",
      access: "monthlyAvg"
    },
  ]

  return(
    <>
      <div className="flex gap-4">
        {
          patternList.map((pattern) => (
            <BookingCardComponent
              key={pattern.label}
              title={pattern.label}
              subTitle={pattern.subLabel}
              totalNumber={ frequencyList?.[pattern.access] || 0 }
              bgColor="bg-[#F9FAFB]"
              borderColor="border-[#F9FAFB]"
            />
          ))
        }
      </div>
    </>
  )
}

export default BookingPattern;