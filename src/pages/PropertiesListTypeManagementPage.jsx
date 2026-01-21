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
import TableComponent from "../components/BasicComponent/TableComponent";
import { FaRegEdit } from "react-icons/fa";
import HotelManagementDrawer from "./HotelManagementDrawer";
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
//   fetchProperties,
//   fetchPropertiesStats,
//   exportProperties,
  updateSinglePropertyListType,
} from "../services/properties";
import Loader from "../components/BasicComponent/Loader";
import EditHotelDrawer from "./EditHotelDrawer";
// import { AiTwotoneDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { createPortal } from "react-dom";

import {
  fetchAmenitiesStats,
  fetchAllAmenities,
  updateAmenity,
  createNewAmenity,
  deleteAmenity,
  // updateSinglePropertyListType
} from "../services/ammenities.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateAmenityForm from "../components/HotelManagement/UpdateAmenityForm.jsx";
import CreateAmenityForm from "../components/HotelManagement/CreateAmenityForm.jsx";
import { IoAddOutline } from "react-icons/io5";
import ConfirmAmenityDelete from "../components/HotelManagement/ConfirmAmenityDelete.jsx";
import {
  getAllPropertyTypes,
  //   getPropertyTypeStats,
  //   getPropertyListTypeStats, // add this
  //   createPropertyListType,
  //   createNewPropertyType,
  updateSinglePropertyType,
  deleteSinglePropertyType,
} from "../services/properties";
// import CreatePropertyTypeForm from "../components/HotelManagement/CreatePropertyTypeForm.jsx";
import CreatePropertyListTypeForm from "../components/HotelManagement/CreatePropertyListTypeForm.jsx";
// import UpdatePropertyTypeForm from "../components/HotelManagement/UpdatePropertyTypeForm.jsx";
import UpdatePropertyListTypeForm from "../components/HotelManagement/UpdatePropertyListTypeForm.jsx";
import ConfirmPropertyTypeDelete from "../components/HotelManagement/ConfirmPropertyTypeDelete.jsx";
import {
  getAllPropertyListTypes,
  getPropertyListTypeStats,
  createPropertyListType,
  deleteSinglePropertyListType,
} from "../services/properties";
import ConfirmDeletePropertyListType from "../components/HotelManagement/ConfirmDeletePropertyListType.jsx";
import toast from "react-hot-toast";

const PropertiesListTypeManagementPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [menu, setMenu] = useState({
    id: null,
    rect: null,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePropertyId, setDeletePropertyId] = useState(null);

  // const [editAmenity, setEditAmenity] = useState(null); // stores selected row
  // const [isEditAmenityOpen, setIsEditAmenityOpen] = useState(false);

  // const [editPropertyType, setEditPropertyType] = useState(null);
  // const [isEditPropertyTypeOpen, setIsEditPropertyTypeOpen] = useState(false);

  const [editPropertyListType, setEditPropertyListType] = useState(null);
  const [isEditPropertyListTypeOpen, setIsEditPropertyListTypeOpen] =
    useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // const [isCreateAmenityOpen, setIsCreateAmenityOpen] = useState(false);

  const [isCreatePropertyTypeOpen, setIsCreatePropertyTypeOpen] =
    useState(false);

  useEffect(() => {
    const close = () => setMenu({ id: null, rect: null });
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setDeleteModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Fetch Ammenities Stats
  const queryClient = useQueryClient();

  const {
    mutate: loadAmenitiesStats,
    data: statsData,
    isLoading: statsLoading,
  } = useMutation({
    mutationKey: ["amenitiesStats"],
    mutationFn: fetchAmenitiesStats,
    onSuccess: (data) => {
      // cache it so other components can reuse it
      queryClient.setQueryData(["amenitiesStats"], data);
    },
  });

  //   const createPropertyTypeMutation = useMutation({
  //     mutationFn: createNewPropertyType,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["propertyTypes"]);
  //       queryClient.invalidateQueries(["propertyTypeStats"]);
  //       setIsCreatePropertyTypeOpen(false);
  //     },
  //   });

  const createPropertyListTypeMutation = useMutation({
    mutationFn: createPropertyListType,
    onSuccess: (data) => {
      toast.success(data?.message || "Property List Type created successfully");
      queryClient.invalidateQueries(["propertyListTypes"]);
      queryClient.invalidateQueries(["propertyListTypeStats"]);
      setIsCreatePropertyTypeOpen(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create Property Type ❌");
    },
  });

  const updatePropertyTypeMutation = useMutation({
    mutationFn: ({ id, payload }) => updateSinglePropertyListType(id, payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Property List Type updated successfully");
      queryClient.invalidateQueries(["propertyTypes"]);
      queryClient.invalidateQueries(["propertyTypeStats"]);
    },
  });

  const deletePropertyListTypeMutation = useMutation({
    mutationFn: deleteSinglePropertyListType,
    onSuccess: (data) => {
      toast.success(data?.message || "Property List Type deleted successfully");
      queryClient.invalidateQueries(["propertyListTypes"]);
      queryClient.invalidateQueries(["propertyListTypeStats"]);
      setDeleteModalOpen(false);
      setDeletePropertyId(null);
    },
  });

  // ---- PROPERTY TYPE STATS ----
  //   const { data: propertyTypeStats, isLoading: propertyTypeStatsLoading } =
  //     useQuery({
  //       queryKey: ["propertyTypeStats"],
  //       queryFn: getPropertyTypeStats,
  //       staleTime: 30000,
  //     });

  // ---- ALL PROPERTY TYPES ----
  //   const { data: propertyTypesResponse, isLoading: propertyTypesLoading } =
  //     useQuery({
  //       queryKey: ["propertyTypes"],
  //       queryFn: () => getAllPropertyTypes(),
  //     });

  const {
    data: amenitiesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["amenities", page, searchQuery],
    queryFn: () =>
      fetchAllAmenities({
        page,
        limit,
        search: searchQuery,
      }),
    keepPreviousData: true,
    staleTime: 30000,
  });

  // ---- ALL PROPERTY LIST TYPES ----
  const {
    data: propertyListTypesResponse,
    isLoading: propertyListTypesLoading,
  } = useQuery({
    queryKey: ["propertyListTypes"],
    queryFn: getAllPropertyListTypes, // Use your service function
    staleTime: 30000,
  });


  const updateAmenityMutation = useMutation({
    mutationFn: ({ id, payload }) => updateAmenity(id, payload),
    onSuccess: () => {
      // Refresh table + stats after update
      queryClient.invalidateQueries(["amenities"]);
      queryClient.invalidateQueries(["amenitiesStats"]);
    },
  });

  const createAmenityMutation = useMutation({
    mutationFn: createNewAmenity,
    onSuccess: () => {
      queryClient.invalidateQueries(["amenities"]);
      queryClient.invalidateQueries(["amenitiesStats"]);
      setIsCreateAmenityOpen(false);
    },
  });

  const deleteAmenityMutation = useMutation({
    mutationFn: deleteAmenity,
    onSuccess: () => {
      queryClient.invalidateQueries(["amenities"]);
      queryClient.invalidateQueries(["amenitiesStats"]);
      setDeleteModalOpen(false);
      setDeletePropertyId(null);
    },
  });

  useEffect(() => {
    loadAmenitiesStats();
  }, []);

  // Fetch properties from API with search
  // const {
  //   data: propertiesData,
  //   isLoading,
  //   error,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ["properties", page, limit, searchQuery, statusFilter],
  //   queryFn: () => fetchProperties(page, limit, searchQuery, statusFilter),
  //   // For React Query v5:
  //   placeholderData: (previousData) => previousData,
  //   // For React Query v4, use: keepPreviousData: true
  //   staleTime: 30000, // Keep data fresh for 30 seconds
  // });

  // const pagination = propertiesData?.pagination || {};

  // const currentPage = pagination.page || page;
  // const pageSize = pagination.limit || limit;
  // const totalItems = pagination.total || 0;

  // Fetch properties stats from API
  // const { data: statsData, isLoading: statsLoading } = useQuery({
  //   queryKey: ["propertiesStats"],
  //   queryFn: fetchPropertiesStats,
  // });

  // Handle search input
  const handleSearch = useCallback((value) => {
    const trimmedValue = value?.trim() || "";
    setSearchQuery(trimmedValue);
    setPage(1); // Reset to first page when searching
  }, []);

  // const handleExport = async () => {
  //   try {
  //     const response = await exportProperties(searchQuery, statusFilter);

  //     const blob = new Blob([response.data], {
  //       type: "text/csv;charset=utf-8;",
  //     });

  //     const url = window.URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "hotel_properties_export.csv";

  //     document.body.appendChild(link);
  //     link.click();

  //     link.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Export error:", error);
  //     alert("Failed to export properties");
  //   }
  // };

  // Transform API response to match table structure
  // const transformPropertiesData = (properties) => {
  //   if (!properties || !Array.isArray(properties)) return [];

  //   return properties.map((property) => {
  //     // Determine KYC status based on documents
  //     const hasVerifiedDocuments = property.documents?.some(
  //       (doc) => doc.status === "Approved" || doc.status === "Verified"
  //     );
  //     const kycStatus = hasVerifiedDocuments ? "Verified" : "Unverified";

  //     // Build features array from badges
  //     const features = [];
  //     if (property.badges?.hourlyBooking) features.push("Hourly");
  //     if (property.badges?.goSafeBadge) features.push("goSafe");

  //     // Format hotel meta info
  //     const hotelMeta = `${property.propertyType || "Property"} • ${
  //       property.rating > 0 ? property.rating + "★" : "N/A"
  //     } • ID: ${property._id?.slice(-6) || "N/A"}`;

  //     return {
  //       hotel: property.basicPropertyDetails?.name || "N/A",
  //       hotelMeta: hotelMeta,
  //       city: property.location?.city || "N/A",
  //       state: property.location?.state || "N/A",
  //       owner:
  //         property.userId?.phone || property.contactDetails?.mobile || "N/A",
  //       phone:
  //         property.contactDetails?.mobile || property.userId?.phone || "N/A",
  //       rooms: property.roomCount || 0,
  //       occupancy: 0, // Not available in API response
  //       status: property.status || property.listingStatus || "N/A",
  //       kyc: kycStatus,
  //       rating: property.rating || 0,
  //       reviews: property.totalRatings || 0,
  //       features: features,
  //       bookings: 0, // Not available in API response
  //       revenue: "N/A", // Not available in API response
  //       _id: property._id, // Store original ID for reference
  //     };
  //   });
  // };

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0";
    return num.toLocaleString("en-US");
  };

  // Get stats from API response
  // const stats = statsData?.success ? statsData.data : null;
  const stats = statsData?.success ? statsData.data : null;

  const amenities = amenitiesResponse?.success ? amenitiesResponse.data : [];

  // const pagination = amenitiesResponse?.pagination || {};

  // const currentPage = pagination.page || page;
  // const pageSize = pagination.limit || limit;
  // const totalItems = pagination.total || 0;

  // Find counts from propertiesByStatus array
  const getStatusCount = (statusName) => {
    if (!stats?.propertiesByStatus) return 0;
    const statusItem = stats.propertiesByStatus.find(
      (item) => item._id === statusName,
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

  // ---- PROPERTY LIST TYPE STATS ----
  const {
    data: propertyListTypeStats,
    isLoading: propertyListTypeStatsLoading,
  } = useQuery({
    queryKey: ["propertyListTypeStats"],
    queryFn: getPropertyListTypeStats,
    staleTime: 30000,
  });

  //   const propertyTypes = propertyTypesResponse?.success
  //     ? propertyTypesResponse.data
  //     : [];

  const currentPage = 1;
  const pageSize = 100; // or whatever default you want
  const totalItems = propertyListTypeStats?.data?.totalListTypes || 0;

  // const hotelCards = [
  //   {
  //     title: "Total Amenities",
  //     totalNumber: formatNumber(stats?.totalProperties || 0),
  //     borderColor: "border-[#E5E7EB]",
  //     bgColor: "bg-white",
  //     fontTitleColor: "text-[#4A5565]",
  //     icon: LuHotel,
  //     iconClass: "text-[#4A5565]",
  //   },
  //   {
  //     title: "Enable",
  //     totalNumber: formatNumber(getActiveCount()),
  //     borderColor: "border-[#B9F8CF]",
  //     bgColor: "bg-gradient-to-bl from-[#F0FDF4] to-[#DCFCE7]",
  //     fontTitleColor: "text-[#00A63E]",
  //     icon: LuCheck,
  //     iconClass: "text-[#00A63E]",
  //   },
  //   {
  //     title: "Disable",
  //     totalNumber: formatNumber(getStatusCount("Under Review")),
  //     borderColor: "border-[#FFF085]",
  //     bgColor: "bg-gradient-to-bl from-[#FEFCE8] to-[#FEF9C2]",
  //     fontTitleColor: "text-[#A65F00]",
  //     icon: LuClock,
  //     iconClass: "text-[#A65F00]",
  //   },
  //   // {
  //   //   title: "Hourly Enabled",
  //   //   totalNumber: "N/A", // Not available in stats API
  //   //   borderColor: "border-[#BEDBFF]",
  //   //   bgColor: "bg-gradient-to-bl from-[#EFF6FF] to-[#DBEAFE]",
  //   //   fontTitleColor: "text-[#1447E6]",
  //   //   icon: LuClock,
  //   //   iconClass: "text-blue-600",
  //   // },
  //   // {
  //   //   title: "goSafe Certified",
  //   //   totalNumber: "N/A", // Not available in stats API
  //   //   borderColor: "border-[#B9F8CF]",
  //   //   bgColor: "bg-gradient-to-bl from-[#F0FDFA] to-[#CBFBF1]",
  //   //   fontTitleColor: "text-[#008236]",
  //   //   icon: LuShieldCheck,
  //   //   iconClass: "text-emerald-600",
  //   // },
  //   // {
  //   //   title: "Avg Rating",
  //   //   totalNumber: "N/A", // Not available in stats API
  //   //   borderColor: "border-[#E2C4FF]",
  //   //   bgColor: "bg-gradient-to-bl from-[#FAF5FF] to-[#F3E8FF]",
  //   //   fontTitleColor: "text-[#7C3AED]",
  //   //   icon: LuStar,
  //   //   iconClass: "text-purple-500",
  //   // },
  // ];

  // const hotelCards = [
  //   {
  //     title: "Total Amenities",
  //     totalNumber: formatNumber(stats?.totalAmenities || 0),
  //     borderColor: "border-[#E5E7EB]",
  //     bgColor: "bg-white",
  //     fontTitleColor: "text-[#4A5565]",
  //     icon: LuHotel,
  //     iconClass: "text-[#4A5565]",
  //   },
  //   {
  //     title: "Active",
  //     totalNumber: formatNumber(stats?.activeAmenities || 0),
  //     borderColor: "border-[#B9F8CF]",
  //     bgColor: "bg-gradient-to-bl from-[#F0FDF4] to-[#DCFCE7]",
  //     fontTitleColor: "text-[#00A63E]",
  //     icon: LuCheck,
  //     iconClass: "text-[#00A63E]",
  //   },
  //   {
  //     title: "Inactive",
  //     totalNumber: formatNumber(stats?.inactiveAmenities || 0),
  //     borderColor: "border-[#FFF085]",
  //     bgColor: "bg-gradient-to-bl from-[#FEFCE8] to-[#FEF9C2]",
  //     fontTitleColor: "text-[#A65F00]",
  //     icon: LuClock,
  //     iconClass: "text-[#A65F00]",
  //   },
  // ];

  //   const hotelCards = [
  //     {
  //       title: "Total Property Types",
  //       totalNumber: formatNumber(propertyListTypeStats?.totalPropertyTypes || 0),
  //       borderColor: "border-[#E5E7EB]",
  //       bgColor: "bg-white",
  //       fontTitleColor: "text-[#4A5565]",
  //       icon: LuHotel,
  //       iconClass: "text-[#4A5565]",
  //     },
  //     {
  //       title: "Active Types",
  //       totalNumber: formatNumber(
  //         propertyListTypeStats?.activePropertyTypes || 0,
  //       ),
  //       borderColor: "border-[#B9F8CF]",
  //       bgColor: "bg-gradient-to-bl from-[#F0FDF4] to-[#DCFCE7]",
  //       fontTitleColor: "text-[#00A63E]",
  //       icon: LuCheck,
  //       iconClass: "text-[#00A63E]",
  //     },
  //     {
  //       title: "Inactive Types",
  //       totalNumber: formatNumber(
  //         propertyListTypeStats?.inactivePropertyTypes || 0,
  //       ),
  //       borderColor: "border-[#FFF085]",
  //       bgColor: "bg-gradient-to-bl from-[#FEFCE8] to-[#FEF9C2]",
  //       fontTitleColor: "text-[#A65F00]",
  //       icon: LuClock,
  //       iconClass: "text-[#A65F00]",
  //     },
  //   ];

  const hotelCards = [
    {
      title: "Total List Types",
      totalNumber: formatNumber(
        propertyListTypeStats?.data?.totalListTypes || 0,
      ),
      borderColor: "border-[#E5E7EB]",
      bgColor: "bg-white",
      fontTitleColor: "text-[#4A5565]",
      icon: LuHotel,
      iconClass: "text-[#4A5565]",
    },
    {
      title: "Active List Types",
      totalNumber: formatNumber(
        propertyListTypeStats?.data?.activeListTypes || 0,
      ),
      borderColor: "border-[#B9F8CF]",
      bgColor: "bg-gradient-to-bl from-[#F0FDF4] to-[#DCFCE7]",
      fontTitleColor: "text-[#00A63E]",
      icon: LuCheck,
      iconClass: "text-[#00A63E]",
    },
    {
      title: "Inactive List Types",
      totalNumber: formatNumber(
        propertyListTypeStats?.data?.inactiveListTypes || 0,
      ),
      borderColor: "border-[#FFF085]",
      bgColor: "bg-gradient-to-bl from-[#FEFCE8] to-[#FEF9C2]",
      fontTitleColor: "text-[#A65F00]",
      icon: LuClock,
      iconClass: "text-[#A65F00]",
    },
  ];

  //   const columns = [
  //     {
  //       header: "Hotel",
  //       accessor: "hotel",
  //       render: (value, row) => (
  //         <div className="flex items-center gap-3">
  //           <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 grid place-items-center border border-teal-100">
  //             <LuHotel size={16} />
  //           </div>
  //           <div>
  //             <p className="font-poppins font-medium text-[14px] leading-5">
  //               {value}
  //             </p>
  //             <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
  //               {row.hotelMeta}
  //             </p>
  //           </div>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Location",
  //       accessor: "city",
  //       render: (value, row) => (
  //         <div className="flex items-center gap-2">
  //           <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600 border border-gray-200">
  //             <LuMapPin size={14} />
  //           </span>
  //           <div>
  //             <p className="font-poppins font-medium text-[14px] leading-5">
  //               {value}
  //             </p>
  //             <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
  //               {row.state}
  //             </p>
  //           </div>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Owner",
  //       accessor: "owner",
  //       render: (value, row) => (
  //         <div>
  //           <p className="font-poppins font-medium text-[14px] leading-5">
  //             {value}
  //           </p>
  //           <p className="font-poppins text-[12px] leading-4 text-[#6A7282] inline-flex items-center gap-1">
  //             <LuPhone size={12} className="text-gray-500" />
  //             {row.phone}
  //           </p>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Rooms",
  //       accessor: "rooms",
  //       render: (value, row) => (
  //         <div>
  //           <p className="font-poppins font-medium text-[14px] leading-5">
  //             {value} Rooms
  //           </p>
  //           <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
  //             {row.occupancy}% Occupied
  //           </p>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Status",
  //       accessor: "status",
  //       render: (value, row) => (
  //         <div className="flex items-center gap-2">
  //           <span
  //             className={`px-2.5 py-1 text-[12px] rounded-full border ${
  //               value === "Active"
  //                 ? "bg-green-100 text-green-700 border-[#B9F8CF]"
  //                 : "bg-yellow-50 text-amber-700 border-amber-200"
  //             }`}
  //           >
  //             {value}
  //           </span>
  //           <span
  //             className={`px-2.5 py-1 text-[12px] rounded-full border ${
  //               row.kyc === "Verified"
  //                 ? "bg-green-100 text-green-700 border-[#B9F8CF]"
  //                 : "bg-red-50 text-red-700 border-red-200"
  //             }`}
  //           >
  //             {row.kyc}
  //           </span>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Rating",
  //       accessor: "rating",
  //       render: (value, row) => (
  //         <div>
  //           <p className="font-poppins font-medium text-[14px] leading-5 inline-flex items-center gap-1">
  //             <span className="text-amber-500">
  //               <LuStar size={14} />
  //             </span>
  //             {value}
  //           </p>
  //           <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
  //             {row.reviews} reviews
  //           </p>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Features",
  //       accessor: "features",
  //       render: (_, row) => (
  //         <div className="flex items-center gap-2">
  //           {row.features?.length > 0 ? (
  //             row.features.map((f) => (
  //               <span
  //                 key={f}
  //                 className={`px-2 py-1 text-[12px] rounded-lg border ${
  //                   f === "Hourly"
  //                     ? "bg-blue-50 text-blue-700 border-blue-200"
  //                     : "bg-green-50 text-emerald-700 border-emerald-200"
  //                 }`}
  //               >
  //                 {f}
  //               </span>
  //             ))
  //           ) : (
  //             <span className="text-gray-400 text-[12px]">-</span>
  //           )}
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Performance",
  //       accessor: "bookings",
  //       render: (value, row) => (
  //         <div>
  //           <p className="font-poppins font-medium text-[14px] leading-5">
  //             {value} Bookings
  //           </p>
  //           <p className="font-poppins text-[12px] leading-4 text-[#6A7282]">
  //             {row.revenue}
  //           </p>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Actions",
  //       accessor: "actions",
  //       render: (value, row) => (
  //         <div className="flex items-center gap-3 text-gray-500">
  //           <button
  //             className="hover:text-blue-600 cursor-pointer"
  //             aria-label="View"
  //             onClick={(e) => {
  //               setEditPropertyId(row?._id);
  //               setIsOpen(!isOpen);
  //             }}
  //           >
  //             <LuEye size={16} />
  //           </button>
  //           <button
  //             className="hover:text-blue-600 cursor-pointer"
  //             aria-label="Edit"
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               setEditPropertyId(row?._id);
  //               setIsEditOpen(true);
  //             }}
  //           >
  //             <FaRegEdit size={16} />
  //           </button>
  // <button
  //   className="h-8 w-8 rounded-lg hover:bg-gray-100 transition grid place-items-center cursor-pointer"
  //   onClick={(e) => {
  //     e.stopPropagation();

  //     const rect = e.currentTarget.getBoundingClientRect();

  //     setMenu({
  //       id: row._id,
  //       rect,
  //     });
  //   }}
  // >
  //   <BsThreeDots size={16} />
  // </button>

  //           {/* Dropdown menu */}
  //           {menu.id &&
  //   createPortal(
  //     <div
  //       className="absolute z-[9999] w-44 rounded-xl border border-gray-200 bg-white
  //                  shadow-[0_8px_24px_rgba(0,0,0,0.08)] cursor-pointer"
  //       style={{
  //         top: menu.rect.bottom + window.scrollY + 6,
  //         left: menu.rect.left + window.scrollX - 140,
  //       }}
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       <button
  //         className="flex w-full items-center gap-3 px-4 py-2.5 text-sm
  //                    text-red-600 hover:bg-red-50 transition"
  //  onClick={() => {
  //   setMenu({ id: null, rect: null });
  //   setDeletePropertyId(menu.id);
  //   setDeleteModalOpen(true);
  // }}

  //       >
  //         <MdDelete className="text-lg text-gray-600 cursor-pointer"/>
  //         <span className="font-poppins font-medium text-gray-600">Delete Hotel</span>
  //       </button>
  //     </div>,
  //     document.body
  //   )}

  //         </div>
  //       ),
  //     },
  //   ];

  //   const columns = [
  //     {
  //       header: "Property Types",
  //       accessor: "name",
  //       render: (value) => (
  //         <p className="font-poppins font-medium text-[14px]">{value}</p>
  //       ),
  //     },
  //     {
  //       header: "Name",
  //       accessor: "category",
  //       render: (value) => (
  //         <span className="px-2 py-1 text-xs rounded bg-gray-100 capitalize">
  //           {value}
  //         </span>
  //       ),
  //     },
  //     {
  //       header: "Status",
  //       accessor: "status",
  //       render: (value) => (
  //         <span
  //           className={`px-2.5 py-1 text-xs rounded-full border ${
  //             value === "Active"
  //               ? "bg-green-100 text-green-700 border-green-200"
  //               : "bg-red-100 text-red-700 border-red-200"
  //           }`}
  //         >
  //           {value}
  //         </span>
  //       ),
  //     },
  //     {
  //       header: "Created",
  //       accessor: "createdAt",
  //     },
  //     {
  //       header: "Actions",
  //       accessor: "actions",
  //       render: (_, row) => (
  //         <div className="flex items-center gap-3">
  //           <button
  //             className="hover:text-blue-600"
  //             onClick={() => {
  //               setEditAmenity(row);
  //               setIsEditAmenityOpen(true);
  //             }}
  //           >
  //             <FaRegEdit size={16} />
  //           </button>

  //    <button
  //   className="hover:text-red-600"
  //   onClick={() => {
  //     setDeletePropertyId(row._id);
  //     setDeleteModalOpen(true);
  //   }}
  // >
  //   <MdDelete size={18} />
  // </button>
  //         </div>
  //       ),
  //     },
  //   ];

  //   const columns = [
  //     {
  //       header: "Property Type",
  //       accessor: "name",
  //       render: (value, row) => (
  //         <div className="flex items-center gap-2">
  //           <span className="text-lg">{row.icon}</span>
  //           <p className="font-poppins font-medium text-[14px]">{value}</p>
  //         </div>
  //       ),
  //     },
  //     {
  //       header: "Description",
  //       accessor: "description",
  //       render: (value) => (
  //         <p className="text-sm text-gray-600 line-clamp-2">{value || "—"}</p>
  //       ),
  //     },
  //     {
  //       header: "Status",
  //       accessor: "status",
  //       render: (value) => (
  //         <span
  //           className={`px-2.5 py-1 text-xs rounded-full border ${
  //             value === "Active"
  //               ? "bg-green-100 text-green-700 border-green-200"
  //               : "bg-red-100 text-red-700 border-red-200"
  //           }`}
  //         >
  //           {value}
  //         </span>
  //       ),
  //     },
  //     {
  //       header: "Created",
  //       accessor: "createdAt",
  //     },
  //     {
  //       header: "Actions",
  //       accessor: "actions",
  //       render: (_, row) => (
  //         <div className="flex items-center gap-3">
  //           <button
  //             className="hover:text-blue-600 cursor-pointer"
  //             onClick={() => {
  //               setEditPropertyType(row);
  //               setIsEditPropertyTypeOpen(true);
  //             }}
  //           >
  //             <FaRegEdit size={16} />
  //           </button>

  //           <button
  //             className="hover:text-red-600 cursor-pointer"
  //             onClick={() => {
  //               setDeletePropertyId(row._id);
  //               setDeleteModalOpen(true);
  //             }}
  //           >
  //             <MdDelete size={18} />
  //           </button>
  //         </div>
  //       ),
  //     },
  //   ];

  const columns = [
    {
      header: "Property Type",
      accessor: "name",
      render: (value) => (
        <p className="font-poppins font-medium text-[14px]">{value}</p>
      ),
    },
    {
      header: "Property List Type",
      accessor: "propertyListTypeName",
      render: (value) => (
        <p className="font-poppins font-medium text-[14px]">{value}</p>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      render: (value) => (
        <p className="text-sm text-gray-600 line-clamp-2">{value?.split(" ").length > 5
    ? value.split(" ").slice(0, 5).join(" ") + "..."
    : value}</p>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2.5 py-1 text-xs rounded-full border ${
            value === "Active"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-red-100 text-red-700 border-red-200"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Created",
      accessor: "createdAt",
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <button
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => {
              setEditPropertyListType(row);
              setIsEditPropertyListTypeOpen(true);
            }}
          >
            <FaRegEdit size={16} />
          </button>

          <button
            className="hover:text-red-600 cursor-pointer"
            onClick={() => {
              setDeletePropertyId(row._id);
              setDeleteModalOpen(true);
            }}
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Transform API response to match table structure
  // const data = propertiesData?.success
  //   ? transformPropertiesData(propertiesData.data)
  //   : [];

  // const data = amenities.map((item) => ({
  //   _id: item._id,
  //   name: item.name,
  //   category: item.category,
  //   status: item.isActive ? "Active" : "Inactive",
  //   createdAt: item.createdAt
  //     ? new Date(item.createdAt).toLocaleDateString()
  //     : "—",
  // }));

  //   const data = propertyTypes.map((item) => ({
  //     _id: item._id,
  //     name: item.name,
  //     description: item.description,
  //     // icon: item.icon || "🏨",
  //     status: item.isActive ? "Active" : "Inactive",
  //     createdAt: item.createdAt
  //       ? new Date(item.createdAt).toLocaleDateString()
  //       : "—",
  //   }));

  // const data = propertyListTypesResponse?.success
  //   ? propertyListTypesResponse.data.map((item) => ({
  //       _id: item._id,
  //       name: item.propertyTypeName,
  //       propertyListTypeName : item.PropertyListTypeName,
  //       description: item.description || "—",
  //       status: item.isActive ? "Active" : "Inactive",
  //       createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—",
  //     }))
  //   : [];

  const data = propertyListTypesResponse?.success
    ? propertyListTypesResponse.data.map((item) => ({
        _id: item._id,
        icon: item.icon,
        // ✅ MOST IMPORTANT FIX:
        propertyTypeId: item.propertyTypeId?._id,

        name: item.propertyTypeName,
        propertyListTypeName: item.PropertyListTypeName,
        description: item.description || "—",
        isActive: item.isActive,
        status: item.isActive ? "Active" : "Inactive",
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "—",
      }))
    : [];


  // Get total items from pagination
  //   // Use stats total if available (more reliable), otherwise use pagination total
  //   const totalItems = searchQuery
  //     ? propertiesData?.pagination?.total || 0 // For search, use pagination total
  //     : stats?.totalProperties || propertiesData?.pagination?.total || 0; // For all properties, use stats
  // // const totalItems = propertiesData?.pagination?.total || 0;

  // if (isLoading || statsLoading) return <Loader />;
  // if (error)
  //   return <div className="p-5">Error loading properties: {error.message}</div>;

  // if (isLoading || statsLoading) return <Loader />;

  if (propertyListTypesLoading || propertyListTypeStatsLoading)
    return <Loader />;

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-gray-500">No property list types found.</div>
    );
  }

  return (
    <>
      <div className="p-6">
        <PageHeading
          title={"Properties List Types Management"}
          subTitle={"Manage all the Properties Types"}
        />
      </div>

      <div className="p-6 flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex gap-3 items-center cursor-pointer"
          onClick={() => setIsCreatePropertyTypeOpen(true)}
        >
          <IoAddOutline className="text-white" /> Create Property List Type
        </button>
      </div>

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

      {/* <div className="p-6 my-6 border border-gray-200 rounded-2xl">
        <HotelFilters
          handleSearch={handleSearch}
          status={statusFilter || "All"}
          onExport={handleExport}
          onStatusChange={(value) => {
            setStatusFilter(value === "All"?"":value);
            setPage(1);
          }}
        />
      </div> */}

      <div className="my-6">
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
          openEdit={() => {
            setIsEditOpen(true);
          }}
        />

        <EditHotelDrawer
          key={editPropertyId}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          propertyId={editPropertyId}
        />

        {deleteModalOpen &&
          createPortal(
            <ConfirmDeletePropertyListType
              propertyListTypeId={deletePropertyId}
              isDeleting={deletePropertyListTypeMutation.isLoading}
              onCancel={() => {
                setDeleteModalOpen(false);
                setDeletePropertyId(null);
              }}
              onConfirm={() => {
                deletePropertyListTypeMutation.mutate(deletePropertyId);
              }}
            />,
            document.body,
          )}
      </div>

      {isEditPropertyListTypeOpen && (
        <UpdatePropertyListTypeForm
          propertyListType={editPropertyListType}
          isSaving={updatePropertyTypeMutation.isLoading}
          onClose={() => {
            setIsEditPropertyListTypeOpen(false);
            setEditPropertyListType(null);
          }}
          onSave={(id, payload) => {
            updatePropertyTypeMutation.mutate(
              { id, payload },
              {
                onSuccess: () => {
                  setIsEditPropertyListTypeOpen(false);
                  setEditPropertyListType(null);
                },
              },
            );
          }}
        />
      )}

      {isCreatePropertyTypeOpen && (
        <CreatePropertyListTypeForm
          isSaving={createPropertyListTypeMutation.isLoading}
          onClose={() => setIsCreatePropertyTypeOpen(false)}
          onSave={(payload) => {
            createPropertyListTypeMutation.mutate(payload);
          }}
        />
      )}
    </>
  );
};

export default PropertiesListTypeManagementPage;
