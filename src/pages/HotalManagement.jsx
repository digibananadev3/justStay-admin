import {
  LuHotel,
  LuCheck,
  LuClock,
  LuShieldCheck,
  LuStar,
  LuMapPin,
  LuPhone,
  LuEye,
} from "react-icons/lu";
import CardComponent from "../components/Cards/CardComponent";
import PageHeading from "../components/PageHeading/PageHeading";
import HotelFilters from "../components/HotelManagement/HotelFilters";
import TableComponent from "../components/BasicComponent/TableComponent";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import HotelManagementDrawer from "./HotelManagementDrawer";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties, fetchPropertiesStats, exportProperties } from "../services/properties";
import Loader from "../components/BasicComponent/Loader";
import EditHotelDrawer from "./EditHotelDrawer";

const HotalManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
const [editPropertyId, setEditPropertyId] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch properties from API with search
  const {
    data: propertiesData,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["properties", page, limit, searchQuery, statusFilter],
    queryFn: () => fetchProperties(page, limit, searchQuery, statusFilter),
    // For React Query v5:
    placeholderData: (previousData) => previousData,
    // For React Query v4, use: keepPreviousData: true
    staleTime: 30000, // Keep data fresh for 30 seconds
  });

  const pagination = propertiesData?.pagination || {};

  const currentPage = pagination.page || page;
  const pageSize = pagination.limit || limit;
  const totalItems = pagination.total * pagination.totalPages || 0;

  // Fetch properties stats from API
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["propertiesStats"],
    queryFn: fetchPropertiesStats,
  });

  // Handle search input
  const handleSearch = useCallback((value) => {
    const trimmedValue = value?.trim() || "";
    setSearchQuery(trimmedValue);
    setPage(1); // Reset to first page when searching
  }, []);

  const handleExport = async () => {
  try {
    const response = await exportProperties(searchQuery, statusFilter);
    console.log("This is the responsive of the handleExport", response);

    const blob = new Blob([response.data], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "hotel_properties_export.csv";

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export error:", error);
    alert("Failed to export properties");
  }
};


  // Transform API response to match table structure
  const transformPropertiesData = (properties) => {
    if (!properties || !Array.isArray(properties)) return [];

    return properties.map((property) => {
      // Determine KYC status based on documents
      const hasVerifiedDocuments = property.documents?.some(
        (doc) => doc.status === "Approved" || doc.status === "Verified"
      );
      const kycStatus = hasVerifiedDocuments ? "Verified" : "Unverified";

      // Build features array from badges
      const features = [];
      if (property.badges?.hourlyBooking) features.push("Hourly");
      if (property.badges?.goSafeBadge) features.push("goSafe");

      // Format hotel meta info
      const hotelMeta = `${property.propertyType || "Property"} • ${
        property.rating > 0 ? property.rating + "★" : "N/A"
      } • ID: ${property._id?.slice(-6) || "N/A"}`;

      return {
        hotel: property.basicPropertyDetails?.name || "N/A",
        hotelMeta: hotelMeta,
        city: property.location?.city || "N/A",
        state: property.location?.state || "N/A",
        owner:
          property.userId?.phone || property.contactDetails?.mobile || "N/A",
        phone:
          property.contactDetails?.mobile || property.userId?.phone || "N/A",
        rooms: property.roomCount || 0,
        occupancy: 0, // Not available in API response
        status: property.status || property.listingStatus || "N/A",
        kyc: kycStatus,
        rating: property.rating || 0,
        reviews: property.totalRatings || 0,
        features: features,
        bookings: 0, // Not available in API response
        revenue: "N/A", // Not available in API response
        _id: property._id, // Store original ID for reference
      };
    });
  };

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0";
    return num.toLocaleString("en-US");
  };

  // Get stats from API response
  const stats = statsData?.success ? statsData.data : null;

  // Find counts from propertiesByStatus array
  const getStatusCount = (statusName) => {
    if (!stats?.propertiesByStatus) return 0;
    const statusItem = stats.propertiesByStatus.find(
      (item) => item._id === statusName
    );
    return statusItem?.count || 0;
  };

  // Calculate Active count (sum of all statuses except "Under Review" and "Rejected")
  const getActiveCount = () => {
    if (!stats?.propertiesByStatus) return 0;
    const total = stats.totalProperties || 0;
    const pending = getStatusCount("Under Review");
    const rejected = getStatusCount("Rejected");
    return Math.max(0, total - pending - rejected);
  };

  const hotelCards = [
    {
      title: "Total Hotels",
      totalNumber: formatNumber(stats?.totalProperties || 0),
      borderColor: "border-[#E5E7EB]",
      bgColor: "bg-white",
      fontTitleColor: "text-[#4A5565]",
      icon: LuHotel,
      iconClass: "text-[#4A5565]",
    },
    {
      title: "Active",
      totalNumber: formatNumber(getActiveCount()),
      borderColor: "border-[#B9F8CF]",
      bgColor: "bg-gradient-to-bl from-[#F0FDF4] to-[#DCFCE7]",
      fontTitleColor: "text-[#00A63E]",
      icon: LuCheck,
      iconClass: "text-[#00A63E]",
    },
    {
      title: "Pending",
      totalNumber: formatNumber(getStatusCount("Under Review")),
      borderColor: "border-[#FFF085]",
      bgColor: "bg-gradient-to-bl from-[#FEFCE8] to-[#FEF9C2]",
      fontTitleColor: "text-[#A65F00]",
      icon: LuClock,
      iconClass: "text-[#A65F00]",
    },
    {
      title: "Hourly Enabled",
      totalNumber: "N/A", // Not available in stats API
      borderColor: "border-[#BEDBFF]",
      bgColor: "bg-gradient-to-bl from-[#EFF6FF] to-[#DBEAFE]",
      fontTitleColor: "text-[#1447E6]",
      icon: LuClock,
      iconClass: "text-blue-600",
    },
    {
      title: "goSafe Certified",
      totalNumber: "N/A", // Not available in stats API
      borderColor: "border-[#B9F8CF]",
      bgColor: "bg-gradient-to-bl from-[#F0FDFA] to-[#CBFBF1]",
      fontTitleColor: "text-[#008236]",
      icon: LuShieldCheck,
      iconClass: "text-emerald-600",
    },
    {
      title: "Avg Rating",
      totalNumber: "N/A", // Not available in stats API
      borderColor: "border-[#E2C4FF]",
      bgColor: "bg-gradient-to-bl from-[#FAF5FF] to-[#F3E8FF]",
      fontTitleColor: "text-[#7C3AED]",
      icon: LuStar,
      iconClass: "text-purple-500",
    },
  ];

  const columns = [
    {
      header: "Hotel",
      accessor: "hotel",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 grid place-items-center border border-teal-100">
            <LuHotel size={16} />
          </div>
          <div>
            <p className="font-poppins font-medium text-[14px] leading-5">
              {value}
            </p>
            <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
              {row.hotelMeta}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: "city",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            <LuMapPin size={14} />
          </span>
          <div>
            <p className="font-poppins font-medium text-[14px] leading-5">
              {value}
            </p>
            <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
              {row.state}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Owner",
      accessor: "owner",
      render: (value, row) => (
        <div>
          <p className="font-poppins font-medium text-[14px] leading-5">
            {value}
          </p>
          <p className="font-poppins text-[12px] leading-4 text-[#6A7282] inline-flex items-center gap-1">
            <LuPhone size={12} className="text-gray-500" />
            {row.phone}
          </p>
        </div>
      ),
    },
    {
      header: "Rooms",
      accessor: "rooms",
      render: (value, row) => (
        <div>
          <p className="font-poppins font-medium text-[14px] leading-5">
            {value} Rooms
          </p>
          <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
            {row.occupancy}% Occupied
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 text-[12px] rounded-full border ${
              value === "Active"
                ? "bg-green-100 text-green-700 border-[#B9F8CF]"
                : "bg-yellow-50 text-amber-700 border-amber-200"
            }`}
          >
            {value}
          </span>
          <span
            className={`px-2.5 py-1 text-[12px] rounded-full border ${
              row.kyc === "Verified"
                ? "bg-green-100 text-green-700 border-[#B9F8CF]"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {row.kyc}
          </span>
        </div>
      ),
    },
    {
      header: "Rating",
      accessor: "rating",
      render: (value, row) => (
        <div>
          <p className="font-poppins font-medium text-[14px] leading-5 inline-flex items-center gap-1">
            <span className="text-amber-500">
              <LuStar size={14} />
            </span>
            {value}
          </p>
          <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
            {row.reviews} reviews
          </p>
        </div>
      ),
    },
    {
      header: "Features",
      accessor: "features",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.features?.length > 0 ? (
            row.features.map((f) => (
              <span
                key={f}
                className={`px-2 py-1 text-[12px] rounded-lg border ${
                  f === "Hourly"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-green-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {f}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-[12px]">-</span>
          )}
        </div>
      ),
    },
    {
      header: "Performance",
      accessor: "bookings",
      render: (value, row) => (
        <div>
          <p className="font-poppins font-medium text-[14px] leading-5">
            {value} Bookings
          </p>
          <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
            {row.revenue}
          </p>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (value, row) => (
        <div className="flex items-center gap-3 text-gray-500">
          <button
            className="hover:text-blue-600 cursor-pointer"
            aria-label="View"
            onClick={(e) => {
              setIsOpen(!isOpen)
            }}
          >
            <LuEye size={16} />
          </button>
          <button
            className="hover:text-blue-600 cursor-pointer"
            aria-label="Edit"
            onClick={(e) => { 
              e.stopPropagation();
                setEditPropertyId(row?._id);
    setIsEditOpen(true);
            }}
          >
            <FaRegEdit size={16} />
          </button>
          <button
            className="hover:text-blue-600"
            aria-label="More"
            onClick={(e) => e.stopPropagation()}
          >
            <BsThreeDots size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Transform API response to match table structure
  const data = propertiesData?.success
    ? transformPropertiesData(propertiesData.data)
    : [];

  // Get total items from pagination
  //   // Use stats total if available (more reliable), otherwise use pagination total
  //   const totalItems = searchQuery
  //     ? propertiesData?.pagination?.total || 0 // For search, use pagination total
  //     : stats?.totalProperties || propertiesData?.pagination?.total || 0; // For all properties, use stats
  // // const totalItems = propertiesData?.pagination?.total || 0;

  if (isLoading || statsLoading) return <Loader />;
  if (error)
    return <div className="p-5">Error loading properties: {error.message}</div>;

  return (
    <>
      <div className="p-6">
        <PageHeading
          title={"Hotel Management"}
          subTitle={"Manage all hotel properties and listings"}
        />
      </div>
      {console.log("This is the value of the propertiesData ", propertiesData)}
      <div className="flex gap-4 pt-8">
        {hotelCards.map((item) => (
          <CardComponent
            key={item.title}
            title={item.title}
            totalNumber={item.totalNumber}
            borderColor={item.borderColor}
            bgColor={item.bgColor}
            fontTitleColor={item.fontTitleColor}
            isIcon
            symbolIcon={<item.icon size={18} className={item.iconClass} />}
          />
        ))}
      </div>

      <div className="p-6 my-6 border border-gray-200 rounded-2xl">
        <HotelFilters
          handleSearch={handleSearch}
          status={statusFilter}
          onExport={handleExport}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
        />
      </div>

      <div>
        <TableComponent
          columns={columns}
          data={data}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(newPage) => {
            if (newPage !== currentPage) {
              setPage(newPage); // triggers backend fetch
            }
          }}
          onRowClick={(row) => {
            setSelectedPropertyId(row._id);
            // setIsOpen(true);
          }}
        />
        <HotelManagementDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          propertyId={selectedPropertyId}
        />

        <EditHotelDrawer
  isOpen={isEditOpen}
  setIsOpen={setIsEditOpen}
  propertyId={editPropertyId}
/>

      </div>
    </>
  );
};

export default HotalManagement;
