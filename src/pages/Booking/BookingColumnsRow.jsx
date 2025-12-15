import { LuEye, LuLink2, LuBadgeCheck } from "react-icons/lu";

const Pill = ({ text, className = "" }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>{text}</span>
);

const StatusPill = ({ status }) => {
  const map = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-purple-100 text-purple-700",
    "checked-in": "bg-emerald-100 text-emerald-700",
    completed: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-rose-100 text-rose-700",
  };
  const cls = map[status] || "bg-gray-100 text-gray-700";
  return <Pill text={status} className={cls} />;
};

const PaymentPill = ({ text = "paid" }) => {
  const cls = text === "refunded" ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700";
  return <Pill text={text} className={cls} />;
};

const SourcePill = ({ text }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
    <LuLink2 className="text-gray-500" /> {text}
  </span>
);

const BookingIdCell = ({ id, createdAt }) => (
  <div>
    <p className="text-sm font-semibold text-[#101828]">{id}</p>
    <p className="text-xs text-[#6A7282]">{createdAt}</p>
  </div>
);

const Avatar = ({ name }) => (
  <div className="h-7 w-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold">
    {name?.[0] || "?"}
  </div>
);

const GuestCell = ({ name, phone, verified = true }) => (
  <div className="flex items-center gap-3">
    <Avatar name={name} />
    <div>
      <p className="text-sm font-semibold text-[#101828] inline-flex items-center gap-1">
        {name}
        {verified && <LuBadgeCheck className="text-emerald-600" />}
      </p>
      <p className="text-xs text-[#6A7282]">{phone}</p>
    </div>
  </div>
);

const HotelCell = ({ name, roomType, city }) => (
  <div>
    <p className="text-sm font-semibold text-[#101828]">{name}</p>
    <p className="text-xs text-[#6A7282]">{roomType}</p>
    <p className="text-xs text-[#6A7282]">{city}</p>
  </div>
);

const CheckInCell = ({ date, time }) => (
  <div>
    <p className="text-sm font-semibold text-[#101828]">{date}</p>
    <p className="text-xs text-[#6A7282]">{time}</p>
  </div>
);

const DurationCell = ({ nights, hours }) => (
  <div className="flex items-center gap-2">
    {nights ? <span className="text-sm font-semibold text-[#101828]">{nights} nights</span> : null}
    {hours ? <Pill text={`${hours}-hour`} className="bg-purple-100 text-purple-700" /> : null}
  </div>
);

const AmountCell = ({ amount, payment }) => (
  <div className="flex items-center gap-2">
    <p className="text-sm font-semibold text-[#101828]">₹{amount.toLocaleString()}</p>
    <PaymentPill text={payment} />
  </div>
);

const ActionCell = ({ onClick }) => (
  <button
    type="button"
    onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-[#0A0A0A] font-medium hover:bg-gray-100"
  >
    <LuEye />
    View
  </button>
);

export const bookingColumns = [
  {
    header: "Booking ID",
    accessor: "bookingId",
    render: (_, row) => <BookingIdCell id={row.bookingId} createdAt={row.createdAt} />,
  },
  {
    header: "Guest",
    accessor: "guest",
    render: (_, row) => <GuestCell name={row.guest.name} phone={row.guest.phone} verified={row.guest.verified} />,
  },
  {
    header: "Hotel",
    accessor: "hotel",
    render: (_, row) => <HotelCell name={row.hotel.name} roomType={row.hotel.roomType} city={row.hotel.city} />,
  },
  {
    header: "Check-in",
    accessor: "checkIn",
    render: (_, row) => <CheckInCell date={row.checkIn.date} time={row.checkIn.time} />,
  },
  {
    header: "Duration",
    accessor: "duration",
    render: (_, row) => <DurationCell nights={row.duration.nights} hours={row.duration.hours} />,
  },
  {
    header: "Amount",
    accessor: "amount",
    render: (_, row) => <AmountCell amount={row.amount.value} payment={row.amount.payment} />,
  },
  {
    header: "Status",
    accessor: "status",
    render: (v) => <StatusPill status={v} />,
  },
  {
    header: "Source",
    accessor: "source",
    render: (v) => <SourcePill text={v} />,
  },
  {
    header: "Actions",
    accessor: "actions",
    render: () => <ActionCell />,
  },
];

export const bookingData = [
  {
    bookingId: "BK001",
    createdAt: "2025-10-08 3:45 PM",
    guest: { name: "Rahul Sharma", phone: "+91 98765 43210", verified: true },
    hotel: { name: "The Grand Oberoi", roomType: "Deluxe King Room", city: "Mumbai" },
    checkIn: { date: "2025-10-12", time: "2:00 PM" },
    duration: { nights: 2 },
    amount: { value: 8048, payment: "paid" },
    status: "upcoming",
    source: "JustStay App",
  },
  {
    bookingId: "BK002",
    createdAt: "2025-10-09 11:20 AM",
    guest: { name: "Priya Patel", phone: "+91 87654 32109", verified: true },
    hotel: { name: "Hotel Comfort Inn", roomType: "Standard Double", city: "Goa" },
    checkIn: { date: "2025-10-10", time: "3:00 PM" },
    duration: { hours: 3 },
    amount: { value: 1358, payment: "paid" },
    status: "ongoing",
    source: "Website",
  },
  {
    bookingId: "BK003",
    createdAt: "2025-10-07 9:15 AM",
    guest: { name: "Amit Kumar", phone: "+91 76543 21098", verified: true },
    hotel: { name: "Luxury Palace Hotel", roomType: "Executive Suite", city: "Jaipur" },
    checkIn: { date: "2025-10-10", time: "12:00 PM" },
    duration: { hours: 6 },
    amount: { value: 2527, payment: "paid" },
    status: "checked-in",
    source: "Booking.com",
  },
  {
    bookingId: "BK004",
    createdAt: "2025-10-06 6:30 PM",
    guest: { name: "Sneha Reddy", phone: "+91 65432 10987", verified: true },
    hotel: { name: "Budget Stay Inn", roomType: "Standard Twin", city: "Delhi" },
    checkIn: { date: "2025-10-06", time: "2:00 PM" },
    duration: { nights: 2 },
    amount: { value: 3043, payment: "paid" },
    status: "completed",
    source: "Expedia",
  },
  {
    bookingId: "BK005",
    createdAt: "2025-10-09 4:10 PM",
    guest: { name: "Vikram Singh", phone: "+91 98111 22333", verified: true },
    hotel: { name: "The Grand Oberoi", roomType: "Premium Suite", city: "Mumbai" },
    checkIn: { date: "2025-10-15", time: "2:00 PM" },
    duration: { nights: 2 },
    amount: { value: 15115, payment: "refunded" },
    status: "cancelled",
    source: "JustStay App",
  },
];
