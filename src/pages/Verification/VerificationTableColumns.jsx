import { LuCircleCheckBig, LuEye, LuBuilding } from 'react-icons/lu';
import { LuCircleX } from 'react-icons/lu';
import { FaRegClock } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';


export const StatusBadge = ({ status }) => {
  const map = {
    Verified: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Not_started: "bg-gray-100 text-gray-700",
  };
  const cls = map[status] || map.Pending;
  return (
    <span className={`px-4 py-1 rounded-full text-[12px] leading-[16px] tracking-[0px] font-medium ${cls}`}>
      {String(status).replace("_", " ")}
    </span>
  );
};

export const AvatarName = ({ name, email }) => (
  <div className="flex items-center gap-3">
    <div className="h-9 w-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-semibold">
      {name?.[0] || "?"}
    </div>
    <div>
      <p className="text-sm font-semibold text-[#101828]">{name}</p>
      <p className="text-xs text-gray-500">{email}</p>
    </div>
  </div>
);

export const DocList = ({ docs }) => (
  <div className="flex flex-col">
    {docs && docs.length ? (
      docs.map((d, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
          {d.ok ? (
            <LuCircleCheckBig className="text-green-600" />
          ) : (
            <LuCircleX className="text-red-500" />
          )}
          <span>{d.label}</span>
        </div>
      ))
    ) : (
      <span className="text-sm text-gray-400">No documents</span>
    )}
  </div>
);

export const FlagCell = ({ count }) =>
  count > 0 ? (
    <div className="flex items-center gap-2 text-red-500">
      <FiAlertTriangle />
      <span className="text-sm font-medium">{count}</span>
    </div>
  ) : (
    <span className="text-sm text-gray-400">None</span>
  );

export const ActionCell = ({ onClick }) => (
  <button
    type="button"
    onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-[#0A0A0A] font-medium hover:bg-gray-100"
  >
    <LuEye />
    Review
  </button>
);

export const columns = [
  {
    header: "Guest",
    accessor: "guest",
    render: (_, row) => <AvatarName name={row.name} email={row.email} />,
  },
  {
    header: "KYC Status",
    accessor: "status",
    render: (v) => <StatusBadge status={v} />,
  },
  {
    header: "Documents",
    accessor: "documents",
    render: (v) => <DocList docs={v} />,
  },
  { header: "Submitted", accessor: "submitted" },
  { header: "Verified By", accessor: "verifiedBy" },
  {
    header: "Flags",
    accessor: "flags",
    render: (v) => <FlagCell count={v} />,
  },
  {
    header: "Actions",
    accessor: "actions",
    render: () => <ActionCell />,
  }];

export const data =
  [
    {
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      status: "Pending",
      documents: [
        { label: "PAN", ok: true },
        { label: "Aadhaar", ok: true },
      ],
      submitted: "2025-01-10 10:30 AM",
      verifiedBy: "-",
      flags: 1,
    },
    {
      name: "Priya Patel",
      email: "priya.patel@email.com",
      status: "Verified",
      documents: [
        { label: "PAN", ok: true },
        { label: "Aadhaar", ok: true },
      ],
      submitted: "2024-12-20 2:15 PM",
      verifiedBy: "Admin Team",
      flags: 0,
    },
    {
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      status: "Rejected",
      documents: [
        { label: "PAN", ok: true },
        { label: "Passport", ok: false },
      ],
      submitted: "2025-01-08 9:45 AM",
      verifiedBy: "-",
      flags: 0,
    },
    {
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      status: "Not_started",
      documents: [],
      submitted: "2025-01-05",
      verifiedBy: "-",
      flags: 0,
    },
  ];


  // -------- Hotel verification table (columns + data) --------
export const HotelCell = ({ name, location }) => (
  <div className="flex items-start gap-3">
    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
      <LuBuilding />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#101828] leading-5">{name}</p>
      <p className="text-xs text-gray-500 leading-4">{location}</p>
    </div>
  </div>
);

export const RatingCell = ({ value = 0 }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <AiFillStar key={i} className={i < Math.round(value) ? 'text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
    <span className="text-sm font-semibold text-[#101828]">{value}★</span>
  </div>
);

export const Pill = ({ text, colorClasses = 'bg-blue-100 text-blue-700' }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}>{text}</span>
);

export const ListingBadge = ({ status }) => {
  const map = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
  };
  const cls = map[status] || map.pending;
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{status}</span>;
};

export const hotelColumns = [
  {
    header: 'Hotel',
    accessor: 'hotel',
    render: (_, row) => <HotelCell name={row.name} location={row.location} />,
  },
  {
    header: 'Rating',
    accessor: 'rating',
    render: (v) => <RatingCell value={v} />,
  },
  {
    header: 'Status',
    accessor: 'status',
    render: (v) => <StatusBadge status={v} />,
  },
  {
    header: 'Documents',
    accessor: 'documents',
    render: (v) => <DocList docs={v} />,
  },
  {
    header: 'Badges',
    accessor: 'badges',
    render: (v) => (
      <div className="flex flex-wrap gap-2">
        {v.map((b, i) => (
          <Pill key={i} text={b.text} colorClasses={b.color} />
        ))}
      </div>
    ),
  },
  {
    header: 'Listing',
    accessor: 'listing',
    render: (v) => <ListingBadge status={v} />,
  },
  {
    header: 'Actions',
    accessor: 'actions',
    render: () => <ActionCell />,
  },
];

export const hotelData = [
  {
    name: 'The Grand Oberoi',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    status: 'Verified',
    documents: [
      { label: 'GST', ok: true },
      { label: 'Business License', ok: true },
      { label: 'Property Proof', ok: true },
    ],
    badges: [
      { text: 'Verified', color: 'bg-blue-100 text-blue-700' },
      { text: 'goSafe', color: 'bg-green-100 text-green-700' },
      { text: 'Couple Friendly', color: 'bg-pink-100 text-pink-700' },
    ],
    listing: 'approved',
  },
  {
    name: 'Hotel Comfort Inn',
    location: 'Goa, Goa',
    rating: 3,
    status: 'Pending',
    documents: [
      { label: 'GST', ok: true },
      { label: 'Business License', ok: true },
      { label: 'Property Proof', ok: true },
    ],
    badges: [
      { text: 'Hourly', color: 'bg-purple-100 text-purple-700' },
      { text: 'Couple Friendly', color: 'bg-pink-100 text-pink-700' },
    ],
    listing: 'pending',
  },
  {
    name: 'Budget Stay Inn',
    location: 'Delhi, Delhi',
    rating: 2,
    status: 'Rejected',
    documents: [
      { label: 'GST', ok: false },
      { label: 'Business License', ok: true },
      { label: 'Property Proof', ok: true },
    ],
    badges: [
      { text: 'Couple Friendly', color: 'bg-pink-100 text-pink-700' },
    ],
    listing: 'rejected',
  },
  {
    name: 'Luxury Palace Hotel',
    location: 'Jaipur, Rajasthan',
    rating: 4,
    status: 'Pending',
    documents: [
      { label: 'GST', ok: true },
      { label: 'Business License', ok: true },
      { label: 'Property Proof', ok: true },
    ],
    badges: [
      { text: 'Hourly', color: 'bg-purple-100 text-purple-700' },
      { text: 'Couple Friendly', color: 'bg-pink-100 text-pink-700' },
    ],
    listing: 'pending',
  },
];